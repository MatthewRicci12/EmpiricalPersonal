import MainScreen from "./pages/MainScreen";
import { DirtyStateProvider } from "./contexts/DirtyStateContext";
import { SaveActionUpdater } from "./components/SaveActionUpdater";
import { ExitListener } from "./components/ExitListener";

function App() {
  return (
    <DirtyStateProvider>
      <ExitListener />
      <SaveActionUpdater />
      <MainScreen />
    </DirtyStateProvider>
  );
}

export default App;
