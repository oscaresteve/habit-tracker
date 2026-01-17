import { getAccessToken, getState, setUser } from "../state/store";
import { isErr } from "../utils/result";
import { logout } from "../services/authService";
import { createHabit, readHabit } from "../services/habitService";

export function HomeView({ onNavigate }) {
  const section = document.createElement("section");

  section.innerHTML = `
      <h1>Home</h1>
      <h3>Active user: <span id="active-user"></span></h3>
      <button id="logout-btn">Log Out</button>

      <h1>CRUD Habitos</h1>
      <button id="create-habit-btn">Create Habit</button>
      <button id="read-habit-btn">Read Habit</button>
  `;

  const activeUser = section.querySelector("#active-user");
  const logoutBtn = section.querySelector("#logout-btn");
  const createHabitBtn = section.querySelector("#create-habit-btn");
  const readHabitBtn = section.querySelector("#read-habit-btn");

  activeUser.textContent = getState().user.email;

  logoutBtn.addEventListener("click", async () => {
    const result = await logout();

    if (isErr(result)) {
      //Manejar los errores

      console.log(result);
    }

    //Se limpia el usuario del estado
    setUser(null);

    //Se navega a login
    onNavigate("login");

    console.log(result);
  });

  createHabitBtn.addEventListener("click", async () => {
    const result = await createHabit({
      token: getAccessToken(),
      habit: {
        name: "Test",
        description: "Habit Test",
        frecuency: "daily",
      },
    });

    if (isErr(result)) {
      //Manejar los errores
      console.log(result);

      return;
    }

    console.log(result);
  });

  readHabitBtn.addEventListener("click", async () => {
    const result = await readHabit({
      token: getAccessToken(),
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
