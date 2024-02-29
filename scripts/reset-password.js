document.getElementById("resetPasswordForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const password = formData.get("password");
  const token = getResetTokenFromUrl(); // Function to get reset token from URL

  try {
    const response = await fetch("/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, password })
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    alert("Password reset successfully.");
    window.location.href = "/login"; // Redirect to homepage or login page
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
});

function getResetTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("token");
}
