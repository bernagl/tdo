import { GET_CATEGORIAS } from '../actions/types'

const INITIAL_STATE = {
  data: [],
  productos: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIAS:
      return { ...state, data: action.payload }
    case 'PRODUCTOS_BY_CATEGORIA':
      return {
        ...state,
        productos: {
          ...state.productos,
          [action.payload.id]: action.payload.data
        }
      }
    default:
      return state
  }
}
