// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { useState } from 'react';
import { Box } from '@mui/system';
import './App.css';

export default App; //should this be here? In terms of, top of file or bottom or what

function App() {
  return (
    <div>
      <TopBar></TopBar>
      <ArenaTabs></ArenaTabs>
    </div>
  );
}

interface TopBarProps {

}
function TopBar({}: TopBarProps) {

  return(
    <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'auto auto auto'
    }}
    >
      <span>
        <button id={'addbutton'}>
          <img 
            src='src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg' 
            style={{display:'inline', 
            marginLeft:'auto', 
            marginRight:'auto', 
            width:'80%', 
            height:'80%'}}>
          </img>
        </button>
      </span>

      <span style={{textAlign: 'center'}}>
        <h6>+ Add Trial</h6>
      </span>

      <span style={{textAlign: 'right'}}>
        <h6>Settings</h6>
      </span>

    </Box>

  );
}

interface ArenaScreenProps {
  isDisplayed: Boolean,
  index: number
}
function ArenaScreen({isDisplayed, index} : ArenaScreenProps) {
  return (
    <Box 
    sx={{
         display: isDisplayed ? 'display' : 'none',
         height: '90vh', // So that the scrollbar doesn't get in the way of the tabs.
         fontFamily: '"Lato", sans-serif',
    }}>
    <div className="arenascreen">
      <h1>{`This is tab ${index}`}</h1>
      <p>Yes, it is!</p>
    </div>
    </Box>

  );
}

interface ArenaTabsProps {
}
function ArenaTabs({}: ArenaTabsProps) {

  function handleClick(curIndex: number) {
    setArenaSelected(curIndex);
  }

  function addTab() {
    setNumTabs(numTabs+1);
  }

  const [whichArenaSelected, setArenaSelected] = useState<number>(0);
  const [numTabs, setNumTabs] = useState<number>(0);

  let isDisplayed = true;
  let arenaScreensArray: React.ReactElement[] = [];
  for (let i = 0; i < numTabs+1; ++i) {
    isDisplayed = i === whichArenaSelected ? true : false;
    arenaScreensArray = arenaScreensArray.concat(<ArenaScreen isDisplayed={isDisplayed} index={i}></ArenaScreen>);
  }

  let tabsArray: React.ReactElement[] = [];
  for (let i = 0; i < numTabs-1; ++i) {
    tabsArray = tabsArray.concat(<ArenaTab clickHandler={handleClick} index={i+1}></ArenaTab>);
  }

  return (
    <div style={{whiteSpace: 'nowrap'}}>
      {arenaScreensArray}

      <Box
      component="button"
      sx={{
        bgcolor: '#555',
        color: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontSize: 17,
        ":hover": {
          bgcolor: '#777'
        },
      }}
      onClick={addTab}
      >
      <img src='src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg' style={{display:'inline', marginLeft:'auto', marginRight:'auto', width:'80%', height:'80%'}}></img>
      </Box>

      {tabsArray}
    </div>
  );
}


interface ArenaTabProps {
  clickHandler: (arg0: number) => void,
  index: number
}
function ArenaTab ({clickHandler, index}: ArenaTabProps) { // how 2 isDisplayed
  return (
      <Box
      component="button"
      sx={{
        bgcolor: 'white',
        borderTop: 'none',
        cursor: 'pointer',
        fontSize: 17,
        fontFamily: '"Lato", sans-serif',
        ":hover": {
          bgcolor: '#777'
        },
        borderRadius: '0px 0px 10px 10px'
      }}
      onClick={() => clickHandler(index)}
      >
        {`Tab ${index}`}
      </Box>
  );
}
