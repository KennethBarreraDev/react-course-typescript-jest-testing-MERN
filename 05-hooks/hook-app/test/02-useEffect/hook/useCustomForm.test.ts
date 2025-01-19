import { useCustomForm } from "@/02-useEffect/hook/useCustomForm"
import { renderHook, act } from "@testing-library/react"

describe('useCustomForm.ts', () => {
    const defaultValue = { 'username': 'kenneth' };

    test('Should return expected values', () => {
        const { result } = renderHook(() => useCustomForm(defaultValue))
        expect(result.current).toMatchObject(expect.objectContaining({
            formState: expect.objectContaining(defaultValue),
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function)
        }))
    })

    test('Should change inputValue on input change', () => {
        const newValue = 'user123';
        const { result } = renderHook(() => useCustomForm(defaultValue))

        const changeEvent = {
            target: { name: 'username', value: newValue }
        } as React.ChangeEvent<HTMLInputElement>;

        act(() => {
            result.current.onInputChange(changeEvent);
        });

        expect(result.current.formState).toMatchObject(expect.objectContaining({ username: newValue }));
    })

    test('Should reset form onReset', () => {
        const newValue = 'user123';
        const { result } = renderHook(() => useCustomForm(defaultValue));

        const changeEvent = {
            target: { name: 'username', value: newValue }
        } as React.ChangeEvent<HTMLInputElement>;

        act(() => {
            result.current.onInputChange(changeEvent);
        });

        expect(result.current.formState).toMatchObject({ username: newValue });
    
        act(() => {
            result.current.onResetForm();
        });
        
        expect(result.current.formState).toMatchObject(defaultValue);
    });
    
})