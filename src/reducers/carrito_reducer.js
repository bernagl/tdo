import {
  AGREGAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  RESTAR_PRODUCTO,
  VACIAR_CARRITO
} from '../actions/types'
import { REHYDRATE, PURGE } from 'redux-persist'
import _ from 'lodash'
let producto

export default function(state = {}, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      producto = _.findKey(state, item => item.id === action.payload.id)
      if (producto) {
        producto = state[producto]
        return {
          ...state,
          [action.payload.id]: {
            ...action.payload,
            cantidad: producto.cantidad + 1
          }
        }
      }
      return { ...state, [action.payload.id]: action.payload }
    case RESTAR_PRODUCTO:
      producto = _.findKey(state, item => item.id === action.payload.id)
      if (producto) {
        producto = state[producto]
        if (producto.cantidad >= 1) {
          return {
            ...state,
            [action.payload.id]: {
              ...action.payload,
              cantidad: producto.cantidad - 1
            }
          }
        } else {
          delete state[action.payload.id]
          return { ...state }
        }
      }
      break
    case ELIMINAR_PRODUCTO:
      delete state[action.payload.id]
      return { ...state }
    case REHYDRATE:
      if (action.payload) {
        return action.payload.carrito
      }
      return {}
    case PURGE:
      return {}
    case VACIAR_CARRITO:
      return []
    default:
      return state
  }
}
