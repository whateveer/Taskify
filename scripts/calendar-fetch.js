const addEventBtn = document.getElementById("addEventbtn");
addEventBtn.addEventListener("click", async () => {
  // Get input values
  const title = document.querySelector(".event-name").value;
  const timeFrom = document.querySelector(".event-time-from").value;
  const timeTo = document.querySelector(".event-time-to").value;

  // Validate input values
  if (!title || !timeFrom || !timeTo) {
    alert("Please fill all the fields");
    return;
  }

  // Prepare event data
  const eventData = {
    title: title,
    time: `${timeFrom} - ${timeTo}`,
  };

  try {
    // Send POST request to create event
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const data = await response.json();
    console.log("Event created:", data);
    // Handle success (e.g., display success message, update UI)
  } catch (error) {
    console.error("Error creating event:", error);
    // Handle error (e.g., display error message, revert UI changes)
  }
});
