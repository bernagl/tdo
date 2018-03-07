import { IMG_HEIGHT, IS_LOADING, SHOW_ALERT } from './types'

export const toggleLoading = state => {
  return { type: IS_LOADING, payload: state }
}

export const showAlert = alert => {
  return { type: SHOW_ALERT, payload: alert }
}

export const setImgHeight = height => {
  return { type: IMG_HEIGHT, payload: height }
}
