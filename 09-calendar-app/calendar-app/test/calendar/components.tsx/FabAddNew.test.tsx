import { render, screen, fireEvent } from '@testing-library/react';
import { useUiStore } from '@/globals/hooks/useUiStore';
import { useCalendarStore } from '@/globals/hooks/useCalendarStore';
import { FabAddNew } from '@/calendar/components.tsx/FabAddNew';

jest.mock('@/globals/hooks/useUiStore');
jest.mock('@/globals/hooks/useCalendarStore');

describe('FabAddNew', () => {
  const setNoteMock = jest.fn();
  const openModalMock = jest.fn();

  beforeEach(() => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      setNote: setNoteMock,
    });
    (useUiStore as jest.Mock).mockReturnValue({
      openModal: openModalMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call setNote and openModal on button click', () => {
    render(<FabAddNew />);
    fireEvent.click(screen.getByRole('button'));
    expect(setNoteMock).toHaveBeenCalledWith({
      id: 0,
      title: '',
      notes: '',
      start: expect.any(Date),
      end: expect.any(Date),
      bgColor: '#fafafa',
      user: {
        id: '123',
      },
    });
    expect(openModalMock).toHaveBeenCalled();
  });

  test('should render button with correct icon', () => {
    render(<FabAddNew />);
    const buttonIcon = screen.getByRole('button').querySelector('i');
    expect(buttonIcon).toHaveClass('fas fa-plus');
  });
});
