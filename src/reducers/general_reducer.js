import { IS_LOADING, SHOW_ALERT, IS_ERROR } from '../actions/types'

const INITIAL_STATE = {
  isLoading: false,
  isMenuOpen: false,
  alert: {
    show: false,
    message: '',
    type: '',
    showIcon: true
  },
  error: false
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: action.payload }
    case IS_ERROR:
      return { ...state, error: action.payload }
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    default:
      return state
  }
}
