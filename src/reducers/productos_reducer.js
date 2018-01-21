import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO,
  GET_PRODUCTOS,
  GET_VARIACIONES
} from '../actions/types'

const INITIAL_STATE = {
  data: [],
  destacados: [],
  categoria: [],
  variaciones: [],
  categoria_seleccionada: 0,
  seleccionado: {}
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
        seleccionado: action.payload.producto,
        variaciones: action.payload.variaciones
      }
    case GET_VARIACIONES:
      return { ...state, variaciones: action.payload }
    default:
      return state
  }
}
