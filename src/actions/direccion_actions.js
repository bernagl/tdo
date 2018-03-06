import { SET_DIRECCION } from './types'

export const setDireccion = direccion => dispatch => {
  dispatch({ type: SET_DIRECCION, payload: direccion })
  return true
}
