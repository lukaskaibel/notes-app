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

  useEffect(() => {
    setNotes(
      notes.filter((note) => {
        if (
          note.id !== selectedNoteId &&
          note.title.trim() === "" &&
          note.content.trim() === ""
        ) {
          deleteNote(note.id);
          return false;
        }
        return true;
      })
    );
  }, [selectedNoteId]);

  async function initialLoad() {
    const loadedNotes = await getNotes();
    updateNotes(loadedNotes);
    if (loadedNotes.length > 0) {
      setSelectedNoteId(loadedNotes[0].id);
    }
  }

  async function addNote() {
    const newNote = await createNote({ id: -1, title: "", content: "" });
    setSelectedNoteId(newNote.id);
    updateNotes([...notes, newNote]);
  }

  async function updateNote(updatedNote) {
    const editedNote = await editNote(updatedNote);
    updateNotes(
      notes.map((note) => {
        if (note.id === editedNote.id) {
          return editedNote;
        }
        return note;
      })
    );
  }

  function updateNotes(notes) {
    const sortedNotes = notes.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB - dateA;
    });

    setNotes(sortedNotes);
  }

  async function handleDelete(id) {
    updateNotes(notes.filter((note) => note.id !== id));
    await deleteNote(id);
  }

  function getSelectedNote() {
    if (Array.isArray(notes)) {
      return notes.find((note) => note.id === selectedNoteId);
    }
    return null;
  }

  return (
    <div className="application-container">
      <div className="side-panel">
        <div className="side-panel-header">
          <h1>Notes</h1>
          <button onClick={addNote}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <NoteList
          notes={notes}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          deleteNote={handleDelete}
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
