import React, { useEffect, useState } from "react";
import "./style/note.css";

function NoteView({ note, updateNote }) {
  // Local state for controlled input fields
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    if (!!note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]); // Fetch note whenever noteId changes

  // Render loading state while fetching the note
  if (!note) {
    return <p>Loading...</p>;
  }

  // Handle title changes
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    // Propagate changes to parent component
    updateNote({
      ...note,
      title: event.target.value,
    });
  };

  // Handle content changes
  const handleContentChange = (event) => {
    setContent(event.target.value);
    // Propagate changes to parent component
    updateNote({
      ...note,
      content: event.target.value,
    });
  };

  return (
    <div className="note">
      <input
        type="text"
        className="note-title"
        value={title}
        onChange={handleTitleChange}
        style={{ fontWeight: "bold", fontSize: "24px", width: "100%" }}
        placeholder="Enter title"
      />
      <textarea
        value={content}
        className="note-content"
        onChange={handleContentChange}
        placeholder="Enter content"
      />
    </div>
  );
}

export default NoteView;
