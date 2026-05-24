use tauri::{CloseRequestApi, Listener, WebviewWindow, Emitter};
use tauri::{Result, Manager, AppHandle};
use gtk::prelude::{BinExt, Cast, GtkWindowExt, HeaderBarExt};
use gtk::{EventBox, HeaderBar};
use std::collections::HashMap;
use serde::{Deserialize, Serialize};
use serde_json::{Result as SerdeResult};
use std::fs;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_window_title, save_file, load_file, close_application])
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                let app_handle = window.app_handle();
                let window_label = window.label().to_string();
                app_handle.emit("user-exit", window_label).unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn close_application(app: AppHandle, is_dirty: bool) -> Result<()> {

    let window  = app.get_webview_window("main").unwrap();

    if is_dirty {
        app.emit("close-on-dirty", ()).unwrap();
    } else {
        let _ = window.close().map_err(|e| format!("Failed to close window: {}", e));
    }

    Ok(())
}

#[tauri::command]
async fn set_window_title(app: AppHandle, label: &str, is_dirty: bool) -> Result<()> {
    let new_title = if is_dirty {"Personal Empirical*"} else { "Personal Empirical" } ;
	let tauri_window = app.get_webview_window(label).unwrap();
	tauri_window.set_title(new_title).unwrap();
	match tauri_window.gtk_window().unwrap().titlebar() {
		Some(titlebar) => {
			// Wayland workaround as seen on GitHub
			let event_box = titlebar.downcast::<EventBox>().unwrap();
			let header_bar = event_box.child().unwrap().downcast::<HeaderBar>().unwrap();
			header_bar.set_title(Some(new_title));
		}
		None => (),
	}
	Ok(())
}

#[tauri::command]
fn load_file(app: AppHandle) -> Result<()> {
    let save_dir = app.path().app_data_dir().unwrap().join("saved_data");
    let file_path = save_dir.join("data.json");

    let json_string = fs::read_to_string(&file_path)?;

    let json: serde_json::Value =
        serde_json::from_str(&json_string).expect("JSON was not well-formatted");

    app.emit("file-load", json).unwrap();

    Ok(())
}

type SubTrialDataPayload = HashMap<String, (i32, String, String)>;

type FactorDataPayload = HashMap<String, i32>;

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct TrialInnerDataPayload {
    trial_title: String,
    success_string: String,
    failure_string: String,
    additional_notes_string: String,
    indiv_factor_data: FactorDataPayload,
    indiv_factor_order: Vec<String>,
    subtrial_data: Vec<String>,
}

type TrialDataPayload = HashMap<String, TrialInnerDataPayload>;

type ArenaDataPayload = HashMap<String, Vec<String>>;

type FullPayload = (ArenaDataPayload, Vec<String>, TrialDataPayload, SubTrialDataPayload);

#[tauri::command]
fn save_file(app: AppHandle, label: &str, payload: FullPayload) -> Result<()> {
    println!("{:?}", serde_json::to_string(&payload));

    let serialized = serde_json::to_string_pretty(&payload).unwrap();

    let save_dir = app.path().app_data_dir().unwrap().join("saved_data");
    fs::create_dir_all(&save_dir).expect("Should be able to create saves dir");
    
    let save_file = save_dir.join("data.json");
    fs::write(&save_file, serialized).expect("Should be able to write to file.");

    Ok(())
}

