import { CalendarEvent } from '../../store/calendar/CalendarSlice';


type CalendarEventProps = {
    event: CalendarEvent
}
export const CalendarEventComponent = ( {event}: CalendarEventProps) => {
    return (
        <div>
            <strong>{event.title}</strong>
            <br />
            <span>{event.notes}</span>
        </div>
    );
};
