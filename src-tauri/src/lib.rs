use tauri::Listener;
use tauri::{Result, Manager, AppHandle};
use gtk::prelude::{BinExt, Cast, GtkWindowExt, HeaderBarExt};
use gtk::{EventBox, HeaderBar};
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_window_title])
        .setup(|app| {
        app.listen("new", |event| {
            if let Ok(payload) = serde_json::from_str::<i32>(&event.payload()) {
            println!("Payload is {}", payload);
            } else {
                println!("No bueno.");
            }
        });
        Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn set_window_title(app: AppHandle, label: &str, is_dirty: bool) -> Result<()> {
    print!("Called");
    let new_title = if is_dirty {"Personal Empirical*"} else { "Personal Empirical" } ;
	let tauri_window = app.get_webview_window(label).unwrap();
	tauri_window.set_title(new_title).unwrap();
	match tauri_window.gtk_window().unwrap().titlebar() {
		Some(titlebar) => {
			// Wayland
			let event_box = titlebar.downcast::<EventBox>().unwrap();
			let header_bar = event_box.child().unwrap().downcast::<HeaderBar>().unwrap();
			header_bar.set_title(Some(new_title));
		}
		None => (),
	}
	Ok(())
}