import { WooCommerce } from './index'
import { GET_CATEGORIAS } from './types'

export const getCategorias = () => async dispatch => {
  const data = await WooCommerce.getAsync('products/categories')
  const result = JSON.parse(data.toJSON().body)
  dispatch({ type: GET_CATEGORIAS, payload: result })
}
