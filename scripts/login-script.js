document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validateLoginForm(email, password)) {
      return; // Exit if validation fails
    }

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Store tokens in localStorage
        localStorage.setItem("ACCESS_TOKEN",data.accessToken);
        // Redirect to workspace or do any other necessary actions
        window.location.href = "/workspace/todo";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

function validateLoginForm(email, password) {
  if (email === "" || password === "") {
    alert("Both email and password are required.");
    return false;
  }

  return true;
}

// Функция, которая сохраняет токен доступа в localStorage
// function saveAccessTokenToLocalStorage(token) {
//     localStorage.setItem("accessToken", token);
// }

// // Обработка успешной аутентификации и сохранение токена доступа в localStorage
// document.getElementById("loginForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Предотвращаем отправку формы

//     const formData = new FormData(this);
//     console.log("Form Data:", formData);
//     try {

//         const response = await fetch("/login", {
//             method: "POST",
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error("Login failed");
//         }

//         const data = await response.json();
//         saveAccessTokenToLocalStorage(data.accessToken); // Сохраняем токен доступа в localStorage
//         console.log(localStorage.getItem("accessToken"));
//         // Перенаправляем пользователя на другую страницу или выполняем другие действия
//         window.location.href = "/workspace"; // Пример перенаправления на страницу workspace
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Login failed. Please try again.");
//     }
// });
