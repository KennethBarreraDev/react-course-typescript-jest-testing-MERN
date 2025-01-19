import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
type User = {
    id: string;
};

export type CalendarEvent = {
    id: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: User;
};


export interface CalendarState {
    events: CalendarEvent[],
    activeEvent: CalendarEvent | null,
    informationMessage: string,
    informationStatus: boolean
}

const initialState: CalendarState = {
    events: [],
    activeEvent: null,
    informationMessage: '',
    informationStatus: false
}

export const calendarSlice = createSlice({
    name: 'Calendar',
    initialState,
    reducers: {
        setActiveNotes: (state: CalendarState, action: PayloadAction<CalendarEvent[]>)=>{
            state.events = action.payload
            state.informationMessage = ''
            state.informationStatus = false
        },
        setActiveNote: (state: CalendarState, action: PayloadAction<CalendarEvent>)=>{
            state.activeEvent = action.payload
            state.informationMessage = ''
            state.informationStatus = false
        },
        
        onAddNewEvent: (state: CalendarState, action: PayloadAction<CalendarEvent>)=>{
            const events = state.events;
            state.events = [...events, action.payload]
            state.informationMessage = ''
            state.informationStatus = false
        },
        onUpdateEvent: (state: CalendarState, action: PayloadAction<CalendarEvent>)=>{

            const eventIndex = state.events.findIndex((event)=>event.id==action.payload.id);

            if(eventIndex!=-1){
                state.events[eventIndex] = action.payload;
            }
            state.informationMessage = ''
            state.informationStatus = false
        },

        onDeleteEvent: (state: CalendarState)=>{
            if(state.activeEvent){
                state.events = state.events.filter((event)=>event.id!=state.activeEvent?.id);
                state.activeEvent = null;
                state.informationMessage = ''
            state.informationStatus = false
            }
        },

        setErrorMessage: (state: CalendarState, action: PayloadAction<string>)=>{
            state.informationMessage = action.payload;
            state.informationStatus = false;
        },

        setSuccessMessage: (state: CalendarState, action: PayloadAction<string>)=>{
            state.informationMessage = action.payload;
            state.informationStatus = true;
        },


    },
})

export const { setActiveNote, setActiveNotes, onAddNewEvent, onUpdateEvent, onDeleteEvent, setErrorMessage, setSuccessMessage } = calendarSlice.actions
export default calendarSlice.reducer