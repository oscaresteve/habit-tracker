import { setRoute, getState } from "../state/store";

//El router solo escucha cambios en el hash y modifica el estado
export const router = {
  protectedRoutes: ["home"],
  init() {
    const handleHashchange = () => {
      let route = location.hash.replace("#", "") || "login";
      
      console.log("Hash changed:", route);
      
      const user = getState().user;

      if (this.protectedRoutes.includes(route) && !user) {
        route = "login";
        location.hash = "#login";
      }
      
      setRoute(route);
    };
    window.addEventListener("hashchange", handleHashchange);
  },
  navigate(route) {
    location.hash = `${route}`;
  },
};
