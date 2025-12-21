import { login } from "../services/authService";

export function LoginView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Login</h1>
      <form id="login-form">
        <input id="email-input" type="email" name="email" placeholder="Email" />

        <input id="password-input" type="password" name="password" />

        <input type="submit" value="Log In" />
      </form>
      <button id="register-btn">Go to Register</button>
  `;

  // Estado local del formulario
  const formState = { emailValue: "", passwordValue: "" };

  const registerBtn = section.querySelector("#register-btn");
  const loginForm = section.querySelector("#login-form");
  const emailInput = section.querySelector("#email-input");
  const passwordInput = section.querySelector("#password-input");

  registerBtn.addEventListener("click", () => onNavigate("register"));

  // Actualizar estado local al cambiar inputs
  emailInput.addEventListener("input", (e) => {
    formState.emailValue = e.target.value;
  });

  passwordInput.addEventListener("input", (e) => {
    formState.passwordValue = e.target.value;
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log(formState);

    await login({ email: formState.emailValue, password: formState.passwordValue });
  });
  return section;
}
