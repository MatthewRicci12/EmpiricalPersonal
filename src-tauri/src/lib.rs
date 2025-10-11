use tauri::Listener;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>());
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
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
