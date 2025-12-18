import { router } from "../router/router";

export function renderLoginView(root) {
  root.innerHTML = `
    <section>
      <h1>Login</h1>
      <button id="btn">Go to Register</button>
    </section>
  `;

  const btn = root.querySelector("#btn");
  btn.addEventListener("click", () => {
    router.navigate("register");
  });
}
