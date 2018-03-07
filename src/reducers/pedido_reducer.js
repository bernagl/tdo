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
    case 'vaciar_pedidos':
      return INITIAL_STATE
    default:
      return state
  }
}
