function isLoggedIn() {
  // vérifier si le token est présent dans le local storage et si il est toujours valide
    
  return localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "undefined";
}

function deleteTokens() {
  localStorage.removeItem("access_token");

}

function requiredAuth(nextState, replace) {
  if (!isLoggedIn()) {
      replace({
          pathname: '/login',
          state: {nextPathname: nextState.location.pathname}
      })
  }
}


module.exports = {
  isLoggedIn,
  deleteTokens,
  requiredAuth
};
