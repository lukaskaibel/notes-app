import React, { useEffect, useState } from "react";
import moment from "moment";
import "./style/note.css";

function NoteView({ note, updateNote }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    if (!!note) {
      setTitle(note.title);
      setContent(note.content);
      setUpdatedAt(note.updated_at);
    }
  }, [note]);

  if (!note) {
    return <p>Loading...</p>;
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);

    updateNote({
      ...note,
      title: event.target.value,
    });
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);

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
