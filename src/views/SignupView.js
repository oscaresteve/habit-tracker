import { signup } from "../actions/authActions";
import { isErr } from "../utils/result";

export function SignupView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Sign Up</h1>
      <form id="signup-form">
        <input id="email-input" type="email" name="email" placeholder="Email" />

        <input id="password-input" type="password" name="password" placeholder="Password"/>
        <input id="password-input-confirm" type="password" name="password" placeholder="Confirm Password"/>

        <input type="submit" value="Sign Up" />
      </form>
      <button id="login-btn">Go to Login</button>
  `;

  // Estado local del formulario
  const formState = {
    emailValue: "",
    passwordValue: "",
    passwordConfirmValue: "",
  };

  const loginBtn = section.querySelector("#login-btn");
  const signupForm = section.querySelector("#signup-form");
  const emailInput = section.querySelector("#email-input");
  const passwordInput = section.querySelector("#password-input");
  const passwordInputConfirm = section.querySelector("#password-input-confirm");

  loginBtn.addEventListener("click", () => onNavigate("login"));

  // Actualizar estado local al cambiar inputs
  emailInput.addEventListener("input", (e) => {
    formState.emailValue = e.target.value;
  });

  passwordInput.addEventListener("input", (e) => {
    formState.passwordValue = e.target.value;
  });

  passwordInputConfirm.addEventListener("input", (e) => {
    formState.passwordConfirmValue = e.target.value;
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = await signup({
      email: formState.emailValue,
      password: formState.passwordValue,
    });

    if (isErr(result)) {
      //Manejar los errores
      console.log(result);

      return;
    }

    console.log(result);
  });
  return section;
}
