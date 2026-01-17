import { login } from "../services/authService";
import { setUser } from "../state/store";
import { isErr } from "../utils/result";

export function LoginView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Login</h1>
      <form id="login-form">
        <input id="email-input" type="email" name="email" placeholder="Email" />

        <input id="password-input" type="password" name="password" />

        <input type="submit" value="Log In" />
      </form>
      <button id="signup-btn">Go to Sign Up</button>
  `;

  // Estado local del formulario
  const formState = { emailValue: "", passwordValue: "" };

  const signupBtn = section.querySelector("#signup-btn");
  const loginForm = section.querySelector("#login-form");
  const emailInput = section.querySelector("#email-input");
  const passwordInput = section.querySelector("#password-input");

  signupBtn.addEventListener("click", () => onNavigate("signup"));

  // Actualizar estado local al cambiar inputs
  emailInput.addEventListener("input", (e) => {
    formState.emailValue = e.target.value;
  });

  passwordInput.addEventListener("input", (e) => {
    formState.passwordValue = e.target.value;
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = await login({
      email: formState.emailValue,
      password: formState.passwordValue,
    });

    if (isErr(result)) {
      //Manejar los errores
      console.log(result);

      return;
    }

    //Se modifica el estado global
    setUser({
      access_token: result.data.access_token,
      email: result.data.user.email,
      id: result.data.user.id,
    });

    //Se navega a home
    onNavigate("home");

    console.log(result);
  });
  return section;
}
