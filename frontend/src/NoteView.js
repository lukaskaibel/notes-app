import React, { useEffect, useState } from "react";
import moment from "moment";
import "./style/note.css";

function NoteView({ note, updateNote }) {
  // Local state for controlled input fields
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    if (!!note) {
      setTitle(note.title);
      setContent(note.content);
      setUpdatedAt(note.updated_at);
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

  const formattedDate = moment(note.updated_at).format("D. MMMM YYYY");
  const formattedTime = moment(note.updated_at).format("H:mm");

  return (
    <div className="note">
      <div className="note-header">
        <div>
          {formattedDate} at {formattedTime}
        </div>
      </div>
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
