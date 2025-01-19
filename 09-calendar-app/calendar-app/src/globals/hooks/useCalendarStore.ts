import { useDispatch, useSelector } from "react-redux"
import { RootState, store } from "../../store/store"
import { CalendarEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent, setActiveNote, setActiveNotes, setErrorMessage, setSuccessMessage } from "../../store/calendar/CalendarSlice";
import { useEffect } from "react";
import calendarApi from "../../api/calendar_api";

export const useCalendarStore = () => {
    const calendarEvents = useSelector((state: RootState) => state.calendar.events)
    const activeEvent = useSelector((state: RootState) => state.calendar.activeEvent)
    const informationMessage = useSelector((state: RootState) => state.calendar.informationMessage)
    const informationStatus = useSelector((state: RootState) => state.calendar.informationStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        startFetchingEvents()
    }, [])


    const startFetchingEvents = async () => {
        try {
            const response = await calendarApi.get('/events/list')
            if (response.status >= 200 && response.status <= 299) {
                const events = response.data.map((event: any) => ({
                    id: event.id,
                    title: event.title,
                    notes: event.notes,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    bgColor: '',
                    user: {
                        id: event.userOwner
                    }
                }));

                dispatch(setActiveNotes(events))

            }
            else {
                dispatch(setErrorMessage('Error fetching notes'))

                setTimeout(() => {
                    dispatch(setErrorMessage(''))
                }, 10)
            }
        } catch (error) {
            dispatch(setErrorMessage('Error fetching notes'))
            setTimeout(() => {
                dispatch(setErrorMessage(''))
            }, 10)
        }
    }

    const setNote = (note: CalendarEvent) => {
        dispatch(setActiveNote(note))
    }

    const onModifyNote = async (note: CalendarEvent) => {
        try {
            if (note.id == 0) {
                const response = await calendarApi.post('/events/create', {
                    title: note.title,
                    user: getState().auth.user.id,
                    start: note.start,
                    end: note.end
                })

                if (response.status >= 200 && response.status <= 299) {
                    dispatch(onAddNewEvent({ ...note, id: note.id }))

                    dispatch(setSuccessMessage('Success modifiying note'))
                    setTimeout(() => {
                        dispatch(setSuccessMessage(''))
                    }, 10)
                }
                else {
                    dispatch(setErrorMessage('Error while modifiying note'))
                    setTimeout(() => {
                        dispatch(setErrorMessage(''))
                    }, 10)
                }
            }
            else {

                const response = await calendarApi.put(`/events/update/${activeEvent?.id}`, {
                    title: note.title,
                    user: getState().auth.user.id,
                    start: note.start,
                    end: note.end
                })

                if (response.status >= 200 && response.status <= 299) {
                    dispatch(onUpdateEvent(note))

                    dispatch(setSuccessMessage('Success modifiying note'))
                    setTimeout(() => {
                        dispatch(setSuccessMessage(''))
                    }, 10)
                }
                else {
                    dispatch(setErrorMessage('Error while modifiying note'))
                    setTimeout(() => {
                        dispatch(setErrorMessage(''))
                    }, 10)
                }
            }
        } catch (error) {
            dispatch(setErrorMessage('Error while modifiying note'))
            setTimeout(() => {
                dispatch(setErrorMessage(''))
            }, 10)
        }

    }

    const deleteEvent = async () => {

        try {
            const response = await calendarApi.delete(`/events/delete/${activeEvent?.id}`)

            if (response.status >= 200 && response.status <= 299) {
                dispatch(onDeleteEvent())
                dispatch(setSuccessMessage('Success deleting note'))
                setTimeout(() => {
                    dispatch(setSuccessMessage(''))
                }, 10)
            }
            else {
                dispatch(setErrorMessage('Error while deleting note'))
                setTimeout(() => {
                    dispatch(setErrorMessage(''))
                }, 10)
            }

        } catch (error) {
            dispatch(setErrorMessage('Error while deleting note'))
            setTimeout(() => {
                dispatch(setErrorMessage(''))
            }, 10)
        }
    }


    const getState = () => {
        return store.getState()
    }
    return {
        calendarEvents,
        activeEvent,
        setNote,
        onModifyNote,
        deleteEvent,
        informationMessage,
        informationStatus
    }
}

