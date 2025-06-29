import Box from '@mui/system/Box';
import { useState } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function ArenaTabs() {

  function handleClick(curIndex: number) {
    setArenaSelected(curIndex);
  }

  function addTab() {
    setNumTabs(numTabs+1);
  }

  const [whichArenaSelected, setArenaSelected] = useState<number>(0);
  const [numTabs, setNumTabs] = useState<number>(0);

  let indices: number[] = [];

  for (let i = 0; i < numTabs+1; ++i) {
    indices = indices.concat(i);
  }
  console.log(indices);

  const arenaScreensArray = indices.map((index) => 
    <ArenaScreen isDisplayed={index === whichArenaSelected} index={index}></ArenaScreen>
  );

  const tabsArray = indices.slice(1).map((index) =>
    <ArenaTab clickHandler={handleClick} index={index}></ArenaTab>
  );

  return (
    <Box 
    sx={{whiteSpace: 'pre'}}>
      {arenaScreensArray}

      <Button
      sx={{}}
      onClick={addTab}
      >
      <AddIcon></AddIcon>
      </Button>

      {tabsArray}
    </Box>
  );
}


interface ArenaScreenProps {
  isDisplayed: Boolean,
  index: number
}
export function ArenaScreen({isDisplayed, index} : ArenaScreenProps) {
  return (
    <Box 
    sx={{
      display: isDisplayed ? 'block' : 'none',
      height: '80vh', // So that the scrollbar doesn't get in the way of the tabs.
      fontFamily: '"Lato", sans-serif',
    }}>
      <h1>{`This is tab ${index}`}</h1>
      <p>Yes, it is!</p>
    </Box>

  );
}

interface ArenaTabProps {
  clickHandler: (index: number) => void,
  index: number
}
export function ArenaTab ({clickHandler, index}: ArenaTabProps) { // how 2 isDisplayed
  return (
      <Button
      sx={{}}
      onClick={() => clickHandler(index)}
      >
        {`Tab ${index}`}
      </Button>
  );
}

export default ArenaTabs;