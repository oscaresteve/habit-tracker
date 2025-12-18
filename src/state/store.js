import { BehaviorSubject, distinctUntilChanged, map } from "rxjs";

//El store se encarga de modificar el estado y servir observables
const store = {
  user: null,
  habits: [],
  habitLogs: [],
  selectedDate: new Date().toISOString().slice(0, 10),
  ui: {
    route: "login",
    loading: false,
    error: null,
  },
};

export const state$ = new BehaviorSubject(store);

//Observable que emite cambios de ruta
export const route$ = state$.pipe(
  map((state) => state.ui.route),
  distinctUntilChanged()
);

export function getState() {
  return state$.getValue();
}

//Actualiza el estado de forma no profunda, se sigue la estructura definida
export function setState(partial) {
  const prevState = state$.value;

  const nextState = {
    ...prevState,
    ...partial,
    ui: {
      ...prevState.ui,
      ...partial.ui,
    },
  };

  state$.next(nextState);
}

export function setUser(user) {
  setState({
    user,
  });
}

export function setRoute(route) {
  setState({
    ui: { route },
  });
}
