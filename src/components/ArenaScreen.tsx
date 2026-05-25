import Trial from "./Trial";
import { Box, Stack } from "@mui/system";
import { TrialData, SubtrialData } from "../pages/MainScreen/types";
import { Result } from "./types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  trialData: TrialData;
  trialUuids: string[];
  subtrialData: SubtrialData;
  handleAddSubTrial: (
    trialTitle: string,
    key: string,
    result: Result,
    date: string,
    data: string
  ) => void;
  whichTrialSelected: string;
  handleClickTrial: (title: string) => React.MouseEventHandler<HTMLDivElement>;
  handleReorderTrials: (oldIndex: number, newIndex: number) => void;
}
export const ArenaScreen: React.FC<Props> = ({
  trialData,
  trialUuids,
  subtrialData,
  handleAddSubTrial,
  whichTrialSelected,
  handleClickTrial,
  handleReorderTrials,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const trials = trialUuids.map((uuid) => {
    const trialTitle = trialData[uuid].trialTitle;
    const curTrialSubtrialUuids = trialData[uuid].subtrialData;
    const successString = trialData[uuid].successString;
    const failureString = trialData[uuid].failureString;
    const additionalNotesString = trialData[uuid].additionalNotesString;
  

    return (
      <Trial
        trialTitle={trialTitle}
        trialKey={uuid}
        successString={successString}
        failureString={failureString}
        additionalNotesString={additionalNotesString}
        handleClickTrial={handleClickTrial(uuid)}
        selected={whichTrialSelected === uuid}
        handleAddSubTrial={handleAddSubTrial}
        subtrialUuids={curTrialSubtrialUuids}
        subtrialData={subtrialData}
        key={uuid}
        id={uuid}
      />
    );
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={trialUuids}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ height: "80vh" }}>
          <Stack spacing={2}>{trials}</Stack>
        </Box>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over, delta } = e;

    if (delta.x === 0 && delta.y === 0) {
      handleClickTrial(active.id as string)(e as any);
      return;
    }

    if (over == null) {
      return;
    }

    if (active.id !== over.id) {
      handleReorderTrials(
        trialUuids.indexOf(active.id as string),
        trialUuids.indexOf(over.id as string)
      );
    }
  }
};
