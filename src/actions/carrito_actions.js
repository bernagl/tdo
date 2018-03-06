import {
  AGREGAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  RESTAR_PRODUCTO,
  VACIAR_CARRITO,
  REHYDRATE
} from './types'
import { PURGE } from 'redux-persist'
import WooCommerce from './woocommerce'
import firebase from './firebase'

export const agregarProducto = producto => dispatch => {
  dispatch({ type: AGREGAR_PRODUCTO, payload: producto })
}

export const restarProducto = producto => dispatch => {
  dispatch({ type: RESTAR_PRODUCTO, payload: producto })
}

export const eliminarProducto = producto => dispatch => {
  dispatch({ type: ELIMINAR_PRODUCTO, payload: producto })
}

export const vaciarCarrito = producto => dispatch => {
  dispatch({ type: VACIAR_CARRITO })
}

export const rehydrate = () => dispatch => {
  dispatch({ type: REHYDRATE })
}

export const purgeCarrito = () => dispatch => {
  dispatch({ type: PURGE })
}

export const enviarPedido = data => async dispatch => {
  const result = await WooCommerce.postAsync('orders', data.pedido)
  const order = JSON.parse(result.toJSON().body)
  return firebase
    .database()
    .ref(`pedidos/${data.uid}`)
    .push(order)
    .then(response => result)
}
