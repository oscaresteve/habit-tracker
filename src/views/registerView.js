import { router } from "../router/router";

export function renderRegisterView(root) {
  root.innerHTML = `
    <section>
      <h1>Register</h1>
      <button id="btn">Go to Login</button>
    </section>
  `;

  const btn = root.querySelector("#btn");
  btn.addEventListener("click", () => {
    router.navigate("login");
  });
}
