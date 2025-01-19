import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Note {
    id: string | null,
    title: string,
    body: string,
    date: number
    images?: string[]
}


interface JournalState {
    isSaving: boolean
    messageSaved: string,
    notes: Note[]
    active: Note | null
}

const initialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addNewEmptyNote: (state: JournalState, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            state.isSaving = false;
            state.messageSaved = ''
        },
        setActiveNote: (state: JournalState, action: PayloadAction<Note>) => {
            state.active = action.payload
            state.messageSaved = '';
        },
        setActiveNoteById: (state: JournalState, action: PayloadAction<string>) => {

            const activeNote = state.notes.find((note) => note.id === action.payload)
            state.active = activeNote ?? null;
            state.messageSaved = '';

        },
        setNotes: (state: JournalState, action: PayloadAction<Note[]>) => {
            state.notes = action.payload
            state.messageSaved = '';
        },

        setSaving: (state: JournalState, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload
        },
        updateNote: (state: JournalState, action: PayloadAction<Note>) => {
            const noteIndex = state.notes.findIndex((note) => note.id === action.payload.id)
            if (noteIndex != -1) {
                state.notes[noteIndex] = {
                    ...action.payload
                }
                state.messageSaved = `${action.payload.title}, actualizado correctamente`;
            }
        },

        changeMessageSaved: (state: JournalState, action: PayloadAction<string>) => {
            state.messageSaved = `${action.payload}`;
        },

        setPhotosToActiveNote: (state: JournalState, action: PayloadAction<string[]>) => {
            if (state.active) {
                state.active.images = action.payload
            }
        },
        resetState: (state: JournalState,) => {
            state.active = initialState.active;
            state.isSaving = initialState.isSaving;
            state.notes = initialState.notes;
            state.messageSaved = initialState.messageSaved;

        },

        deleteNoteById: () => {

        },

    },
})

export const { addNewEmptyNote, setActiveNote, setSaving, setNotes, setActiveNoteById, updateNote, changeMessageSaved, setPhotosToActiveNote, resetState } = journalSlice.actions