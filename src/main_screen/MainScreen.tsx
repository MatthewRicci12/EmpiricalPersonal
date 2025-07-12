import TopBar from './TopBar.tsx';
import ArenaTabs from './Arenas.tsx';
import {arenaScreenData} from './Arenas.tsx';
import { useState } from "react";


function MainScreen() {
  const [whichArenaSelected, setArenaSelected] = useState<number>(0);
  const [numTabs, setNumTabs] = useState<number>(0);
  const [arenaScreenData, setArenaScreenData] = useState<arenaScreenData[]>([]);
  const [success, setSuccess] = useState<boolean>(true);


  function addTab() {
    setNumTabs(numTabs+1);
    setArenaScreenData(arenaScreenData.concat({index: numTabs, trialDataArray: []}));
  }

  function changeSelectedArena(index: number) {
    setArenaSelected(index);
  }

  function addTrialToSelectedArena() {
    const selectedArenaData = arenaScreenData[whichArenaSelected];
    selectedArenaData.trialDataArray = selectedArenaData.trialDataArray.concat(success);
    setSuccess(!success);
  }

  return (
    <div>
      <TopBar addTrialHandler={addTrialToSelectedArena}></TopBar>
      <ArenaTabs clickHandler={changeSelectedArena} whichArenaSelected={whichArenaSelected} data={arenaScreenData} addTabHandler={addTab}></ArenaTabs>
    </div>
  );
}

export default MainScreen;