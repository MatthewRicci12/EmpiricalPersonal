import Box from '@mui/system/Box';
import SubTrial from "./SubTrial.tsx";
import { SubTrialData } from '../MainScreen.tsx';

export const RESULT_INDEX = 0;
export const DATE_INDEX = 1;
export const DATA_INDEX = 2;

interface Props {
  subTrialData: SubTrialData, 
  subTrialOrder: (keyof SubTrialData)[]
}
export const SubTrialDialog: React.FC<Props> = ({subTrialData, subTrialOrder}) => {
  return (
    <Box
    sx={{
    height: '200px',
    width: '600px',
    backgroundColor: '#66ccff'}}>
      {subTrialOrder.map( (subTrialKey) =>
      <SubTrial
      result={subTrialData[subTrialKey][RESULT_INDEX]}
      date={subTrialData[subTrialKey][DATE_INDEX]} 
      data={subTrialData[subTrialKey][DATA_INDEX]}
      key={subTrialKey}/>)}
    </Box>
  );
}

export default SubTrialDialog;