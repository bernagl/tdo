import { WooCommerce } from './index'
import {
  GET_PRODUCTOS_POR_CATEGORIA,
  GET_PRODUCTOS_DESTACADOS,
  GET_PRODUCTO,
  GET_PRODUCTOS,
  GET_VARIACIONES,
  IS_ERROR
} from './types'

export const getProducto = id => async dispatch => {
  let result = await request(`products/${id}`)
  // result.producto = JSON.parse(data.toJSON().body)
  // producto = JSON.parse(data.toJSON().body)
  // data = await WooCommerce.getAsync(`products/${id}/variations`)
  console.log('getting product')
  // result.variaciones = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTO, payload: result })
}

export const getProductosDestacados = () => async dispatch => {
  const result = await request('products')
  // const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_PRODUCTOS_DESTACADOS, payload: result })
}

export const getProductos = () => async dispatch => {
  const result = await request('products')
  // const result = JSON.parse(data.toJSON().body)
  let productos = {}
  console.log('getting products')
  result.map(producto => (productos[producto.id] = producto))
  dispatch({ type: GET_PRODUCTOS, payload: productos })
}

export const getVariaciones = id => async dispatch => {
  const result = await request(`products/${id}/variations`)
  // const data = await WooCommerce.getAsync(`products/${id}/variations`)
  // const result = JSON.parse(data.toJSON().body)
  // console.log('getting variations')
  dispatch({ type: GET_VARIACIONES, payload: { id, data: result } })
}

export const getProductosPorCategoria = categoria => async dispatch => {
  const result = await request(`products?category=${categoria}`)
  dispatch({
    type: GET_PRODUCTOS_POR_CATEGORIA,
    payload: { id: categoria, data: result }
  })
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
