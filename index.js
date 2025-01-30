window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar-custom");
  let isDarkMode = document.body.getAttribute("data-bs-theme") === "dark";

  if (window.scrollY > 50) {
    if (isDarkMode) {
      navbar.classList.add("bg-dark", "shadow"); // សម្រាប់ night mode
      navbar.classList.remove("bg-white");
    } else {
      navbar.classList.add("bg-white", "shadow");
      navbar.classList.remove("bg-dark");
    }
  } else {
    navbar.classList.remove("bg-white", "bg-dark", "shadow");
  }
});

// ចង់អោយ navbar ផ្លាស់ប្តូរពេលប្តូរ night mode
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    let body = document.body;
    let navbar = document.querySelector(".navbar-custom");

    if (body.getAttribute("data-bs-theme") === "dark") {
      body.setAttribute("data-bs-theme", "light");
      navbar.classList.remove("bg-dark");
      navbar.classList.add("bg-white");
    } else {
      body.setAttribute("data-bs-theme", "dark");
      navbar.classList.remove("bg-white");
      navbar.classList.add("bg-dark");
    }
  });

// JavaScript for Typewriter Effect
let text = "Hi, I'm Buo Botin";
let index = 0;
let speed = 100; // Speed of typing (milliseconds)
let element = document.getElementById("typewriter-text");

function typeWriter() {
  if (index < text.length) {
    element.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  } else {
    // When the text is fully typed, clear the text and restart the typing effect
    setTimeout(function () {
      element.innerHTML = ""; // Clear the text
      index = 0; // Reset the index
      typeWriter(); // Restart the typing effect
    }, 1000); // Wait for 1 second before restarting
  }
}

//footer form
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
// Start the typing effect once the page loads
window.onload = typeWriter;
