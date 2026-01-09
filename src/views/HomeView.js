import { getState } from "../state/store";

export function HomeView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Home</h1>
      <h3>Active user: <span id="active-user"></span></h3>
  `;

  const activeUser = section.querySelector("#active-user")
  
  activeUser.textContent = getState().user.email;

  return section;
}
