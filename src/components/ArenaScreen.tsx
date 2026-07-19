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
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        minHeight: { xs: 480, md: 640 },
        p: { xs: 2.5, md: 3.5 },
        borderRadius: "28px",
        border: "1px solid rgba(22,48,41,0.08)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(252,249,243,0.96) 100%)",
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1.5} sx={{ mb: 3.25, px: 0.25 }}>
        <Box>
          <Typography variant="h4">Trial Pipeline</Typography>
          <Typography variant="body2" color="text.secondary">
            Prioritize experiments, drag to reorder, and open each card for detailed evidence.
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          {trialUuids.length} active {trialUuids.length === 1 ? "trial" : "trials"}
        </Typography>
      </Stack>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={trialUuids}
          strategy={verticalListSortingStrategy}
        >
          <Box className="soft-scrollbar" sx={{ maxHeight: { xs: 520, md: 620 }, overflowY: "auto", pr: 1.25, pt: 0.9, pl: 0.2 }}>
            <Stack spacing={2}>{trials}</Stack>
          </Box>
        </SortableContext>
      </DndContext>
    </Paper>
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
