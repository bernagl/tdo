import { WooCommerce } from './index'
import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO,
  GET_PRODUCTOS,
  GET_VARIACIONES
} from './types'

export const getProducto = id => async dispatch => {
  let result = {}
  let data = await WooCommerce.getAsync(`products/${id}`)
  result.producto = JSON.parse(data.toJSON().body)
  data = await WooCommerce.getAsync(`products/${id}/variations`)
  result.variaciones = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTO, payload: result })
}

export const getProductosDestacados = () => async dispatch => {
  const data = await WooCommerce.getAsync('products')
  const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTOS_DESTACADOS, payload: result })
}

export const getProductos = () => async dispatch => {
  const data = await WooCommerce.getAsync('products')
  const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTOS, payload: result })
}

export const getVariaciones = (id) => async dispatch => {
  const data = await WooCommerce.getAsync(`products/${id}/variations`)
  const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_VARIACIONES, payload: result })
}

export const getProductosPorCategoria = categoria => async dispatch => {
  const data = await WooCommerce.getAsync(`products?category=${categoria}`)
  const result = JSON.parse(data.toJSON().body)
  dispatch({
    type: GET_PRODUCTOS_POR_CATEGORIA,
    payload: { id: categoria, data: result }
  })
}
