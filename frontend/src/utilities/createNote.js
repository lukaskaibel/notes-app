export async function createNote(note) {
  console.log("Creating Note");
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(
      "http://localhost:8000/note/new/",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Success:", data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
