document.getElementById("forgotPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const email = formData.get("email");
  
    try {
      const response = await fetch("/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      alert("Reset password instructions sent to your email.");
      window.location.href = "/login"; // Redirect to homepage or login page
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  });
  