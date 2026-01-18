import { router } from "./router/router";
import { route$, setUser } from "./state/store";
import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { HomeView } from "./views/HomeView";
import { restoreSession } from "./actions/authActions";
import { isOk } from "./utils/result";

//Se intenta restaurar la sesion, luego se inicia el router

async function bootstrap() {
  const session = await restoreSession();

  if (isOk(session)) {
    setUser({
      email: session.data.user.email,
      id: session.data.user.id,
      access_token: session.data.access_token,
    });
  }

  router.init();
}

bootstrap();

const root = document.querySelector("#app");

//Se escuchan cambios en la ruta y se renderiza la vista correspondiente
route$.subscribe((route) => {
  root.innerHTML = "";

  let view;

  switch (route) {
    case "login":
      view = LoginView({ onNavigate: router.navigate });
      break;
    case "signup":
      view = SignupView({ onNavigate: router.navigate });
      break;
    case "home":
      view = HomeView({ onNavigate: router.navigate });
      break;
    default:
      view = document.createElement("h1");
      view.textContent = "404";
  }

  root.appendChild(view);
});
