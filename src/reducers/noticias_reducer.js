import { GET_NOTICIAS } from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case GET_NOTICIAS:
      return action.payload
    default:
      return state
  }
}
