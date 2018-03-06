import {
  INICIAR_SESION,
  ACTUALIZAR_PERFIL,
  CERRAR_SESION
} from '../actions/types'
import { REHYDRATE, PURGE } from 'redux-persist'

export default function(state = null, action) {
  switch (action.type) {
    case INICIAR_SESION:
      return action.payload
    case CERRAR_SESION:
      return null
    case ACTUALIZAR_PERFIL:
      return { ...action.payload }
    // case REHYDRATE:
    //   if (action.payload) {
    //     return action.payload.auth
    //   }
    //   return {}
    // case PURGE:
      return {}
    default:
      return state
  }
}
