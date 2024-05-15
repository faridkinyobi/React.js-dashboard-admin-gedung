import store from "./story";

let authSaatIni;

function listener() {
  let authSebelumnya = authSaatIni;

   authSaatIni = store.getState().auth;
  if (authSebelumnya !== authSaatIni) {
    localStorage.setItem("auth", JSON.stringify(authSaatIni));
  }
}
function listen() {
  store.subscribe(listener);
}

export { listen };
