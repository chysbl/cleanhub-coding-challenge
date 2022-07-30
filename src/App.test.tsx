import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('shows header', () => {
    render(<App />);
    expect(screen.getByText('CleanHub Collection Hubs')).toBeDefined();
  });
});
