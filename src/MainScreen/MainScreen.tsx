import { useState } from "react";
import ArenaControlScreen from "./ArenaControlScreen";
import ConclusionScreen from "./ConclusionScreen";

enum WhichScreenShown {
  ARENACONTROLSCREEN,
  CONCLUSIONSCREEN
}

interface Props {

}
const MainScreen: React.FC<Props> = () => {
  const [whichScreenShown, setwhichScreenShown] = useState<WhichScreenShown>(WhichScreenShown.ARENACONTROLSCREEN); //dialog pop up or not
  
  const handleOpenConclusionsPage = () => { //Triggered by Dialog x
    setwhichScreenShown(WhichScreenShown.CONCLUSIONSCREEN);
  };

  const handleClickBackButton = () => { //Triggered by Dialog x
    setwhichScreenShown(WhichScreenShown.ARENACONTROLSCREEN);
  };

  return (
    <>
     {
     whichScreenShown === WhichScreenShown.ARENACONTROLSCREEN ?
     <ArenaControlScreen handleOpenConclusionsPage={handleOpenConclusionsPage}/> :
     <ConclusionScreen handleClickBackButton={handleClickBackButton}/>
     }
    </>
  );
}


export default MainScreen;