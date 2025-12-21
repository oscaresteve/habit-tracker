export function RegisterView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Register</h1>
      <form id="login-form">
        <input id="email-input" type="email" name="email" placeholder="Email" />

        <input id="password-input" type="password" name="password" placeholder="Password"/>
        <input id="password-input-confirm" type="password" name="password" placeholder="Confirm Password"/>

        <input type="submit" value="Log In" />
      </form>
      <button id="login-btn">Go to Login</button>
  `;

  // Estado local del formulario
  const formState = { emailValue: "", passwordValue: "", passwordConfirmValue: "" };

  const loginBtn = section.querySelector("#login-btn");
  const registerForm = section.querySelector("#login-form");
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

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      console.log(formState);
    } catch (error) {}
  });
  return section;
}
