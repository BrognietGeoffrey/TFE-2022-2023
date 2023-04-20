function isLoggedIn() {
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
