import { GET_CATEGORIAS } from '../actions/types'

// const INITIAL_STATE = {
//     categorias: []
// }

export default function(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIAS:
      return action.payload
    default:
      return state
  }
}
