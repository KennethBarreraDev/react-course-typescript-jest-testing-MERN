import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarEvent } from '../../store/calendar/CalendarSlice';
import { CalendarEventComponent } from '@/calendar/components.tsx/CalendarEventComponent';

describe('CalendarEventComponent', () => {
  const mockEvent: CalendarEvent = {
    id: 2,
    title: 'Test Event',
    notes: 'This is a test event',
    start: new Date(),
    end: new Date(),
    bgColor: '#ffffff',
    user: {
      id: 'ABC'
    }
  };

  test('should render event title and notes', () => {
    render(<CalendarEventComponent event={mockEvent} />);
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.notes)).toBeInTheDocument();
  });

  test('should handle click event', () => {
    render(<CalendarEventComponent event={mockEvent} />);
    const eventElement = screen.getByText(mockEvent.title);
    fireEvent.click(eventElement);
  });
});
