import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Page from '@/app/page';
import { Notes } from '@/components/noteapp/notes';
import userEvent from '@testing-library/user-event';

describe('Note taking API integration test', () => {
  it('should render the app', () => {
    render(<Page />);

    const allNotesComponent = screen.getByText('All Notes');
    const inputComponent = screen.getByRole('noteInput');
    expect(allNotesComponent).toBeInTheDocument();
    expect(inputComponent).toBeInTheDocument();
  });

  it('should render the initial data', async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const mockData = await res.json();

    render(<Notes data={mockData} />);

    expect(mockData).toHaveLength(3);
    expect(screen.getByText('Note 1')).toBeInTheDocument();
  });

  it('should return the current data after post', async () => {
    render(<Page />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('submit');

    await userEvent.type(input, "I'm a new note");
    await userEvent.click(button);

    const message = screen.getByText('Note created successfully');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(message).toBeInTheDocument();

    const res = await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      body: JSON.stringify({ content: "I'm a new note" }),
    });
    const data = await res.json();

    expect(data).toEqual({ id: 4, content: "I'm a new note" });
  });

  it('should return the current data after patch', async () => {
    const res = await fetch('http://localhost:3000/api/notes/1', {
      method: 'PATCH',
      body: JSON.stringify({ content: 'I am updated' }),
    });
    const data = await res.json();

    expect(data).toEqual({ id: '1', content: 'I am updated' });
  });

  it('should return the current id after delete', async () => {
    const res = await fetch('http://localhost:3000/api/notes/1', {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);

    expect(data).toEqual({ id: '1' });

    const res2 = await fetch('http://localhost:3000/api/notes/2', {
      method: 'DELETE',
    });
    const data2 = await res2.json();
    console.log(data2);

    expect(data2).toEqual({ id: '2' });
  });
});
