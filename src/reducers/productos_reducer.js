import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO,
  GET_PRODUCTOS,
  GET_VARIACIONES,
  SEARCH
} from '../actions/types'
import { REHYDRATE, PURGE } from 'redux-persist'

const INITIAL_STATE = {
  data: {},
  destacados: [],
  categoria: [],
  variaciones: { id: '', data: [] },
  categoria_seleccionada: 0,
  seleccionado: {},
  search: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTOS_POR_CATEGORIA:
      return {
        ...state,
        categoria_seleccionada: action.payload.id,
        categoria: action.payload.data
      }
    case GET_PRODUCTOS_DESTACADOS:
      return { ...state, destacados: action.payload }
    case GET_PRODUCTOS:
      return { ...state, data: action.payload }
    case GET_PRODUCTO:
      return {
        ...state,
        // seleccionado: action.payload.producto,
        seleccionado: action.payload,
        data: { [action.payload.id]: action.payload, ...state.data }
        // variaciones: action.payload.variaciones
      }
    case GET_VARIACIONES:
      const { id, data } = action.payload
      return {
        ...state,
        variaciones: { id, data }
      }
    case SEARCH:
      return { ...state, search: action.payload }
      // case REHYDRATE:
      //   if (action.payload) {
      //     return action.payload.productos
      //   }
      //   return state
      // case PURGE:
      return {}
    default:
      return state
  }
}
