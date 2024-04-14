export async function getNotes() {
  try {
    const response = await fetch("http://localhost:8000/note/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const notes = JSON.parse(data).map((entry) => {
      return {
        id: entry.pk,
        title: entry.fields.title,
        content: entry.fields.content,
        updated_at: entry.fields.updated_at,
      };
    });
    console.log("Success:", notes);
    return notes; // Return the data directly after it's been fetched and processed
  } catch (error) {
    console.error("Error:", error);
    return {}; // Return an empty object or appropriate error handling
  }
}
