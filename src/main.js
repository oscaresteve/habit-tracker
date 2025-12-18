import { router } from "./router/router";
import { route$ } from "./state/store";
import { renderLoginView } from "./views/loginView";
import { renderRegisterView } from "./views/registerView";

router.init();

const root = document.querySelector("#app");

//Se escuchan cambios en la ruta y se renderiza la vista correspondiente
route$.subscribe((route) => {
  root.innerHTML = "";

  switch (route) {
    case "login":
      renderLoginView(root);
      break;
    case "register":
      renderRegisterView(root);
      break;
    default:
      root.innerHTML = "<h1>404</h1>";
  }
});
