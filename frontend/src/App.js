import React, { useEffect, useState } from "react";
import { createNote } from "./utilities/createNote";
import { getNotes } from "./utilities/getNotes";
import { deleteNote } from "./utilities/deleteNote";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    // Define an async function inside the effect
    async function fetchNotes() {
      const loadedNotes = await getNotes(); // Assuming getNotes() is defined to fetch data
      setNotes(loadedNotes);
    }

    // Call the async function
    fetchNotes();

    // Optional: Cleanup function if necessary
    return () => {
      // Cleanup code here (e.g., aborting the fetch)
    };
  }, []);

  const handleInputChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote(newNote);
    setNewNote({ title: "", content: "" });
    const notes = await getNotes();
    setNotes(notes);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    const notes = await getNotes();
    setNotes(notes);
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
