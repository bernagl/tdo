import { IS_LOADING, SHOW_ALERT, IS_ERROR, IMG_HEIGHT } from '../actions/types'

const INITIAL_STATE = {
  isLoading: false,
  imgHeight: '70%',
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
    case IMG_HEIGHT:
      return { ...state, imgHeight: action.payload }
    case IS_ERROR:
      return { ...state, error: action.payload }
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    default:
      return state
  }
}
