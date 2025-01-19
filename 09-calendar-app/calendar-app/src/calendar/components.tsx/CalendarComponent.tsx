import { Calendar, EventPropGetter, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../globals/helpers/calendarLocalizer';
import { getMessages } from '../../globals/helpers/getMessages';
import { CalendarEventComponent } from './CalendarEventComponent';
import { useEffect, useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useUiStore } from '../../globals/hooks/useUiStore';
import { CalendarEvent } from '../../store/calendar/CalendarSlice';
import { useCalendarStore } from '../../globals/hooks/useCalendarStore';
import { FabAddNew } from './FabAddNew';
import { FabDelete } from './FabAddDelete';
import Swal from 'sweetalert2';




const eventStyleGetter: EventPropGetter<CalendarEvent> = () => {
    const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0pcpx',
        opacity: 0.8,
        color: 'white',
    };

    return {
        style,
    };
};
export const CalendarComponent = () => {

    const {openModal} = useUiStore()
    const {calendarEvents, setNote, activeEvent, informationMessage, informationStatus} = useCalendarStore()

    
        useEffect(() => {
            if(informationMessage.length>0){
                if(!informationStatus){
                    Swal.fire('Auth error', informationMessage, 'error')
                }
                else{
                    Swal.fire('Sucess', informationMessage, 'success')
                }
            }
        }, [informationMessage])
    


    const [view, setView] = useState<View>(() => {
        const savedView = localStorage.getItem('view');
        return (savedView as View) || 'month';
    });

    useEffect(() => {
        localStorage.setItem('view', view)
    }, [view])

    const onDoubleClick = (event: CalendarEvent) => {
        openModal();
        setNote(event)
    }

    const onSelect = (event: CalendarEvent) => {
        setNote(event)
    }

    const onViewChange = (event: View) => {
        setView(event)
    }

    return <div>
        <Calendar
            culture="ES"
            defaultView={view}
            messages={getMessages()}
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            components={{
                event: CalendarEventComponent
            }}
            onDoubleClickEvent={(event) => onDoubleClick(event)}
            onSelectEvent={(event) => onSelect(event)}
            onView={(event) => onViewChange(event)}
        />
        <CalendarModal />
        <FabAddNew/>
        {activeEvent && <FabDelete/>}
    </div>
};
