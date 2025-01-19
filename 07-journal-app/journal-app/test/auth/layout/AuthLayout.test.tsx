import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { purpleTheme } from '@/theme/purpleTheme';
import { AuthLayout } from '@/auth/layout/AuthLayout';


describe("AuthLayout Component", () => {
    const renderWithTheme = (ui: React.ReactElement) =>
      render(<ThemeProvider theme={purpleTheme}>{ui}</ThemeProvider>);
  
    test("should render the descriptor correctly", () => {
      const descriptorText = "Auth layout";
      renderWithTheme(
        <AuthLayout descriptor={descriptorText}>
          <div>Child content</div>
        </AuthLayout>
      );
  
      expect(screen.getByText(descriptorText)).toBeInTheDocument();
    });
  
    test("should render the children content", () => {
      const childContent = "Child node";
      renderWithTheme(
        <AuthLayout descriptor="A descriptor">
          <div>{childContent}</div>
        </AuthLayout>
      );
  
      expect(screen.getByText(childContent)).toBeInTheDocument();
    });

  });
  