import { Message } from '@/02-useEffect/Message';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Message.test.tsx', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should render error message', () => {
        render(<Message />);
        expect(screen.getByText('Username already in use')).toBeInTheDocument();
    });

    test('Should add and remove mousemove event listener', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = render(<Message />);
        expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    test('Should logs mouse position on mousemove', () => { 
        const spyLog = jest.spyOn(console, 'log')
        const {container} = render(<Message />);
        fireEvent.mouseMove(container)
        expect(spyLog).toHaveBeenCalledWith(expect.any(Number), expect.any(Number))
        spyLog.mockRestore()
    });
});

