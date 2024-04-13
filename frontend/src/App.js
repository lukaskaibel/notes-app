import React, { useEffect, useState } from "react";
import { createNote } from "./utilities/createNote";
import { getNotes } from "./utilities/getNotes";
import { deleteNote } from "./utilities/deleteNote";
import "./style/style.css";
import NoteView from "./NoteView";
import NoteList from "./NoteList";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(-1);

  useEffect(() => {
    initialLoad();
  }, []);

  async function initialLoad() {
    const loadedNotes = await getNotes();
    setNotes(loadedNotes);
    if (loadedNotes.length > 0) {
      setSelectedNoteId(loadedNotes[0].id);
    }
  }

  async function updateNote(updatedNote) {
    console.log("Updating Note");
    setNotes(
      notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      })
    );
  }

  function getSelectedNote() {
    console.log(notes.find((note) => note.id === selectedNoteId));
    if (Array.isArray(notes)) {
      return notes.find((note) => note.id === selectedNoteId);
    }
    return null; // or however you wish to handle this case
  }

  return (
    <div className="application-container">
      <div className="side-panel">
        <h1>Notes</h1>
        <NoteList
          notes={notes}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
        />
      </div>
      <div className="selected-note-container">
        {!!getSelectedNote() ? (
          <NoteView note={getSelectedNote()} updateNote={updateNote} />
        ) : (
          <p>No note selected</p>
        )}
      </div>
    </div>
  );
}

export default App;
