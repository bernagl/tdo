import { IS_LOADING, SHOW_ALERT } from '../actions/types'

const INITIAL_STATE = {
  isLoading: false,
  isMenuOpen: false,
  alert: {
    show: false,
    message: '',
    type: '',
    showIcon: true
  }
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload }
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    default:
      return state
  }
}
