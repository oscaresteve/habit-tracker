import { router } from "./router/router";
import { route$ } from "./state/store";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";

router.init();

const root = document.querySelector("#app");

//Se escuchan cambios en la ruta y se renderiza la vista correspondiente
route$.subscribe((route) => {
  root.innerHTML = "";

  let view;

  switch (route) {
    case "login":
      view = LoginView({ onNavigate: router.navigate });
      break;
    case "register":
      view = RegisterView({ onNavigate: router.navigate });
      break;
    default:
      view = document.createElement("h1");
      view.textContent = "404";
  }

  root.appendChild(view);
});
