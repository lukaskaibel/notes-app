import React from "react";
import "./style/noteList.css"; // Make sure your styles are correctly imported

function NoteList({ notes, setSelectedNoteId, selectedNoteId }) {
  // Include selectedNoteId in the props
  if (!notes || notes.length === 0) {
    return <div>No notes available.</div>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div
          className={`note-list-item ${
            note.id === selectedNoteId ? "selected" : ""
          }`} // Apply 'selected' class conditionally
          key={note.id}
          onClick={() => setSelectedNoteId(note.id)}
        >
          <div>{note.title}</div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
