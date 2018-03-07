import { GET_PEDIDO, GET_PEDIDOS } from '../actions/types'

const INITIAL_STATE = {
  seleccionado: {},
  data: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PEDIDO:
      return { ...state, seleccionado: action.payload }
    case GET_PEDIDOS:
      return { ...state, data: action.payload }
    default:
      return state
  }
}
