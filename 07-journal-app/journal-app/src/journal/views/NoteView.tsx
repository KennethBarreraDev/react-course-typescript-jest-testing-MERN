import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, debounce, Grid2, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useCustomForm } from "../../globals/hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useMemo, useRef } from "react"
import React from "react"
import { Note, setActiveNote } from "../../store/journal/journalSlice"
import { startUpdateNote, startUploadingFiles } from "../../store/journal/journalThunks"
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

export const NoteView = React.memo(
    () => {
        console.log('Renderizando aaaa');
        
        const dispatch = useDispatch();
        const activeNote = useSelector((state: RootState) => state.journal.active);
        const isSaving = useSelector((state: RootState) => state.journal.isSaving);
        const alertMessage = useSelector((state: RootState) => state.journal.messageSaved);
        const { title, body } = activeNote!

        const noteDate = useMemo(() => {
            return new Date(activeNote?.date ?? '').toISOString()
        }, [activeNote?.date])

        const initialFormState = useMemo(() => ({
            'title': title ?? '',
            'body': body ?? '',

        }), [title, body])


        const { formState,
            onInputChange } = useCustomForm(initialFormState);

            const debounceDispatch = debounce((dispatch, modifiedNote) => {
                dispatch(setActiveNote(modifiedNote));
            }, 300);

            useEffect(() => {
                const modifiedNote = {
                    id: activeNote?.id ?? null,
                    date: activeNote?.date ?? new Date().getTime(),
                    images: activeNote?.images ?? [],
                    title: formState?.title || "",
                    body: formState?.body || "",
                };
            
                debounceDispatch(dispatch, modifiedNote);
            
                return () => debounceDispatch.clear()
            }, [formState]);

            useEffect(() => {
                if(alertMessage.length>0){
                    
                  Toast.fire({
                    icon: "success",
                    title: alertMessage
                  });
                }
            }, [alertMessage])
            

        
        const onNoteUpdated = (note: Note)=>{
            const startUpdateNoteThunk = startUpdateNote(note.id ?? '', note);
            startUpdateNoteThunk(dispatch);
        }

        const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>)=>{
            const files = event.target.files;
            if((files?.length ?? 0)>0){
               const startUploadingFilesThunk = startUploadingFiles(files ?? null);
               startUploadingFilesThunk(dispatch)
            }
            
        }

        const fileRef = useRef<HTMLInputElement>(null);
        const fireFileInputChange = ()=>{
            fileRef.current?.click();
        }

       
        return (

            <>
                <Grid2
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                >
                    <Grid2 >
                        <Typography fontSize={39} fontWeight="light">
                            {noteDate}
                        </Typography>
                    </Grid2>
                    <Grid2>
                        <IconButton color="primary" disabled={isSaving} onClick={()=>fireFileInputChange()}>
                            <UploadFileOutlined/>
                        </IconButton>
                        <input type="file" multiple onChange={(event)=>onFileInputChange(event)} style={{display: 'none'}} ref={fileRef}/>
                    </Grid2>
                    <Grid2 >
                        <Button color="primary" sx={{ padding: 2 }} onClick={()=>onNoteUpdated(activeNote!)}>
                            <SaveOutlined sx={{ fontSize: 40, mr: 1 }} />
                        </Button>
                    </Grid2>


                </Grid2>

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    label='title'
                    placeholder="Insert a title"
                    name="title"
                    value={(formState ?? {})['title'] || ''}
                    onChange={(event) => onInputChange(event)}
                />


                <TextField
                    sx={{ mt: 2 }}
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    name="body"
                    value={(formState ?? {})['body'] || ''}
                    minRows={5}
                    placeholder="What happend today?"
                    onChange={(event) => onInputChange(event)}
                />

                <ImageGallery images={activeNote?.images ?? []}/>
            </>
        )
    }

)