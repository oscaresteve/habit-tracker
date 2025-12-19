export function RegisterView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Register</h1>
      <button id="btn">Go to Login</button>
  `;

  section
    .querySelector("#btn")
    .addEventListener("click", () => onNavigate("login"));

  return section;
}
