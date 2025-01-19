import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/journalThunks"
import { RootState } from "../../store/store"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JournalPage = () => {
  const isSavingNote = useSelector((state: RootState) => state.journal.isSaving)

  const dispatch = useDispatch();

  const onAddNewNote = async () => {
    const startNewNooteThunk = startNewNote();
    startNewNooteThunk(dispatch)

  }

  const activeNote = useSelector((state: RootState) => state.journal.active);

  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}

      {
        activeNote ? 
        <NoteView /> :
        <NothingSelectedView/>
      }

      <IconButton
        disabled={isSavingNote}
        onClick={() => onAddNewNote()}
        size="large"
        sx={{
          color: 'white',
          backgroundColor:
            'error.main',
          ':hover': 'error.main',
          opacity: 0.9,
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
