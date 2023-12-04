'use client';

import { useState } from 'react';

export const NoteInput = () => {
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  async function handleCreateNote() {
    const res = await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      body: JSON.stringify({ content: note }),
    });
    if (!res.ok) {
      setMessage('Note creation failed');
      return;
    }

    setMessage('Note created successfully');
  }

  return (
    <div role="noteInput">
      <input role="textbox" onChange={(e) => setNote(e.target.value)} />
      <button role="submit" onClick={handleCreateNote}>
        Add Note
      </button>
      {message && <div>{message}</div>}
    </div>
  );
};
