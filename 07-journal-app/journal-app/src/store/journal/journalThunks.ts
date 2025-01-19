import { Dispatch } from "@reduxjs/toolkit";
import { RootState, store } from "../store"; // Asegúrate de usar la ruta correcta
import { createNewNote, loadingNotes, updateNoteDocument } from "../../firebase/database_provider";
import { addNewEmptyNote, changeMessageSaved, Note, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, FileUploadResponse } from "../../cloudinary/cloudinaryProvider";

export const startNewNote = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setSaving(true))
    const state = getState(); 
    console.log(state);

    const newNote = {
     id: null,
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const result = await createNewNote(state.auth.uuid ?? '', newNote)

    const newNoteWithId = {...newNote,
        id: result.id
    }

    dispatch(addNewEmptyNote(newNoteWithId))
    dispatch(setActiveNote(newNoteWithId))
    dispatch(setSaving(false))

  };
};


export const getNotesFromDB = () => {
    return async (dispatch: Dispatch) => {
    const state = getState(); 
      const notes = await loadingNotes(state.auth.uuid ?? '')
      dispatch(setNotes(notes.notes))
    };
  };



  export const startUpdateNote = (noteId: string, note: Note) => {
    return async (dispatch: Dispatch) => {
      dispatch(setSaving(true));
    const state = getState(); 
      const response = await updateNoteDocument(state.auth.uuid ?? '',  noteId ?? '', note)

      if(response.status){
        dispatch(updateNote(note))
      }
      dispatch(setSaving(false));

    };
  };

  
  export const startUploadingFiles = (files: FileList | null = null) => {
    console.log('Entrando con ', files);
    
    return async (dispatch: Dispatch) => {
      dispatch(setSaving(true));

      const fileUploadPromises: Promise<FileUploadResponse>[] = [];
      
      for (const file of files ?? []) {
        fileUploadPromises.push(fileUpload(file))
      }

      const fileUploadResponses = await Promise.all(
        fileUploadPromises
      )

      if(fileUploadResponses[0].status){
        dispatch(setPhotosToActiveNote([...fileUploadResponses.map((image)=>image.image)]))
        const state = getState();
        await updateNoteDocument(state.auth.uuid ?? '', state.journal.active?.id ?? '', state.journal.active!)
        
        dispatch(changeMessageSaved('File upload successfully'));
      }
      dispatch(setSaving(false));

    };
  };





const getState = (): RootState=>{
    return store.getState();
}
