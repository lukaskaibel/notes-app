import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./style/noteList.css";

function NoteList({ notes, setSelectedNoteId, selectedNoteId, deleteNote }) {
  if (!notes || notes.length === 0) {
    return <div>No notes available.</div>;
  }

  function handleDelete() {
    deleteNote(selectedNoteId);
  }

  function isNoteEmpty(note) {
    return note.title.trim() === "" && note.content.trim() === "";
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div
          className={`note-list-item ${
            note.id === selectedNoteId ? "selected" : ""
          }`}
          key={note.id}
          onClick={() => setSelectedNoteId(note.id)}
        >
          <div>
            {note.title.trim() !== ""
              ? note.title
              : note.content.trim() !== ""
              ? note.content
              : "New Note"}
          </div>
          {selectedNoteId == note.id && !isNoteEmpty(note) && (
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default NoteList;
