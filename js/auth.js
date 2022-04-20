const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const mainBlock = document.querySelector("main");
const port = "link";
function goToLogin() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    mainBlock.style.display = "none";
}
  
function goToRegister() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    mainBlock.style.display = "none";
}
function register(e) {
    e.preventDefault();
    const dataRequest = {
      credentials: {
        email: registerForm[0].value,
        password: registerForm[1].value
      },
    };
    fetch(port + "sign-up", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dataRequest),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
          } else {
            alert(data.message);
          }
        });
  }
  function login(e) {
    e.preventDefault();
    const dataRequest = {
      credentials: {
        email: loginForm[0].value,
        password: loginForm[1].value
      },
    };
  
    fetch(port + "sign-in", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataRequest),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          alert(data.message);
        }
      });
  }