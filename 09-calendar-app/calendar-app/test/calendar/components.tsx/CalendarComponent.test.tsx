import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Swal from 'sweetalert2';
import { CalendarComponent } from '@/calendar/components.tsx/CalendarComponent';
import { useUiStore } from '@/globals/hooks/useUiStore';
import { useCalendarStore } from '@/globals/hooks/useCalendarStore';


jest.mock('sweetalert2');
jest.mock('@/globals/hooks/useUiStore');
jest.mock('@/globals/hooks/useCalendarStore');

const mockCalendarEvents = [
  {
    title: 'Test Event',
    start: new Date(),
    end: new Date(),
    id: '1',
  },
];

describe('CalendarComponent.test.ts', () => {

  beforeEach(() => {
    (useUiStore as jest.Mock).mockReturnValue({
      openModal: jest.fn(),
    });
  
    (useCalendarStore as jest.Mock).mockReturnValue({
      calendarEvents: mockCalendarEvents,
      setNote: jest.fn(),
      activeEvent: mockCalendarEvents[0],
      informationMessage: '',
      informationStatus: true,
    });
  });

  test('should render calendar and floating action buttons', () => {
    render(<CalendarComponent />);
    expect(screen.getByText(/Test Event/)).toBeInTheDocument();
    expect(screen.getByLabelText('fab-add-new')).toBeInTheDocument();
  });

  test('should call setNote when selecting an event', async () => {
    render(<CalendarComponent />);
    
    const event = screen.getByText('Test Event');
    fireEvent.click(event);

    await waitFor(() => {
      expect(useCalendarStore().setNote).toHaveBeenCalledWith(mockCalendarEvents[0]);
    });
  });

  test('should open modal on double click and set active event', async () => {
    render(<CalendarComponent />);

    const event = screen.getByText('Test Event');
    fireEvent.doubleClick(event);

    await waitFor(() => {
      expect(useUiStore().openModal).toHaveBeenCalled();
      expect(useCalendarStore().setNote).toHaveBeenCalledWith(mockCalendarEvents[0]);
    });
  });
  
  test('should show success message when informationStatus is true', () => {
    (useCalendarStore as jest.Mock).mockReturnValueOnce({
      informationMessage: 'Success!',
      informationStatus: true,
    });

    render(<CalendarComponent />);
    
    expect(Swal.fire).toHaveBeenCalledWith('Sucess', 'Success!', 'success');
  });

  test('should show error message when informationStatus is false', () => {
    (useCalendarStore as jest.Mock).mockReturnValueOnce({
      informationMessage: 'Auth error',
      informationStatus: false,
    });

    render(<CalendarComponent />);

    expect(Swal.fire).toHaveBeenCalledWith('Auth error', 'Auth error', 'error');
  });
});
