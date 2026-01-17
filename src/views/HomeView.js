import { getState, setUser } from "../state/store";
import { isErr } from "../utils/result";
import { logout } from "../services/authService";

export function HomeView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Home</h1>
      <h3>Active user: <span id="active-user"></span></h3>
      <button id="logout-btn">Log Out</button>
  `;

  const activeUser = section.querySelector("#active-user");
  const logoutBtn = section.querySelector("#logout-btn");

  activeUser.textContent = getState().user.email;

  logoutBtn.addEventListener("click", async () => {
    const result = await logout();

    if (isErr(result)) {
    }

    setUser(null);

    onNavigate("login");
  });

  return section;
}
