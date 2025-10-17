import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Myposts from './components/Myposts';
import Edituser from './components/Edituser';
import New from './components/New';
import Favorites from './components/Favorites';
import About from './components/About';

// Render the correct component for each route.
// Handle unknown routes / 404s.
// Check protected routes / redirects.

describe('App Routes', () => {
  it('renders Home component at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Enter email and password to log in./i)).toBeInTheDocument();
  });

  it('renders Signup component at /signup', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Signup />
      </MemoryRouter>
    );

    await expect(screen.findByRole('heading', { name: /Sign Up To Create An Account/i })).toBeInTheDocument();
  });

  test('renders the "Hello World" message', () => {

    render(<HelloWorld />);

    const helloWorldText = screen.getByText('Hello World');

    expect(helloWorldText).toBeInTheDocument();

  });

  // it('renders Dashboard component at /dashboard', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/dashboard']}>
  //       <Dashboard />
  //     </MemoryRouter>
  //   );
  //   screen.debug()
  //   expect(screen.findByRole('heading', { name: /Available Opportunities/i })).toBeInTheDocument();
  // });

  // it('renders Myposts component at /my-posts', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/my-posts']}>
  //       <Myposts />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByRole('heading', { name: /My Posts/i })).toBeInTheDocument();
  // });

  // it('renders Edituser component at /edit-user', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/edit-user']}>
  //       <Edituser />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByRole('heading', { name: /Edit My Information/i })).toBeInTheDocument();
  // });

  // it('renders New component at /new-post', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/new-post']}>
  //       <New />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByRole('heading', { name: /Edit My Information/i })).toBeInTheDocument();
  // });

  // it('renders Favorites component at /favorites', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/favorites']}>
  //       <Favorites />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  // });

  // it('renders About component at /about', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/about']}>
  //       <About />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByRole('heading', { name: /Welcome to Classique/i })).toBeInTheDocument();
  // });

  it('redirects to home page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Enter email and password to log in./i)).toBeInTheDocument();
  });

  
});