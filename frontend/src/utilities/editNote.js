export async function editNote(note) {
  console.log(JSON.stringify(note));
  try {
    // Specify the request options
    const requestOptions = {
      method: "PUT", // Indicate that this is a POST request
      headers: {
        "Content-Type": "application/json", // Indicate the content type of the request body
      },
      body: JSON.stringify(note), // Convert the JavaScript object to a JSON string
    };

    console.log(requestOptions.body);

    // Use the fetch API to send the request to the server
    const response = await fetch(
      "http://localhost:8000/note/edit/",
      requestOptions
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.error}`
      );
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
