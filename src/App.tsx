import MainScreen from "./pages/MainScreen";
import { DirtyStateProvider } from "./contexts/DirtyStateContext";
import { SaveActionUpdater } from "./components/SaveActionUpdater";

function App() {
  return (
    <DirtyStateProvider>
      <SaveActionUpdater />
      <MainScreen />
    </DirtyStateProvider>
  );
}

export default App;
