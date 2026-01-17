import { setRoute, getState } from "../state/store";

//El router solo escucha cambios en el hash y modifica el estado
export const router = {
  protectedRoutes: ["home"],
  publicOnlyRoutes: ["login", "register"],
  init() {
    const handleHashchange = () => {
      let route = location.hash.replace("#", "") || "login";

      console.log("Hash changed:", route);

      const user = getState().user;

      //Usuario no autenticado, redirige login
      if (this.protectedRoutes.includes(route) && !user) {
        route = "login";
        location.hash = "#login";
      }

      //Usuario autenticado, redirige a home
      if (this.publicOnlyRoutes.includes(route) && user) {
        route = "home";
        location.hash = "#home";
      }

      setRoute(route);
    };
    window.addEventListener("hashchange", handleHashchange);
    window.addEventListener("load", handleHashchange);
    handleHashchange();
  },
  navigate(route) {
    location.hash = `${route}`;
  },
};
