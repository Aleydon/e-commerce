import { render, screen } from '@testing-library/react';

import Page from './page';

describe('Page Component', () => {
  it('should get the text hello world', () => {
    render(<Page />);
    const hello = screen.getByText('Hello World');
    expect(hello).toBeDefined();
  });

  it('should get the text hello world in the component s heading', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', {
      name: 'Hello World'
    });
    expect(heading).toBeInTheDocument();
  });

  it('must get the link from the page component', () => {
    render(<Page />);
    const link = screen.getByRole('link', { name: 'github.com/Aleydon' });
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('aria-label', 'github.com/Aleydon');
  });
});
