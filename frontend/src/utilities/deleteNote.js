export async function deleteNote(id) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };

    const response = await fetch(
      "http://localhost:8000/note/delete/",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Delete successful:", data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
