import firebase from './firebase'
import WooCommerce from './woocommerce'
import { GET_PEDIDO, GET_PEDIDOS, IS_ERROR } from './types'

export const getPedidos = uid => async dispatch => {
  const data = await request(`orders?customer=${uid}`)
  dispatch({ type: GET_PEDIDOS, payload: data })
  return data
}

export const getPedido = id => async dispatch => {
  let data = await WooCommerce.getAsync(`orders/${id}`)
  const result = JSON.parse(data.toJSON().body)
  console.log(result)
  dispatch({ type: GET_PEDIDO, payload: result })
}

const isError = () => dispatch => {
  dispatch({ type: IS_ERROR, payload: true })
}

const request = async url => {
  try {
    const data = await WooCommerce.getAsync(url)
    return JSON.parse(data.toJSON().body)
  } catch (e) {
    isError()
  }
}
