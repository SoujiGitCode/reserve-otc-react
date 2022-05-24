export const isAuthenticated = (state) => {
   // console.log(state);
    if (state.auth.auth.logged) return true;
    //si esta en true el logged del response, te deja avanzar al dashboard! sino pantalla gris
  // console.log('llego hasta auth selector :'+ state.auth.auth.logged)
    return false;
};
