import { render, screen } from '@testing-library/react';
import { Loader } from '@/auth/components/Loader'; // Ajusta la ruta

describe('Loader component', () => {
    test('should render the spinner', () => {
        render(<Loader />);
        const spinner = screen.getByLabelText('loader-identifier');
        expect(spinner).toBeInTheDocument();
    });
});
