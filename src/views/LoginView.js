export function LoginView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Login</h1>
      <button id="btn">Go to Register</button>
  `;

  section
    .querySelector("#btn")
    .addEventListener("click", () => onNavigate("register"));

  return section;
}
