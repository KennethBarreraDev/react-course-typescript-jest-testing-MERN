import { render, screen } from '@testing-library/react';
import { FabDelete } from '@/calendar/components.tsx/FabAddDelete';
import { useCalendarStore } from '@/globals/hooks/useCalendarStore';

jest.mock('@/globals/hooks/useCalendarStore');

const mockUseCalendarStore = {
  deleteEvent: jest.fn(),
};

beforeAll(() => {
  (useCalendarStore as jest.Mock).mockReturnValue(mockUseCalendarStore);
});

describe('FabDelete', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  test('should render delete button', () => {
    render(<FabDelete />);
    expect(screen.getByLabelText('fab-delete')).toBeInTheDocument()
  });
});
