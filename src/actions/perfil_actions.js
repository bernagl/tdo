// import firebase from './firebase'
import {
  ACTUALIZAR_PERFIL,
  ACTUALIZAR_DIRECCION,
  GET_DIRECCION,
  GET_DIRECCIONES
} from './types'

// export const actualizarPerfil = usuario => async dispatch => {
//   const auth = firebase.auth().currentUser
//   let hasError
//   const credential = firebase.auth.EmailAuthProvider.credential(
//     usuario.credentials.correo,
//     usuario.credentials.contrasena
//   )
//   const user = {
//     uid: usuario.uid,
//     nombre: usuario.nombre,
//     celular: usuario.celular,
//     correo: usuario.correo,
//     contrasena: usuario.contrasena
//   }
//   try {
//     await auth.reauthenticateWithCredential(credential)
//     await auth.updateProfile({ displayName: user.nombre })
//     await auth.updatePassword(user.contrasena)
//     await auth.updateEmail(user.correo)
//   } catch (error) {
//     hasError = error
//   }

//   return !hasError
//     ? firebase
//         .database()
//         .ref(`usuarios/${usuario.uid}`)
//         .update(user)
//         .then(result => {
//           dispatch({ type: ACTUALIZAR_PERFIL, payload: user })
//           return user
//         })
//         .catch(error => error)
//     : hasError
//   // return resultado
// }

// export const actualizarDireccion = data => dispatch => {
//   const address = {
//     calle: data.calle,
//     numero: data.numero,
//     colonia: data.colonia,
//     ciudad: data.ciudad,
//     estado: data.estado,
//     cp: data.cp
//   }
//   return firebase
//     .database()
//     .ref(`usuarios/${data.uid}/direcciones/${data.id}`)
//     .update(address)
//     .then(result => {
//       // localStorage.setItem('user', JSON.stringify(user))
//       dispatch({ type: ACTUALIZAR_DIRECCION, payload: address })
//       return true
//     })
//     .catch(error => false)
// }

// export const agregarDireccion = data => dispatch => {
//   const address = {
//     calle: data.calle,
//     numero: data.numero,
//     colonia: data.colonia,
//     ciudad: data.ciudad,
//     estado: data.estado,
//     cp: data.cp
//   }
//   return firebase
//     .database()
//     .ref(`usuarios/${data.uid}/direcciones`)
//     .push(address)
//     .then(result => true)
//     .catch(error => false)
// }

// export const eliminarDireccion = data => dispatch => {
//   return firebase
//     .database()
//     .ref(`usuarios/${data.uid}/direcciones/${data.id}`)
//     .remove()
//     .then(result => true)
//     .catch(error => false)
// }

// export const getDireccion = data => dispatch => {
//   firebase
//     .database()
//     .ref(`usuarios/${data.uid}/direcciones/${data.id}`)
//     .once('value')
//     .then(function(snapShot) {
//       dispatch({
//         type: GET_DIRECCION,
//         payload: { ...snapShot.val() }
//       })
//     })
// }

// export const getDirecciones = uid => dispatch => {
//   firebase
//     .database()
//     .ref(`usuarios/${uid}/direcciones`)
//     .on('value', function(snapShot) {
//       let direcciones = []
//       snapShot.forEach(direccion => {
//         direcciones.push({ id: direccion.key, ...direccion.val() })
//       })

//       direcciones.length === 0 && (direcciones = null)
//       dispatch({
//         type: GET_DIRECCIONES,
//         payload: direcciones
//       })
//     })
// }
