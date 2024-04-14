export async function editNote(note) {
  console.log(JSON.stringify(note));
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    console.log(requestOptions.body);

    const response = await fetch(
      "http://localhost:8000/note/edit/",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.error}`
      );
    }

    const data = await response.json();

    console.log("Success:", data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
