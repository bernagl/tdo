import firebase from './firebase'
import WooCommerce from './woocommerce'
import { GET_PEDIDO, GET_PEDIDOS } from './types'

export const getPedidos = uid => async dispatch => {
  let pedidos = []
  firebase
    .database()
    .ref(`pedidos/${uid}`)
    .once('value')
    .then(snapshot => {
      snapshot.forEach(pedido => {
        pedidos.push(pedido.val())
      })
      // pedidos.length === 0 && (pedidos = null)
      dispatch({ type: GET_PEDIDOS, payload: pedidos })
    })
}

export const getPedido = id => async dispatch => {
  let data = await WooCommerce.getAsync(`orders/${id}`)
  const result = JSON.parse(data.toJSON().body)
  console.log(result)
  dispatch({ type: GET_PEDIDO, payload: result })
}
