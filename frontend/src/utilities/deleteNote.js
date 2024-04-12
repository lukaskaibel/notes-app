export async function deleteNote(id) {
  try {
    // Specify the request options
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };

    // Use the fetch API to send the request to the server
    const response = await fetch(
      "http://localhost:8000/note/delete/",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Assuming the API might return a message or confirmation
    const data = await response.json();

    console.log("Delete successful:", data);

    // Optionally, return the response data
    return data;
  } catch (error) {
    // Log any errors to the console
    console.error("Error:", error);
  }
}
