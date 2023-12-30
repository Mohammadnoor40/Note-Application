import React, { useState, useEffect } from 'react';
import './App.css';

// NotesApp component
function NotesApp() {
  // State for managing form inputs
  const [note, setNote] = useState({
    title: '',
    body: '',
    reminder: '',
    color: '#ffffff',
  });
  const [notes, setNotes] = useState([]);
  const addNote = () => {
    if (note.title.trim() === '' || note.body.trim() === '') {
      alert('Please enter both title and body for the note.');
      return;
    }

    const newNote = {
      ...note,
      created: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);

    setNote({
      title: '',
      body: '',
      reminder: '',
      color: '#ffffff',
    });
  };


  const removeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(existingNotes);
  }, []);
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="app-container">
      <h1>Notes Application</h1>
      <form>
        <label>Title:</label>
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          required
        />

        <label>Body:</label>
        <textarea
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
          required
        ></textarea>

        <label>Reminder:</label>
        <input
          type="datetime-local"
          value={note.reminder}
          onChange={(e) => setNote({ ...note, reminder: e.target.value })}
        />

        <label>Note Color:</label>
        <input
          type="color"
          value={note.color}
          onChange={(e) => setNote({ ...note, color: e.target.value })}
        />

        <button type="button" onClick={addNote}>
          Add Note
        </button>
      </form>

      <ul>
        {notes.map((n, index) => (
          <li key={index} style={{ backgroundColor: n.color }}>
            <strong>{n.title}</strong>
            <br />
            {n.body}
            <br />
            Created: {n.created}
            <br />
            Reminder: {n.reminder || 'None'}
            <button onClick={() => removeNote(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesApp;