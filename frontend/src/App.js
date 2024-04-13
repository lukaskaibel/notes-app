import React, { useEffect, useState } from "react";
import { createNote } from "./utilities/createNote";
import { getNotes } from "./utilities/getNotes";
import { deleteNote } from "./utilities/deleteNote";
import "./style/style.css";
import NoteView from "./NoteView";
import NoteList from "./NoteList";
import { editNote } from "./utilities/editNote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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

  async function createNote() {
    const newNote = await createNote({ id: -1, title: "", content: "" });
    setNotes([...notes, newNote]);
  }

  async function updateNote(updatedNote) {
    setNotes(
      notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      })
    );
    await editNote(updatedNote);
  }

  function getSelectedNote() {
    if (Array.isArray(notes)) {
      return notes.find((note) => note.id === selectedNoteId);
    }
    return null; // or however you wish to handle this case
  }

  return (
    <div className="application-container">
      <div className="side-panel">
        <div className="side-panel-header">
          <h1>Notes</h1>
          <button onClick={createNote}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
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
