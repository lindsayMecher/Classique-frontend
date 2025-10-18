import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Home from './Home';

test('renders Home Component', () => {
  render(
    <MemoryRouter>
      <Home updateUser={jest.fn()} />
    </MemoryRouter>
  );

  const header = screen.getByRole("heading", { level: 1, name: /Classique/i });
  expect(header).toBeInTheDocument();
});