import firebase from './firebase'
import { CERRAR_SESION, INICIAR_SESION } from '../actions/types'

export const checkSession = () => dispatch => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user ? user : false
}

export const login = usuario => async dispatch => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(usuario.correo, usuario.contrasena)
    .then(function(user) {
      return firebase
        .database()
        .ref(`usuarios/${user.uid}`)
        .once('value')
        .then(function(snapShot) {
          dispatch({
            type: INICIAR_SESION,
            payload: { ...snapShot.val(), uid: snapShot.key }
          })
          return true
        })
    })
    .catch(function(error) {
      return false
    })
}

export const facebookLogin = () => async dispatch => {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result)
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error)
    })
}

export const registro = usuario => async dispatch => {
  const usr = {
    nombre: usuario.nombre,
    celular: usuario.celular,
    correo: usuario.correo,
    contrasena: usuario.contrasena,
    direccion: null
  }
  return firebase
    .auth()
    .createUserWithEmailAndPassword(usuario.correo, usuario.contrasena)
    .then(function(user) {
      firebase
        .database()
        .ref(`usuarios/${user.uid}`)
        .set(usr)
      user
        .updateProfile({
          displayName: usuario.nombre
        })
        .then(
          function() {
            dispatch({
              type: INICIAR_SESION,
              payload: { ...usr, uid: user.uid }
            })
            return { ...usr, uid: user.uid }
          },
          function(error) {
            return error
            // An error happened.
          }
        )
        .catch(error => {
          return error
        })
      return user
    })
    .catch(function(error) {
      return error
    })
}

export const cerrarSesion = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(resul => {
      dispatch({ type: CERRAR_SESION })
    })
}
