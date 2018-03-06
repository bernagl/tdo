import {
  GET_DIRECCION,
  GET_DIRECCIONES,
  ACTUALIZAR_DIRECCION,
  SET_DIRECCION
} from '../actions/types'
// import { REHYDRATE, PURGE } from 'redux-persist'
const INITIAL_STATE = {
  direcciones: [],
  direccion: {}
}
export default function(state = false, action) {
  switch (action.type) {
    case GET_DIRECCION:
      return { ...state, direccion: action.payload }
    case SET_DIRECCION:
      return action.payload
    case ACTUALIZAR_DIRECCION:
      return { ...state, direccion: action.payload }
    case GET_DIRECCIONES:
      return { ...state, direcciones: action.payload }
    // case REHYDRATE:
    //   // if (action.payload) {
    //   return action.payload.auth || {}
    // // }
    // // return {}
    // case PURGE:
    //   return {}
    default:
      return state
  }
}
