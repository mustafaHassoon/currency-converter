import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders Exchange and History tabs", () => {
    render(<App />);
    expect(screen.getByText(/Exchange/i)).toBeInTheDocument();
    expect(screen.getByText(/History/i)).toBeInTheDocument();
  });

  test("renders input field for amount", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter amount/i)).toBeInTheDocument();
  });

  test("renders dropdowns for currency selection", () => {
    render(<App />);
    expect(screen.getAllByText(/From/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/To/i).length).toBeGreaterThan(0);
  });

  test("initially has an input field with default amount", () => {
    render(<App />);
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    expect(amountInput).toHaveValue(1);
  });

  test("changes amount input value on user input", () => {
    render(<App />);
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    fireEvent.change(amountInput, { target: { value: 100 } });
    expect(amountInput).toHaveValue(100);
  });

  test("toggles between Exchange and History tabs", () => {
    render(<App />);
    const historyTab = screen.getByText(/History/i);
    const exchangeTab = screen.getByText(/Exchange/i);

    fireEvent.click(historyTab);
    expect(screen.getByText(/Conversion History/i)).toBeInTheDocument();

    fireEvent.click(exchangeTab);
    expect(screen.getByText(/Währungsumtausch/i)).toBeInTheDocument();
  });
});
