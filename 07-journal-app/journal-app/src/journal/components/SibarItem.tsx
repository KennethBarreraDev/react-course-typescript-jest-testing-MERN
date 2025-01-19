import { TurnedInNot } from "@mui/icons-material"
import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Note, setActiveNoteById } from "../../store/journal/journalSlice"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

export const SidebarItem = (note: Note) => {
    const title = useMemo(() => note.title.length > 17 ? note.title.substring(0, 17) : note.title, [note.title])
    const dispatch = useDispatch()
    const onNoteSelected = (id:string)=>{
        dispatch(setActiveNoteById(id))
    }

    return (
        <ListItem key={note.id} disablePadding>
            <ListItemButton onClick={()=>onNoteSelected(note.id ?? '')}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid2 container>
                    <ListItemText primary={title} />
                    <ListItemText secondary={note.body} />
                </Grid2>
            </ListItemButton>
        </ListItem>
    )
}


