import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortalPage from './page';

describe('PortalPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---- HAPPY PATH ----
  it('should render login screen initially', () => {
    render(<PortalPage />);
    expect(screen.getByText('Client Portal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  }, 10000);

  it('should log in and show dashboard when Sign In is clicked', async () => {
    render(<PortalPage />);
    
    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInBtn);

    expect(await screen.findByText('Welcome back 👋')).toBeInTheDocument();
    expect(screen.getByText('Project Alpha', { selector: 'p' })).toBeInTheDocument();
  });

  // ---- EDGE CASES ----
  it('should switch between views correctly', async () => {
    render(<PortalPage />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Switch to Kanban
    const kanbanTab = await screen.findByText('Kanban Board', { selector: 'span' });
    fireEvent.click(kanbanTab.parentElement!);

    expect(await screen.findByRole('heading', { name: /Kanban Board/i })).toBeInTheDocument();
    expect(screen.getByText('Sprint 2 · Project Alpha')).toBeInTheDocument();

    // Switch to Invoices
    const invoiceTab = screen.getByText('Invoices', { selector: 'span' });
    fireEvent.click(invoiceTab.parentElement!);

    expect(await screen.findByRole('heading', { name: /Invoices/i })).toBeInTheDocument();
    expect(screen.getByText('Total Value')).toBeInTheDocument();
  });

  it('should collapse and expand sidebar', async () => {
    render(<PortalPage />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    const toggleBtn = await screen.findByLabelText('Toggle sidebar');
    fireEvent.click(toggleBtn);

    // Sidebar should be collapsed (check for arrow change or hidden text)
    expect(screen.getByText('→')).toBeInTheDocument();
    
    fireEvent.click(toggleBtn);
    expect(screen.getByText('←')).toBeInTheDocument();
  });

  // ---- ERROR CASES ----
  it('should sign out and return to login screen', async () => {
    render(<PortalPage />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    const signOutBtn = await screen.findByText('Sign Out');
    fireEvent.click(signOutBtn.parentElement!);

    expect(await screen.findByText('Client Portal')).toBeInTheDocument();
  });
});
