export async function createNote(note) {
  try {
    // Specify the request options
    const requestOptions = {
      method: "POST", // Indicate that this is a POST request
      headers: {
        "Content-Type": "application/json", // Indicate the content type of the request body
      },
      body: JSON.stringify(note), // Convert the JavaScript object to a JSON string
    };

    // Use the fetch API to send the request to the server
    const response = await fetch(
      "http://localhost:8000/note/new/",
      requestOptions
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response body
    const data = await response.json();

    // Log the response data to the console (or handle it as needed)
    console.log("Success:", data);

    return data;
  } catch (error) {
    // Log any errors to the console
    console.error("Error:", error);
  }
}
