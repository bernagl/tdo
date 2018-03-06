import axios from 'axios'
import WooCommerce from './woocommerce'
import { INICIAR_SESION, IS_ERROR } from './types'

// export const login = ({ correo, contrasena }) => async dispatch => {
//   console.log(correo, contrasena)
//   const response = await axios.post(
//     'wservice.php',
//     {
//       email: correo,
//       password: contrasena,
//       exec: 'auth'
//     },
//     {
//       headers: {
//         'Content-type': 'multipart/form-data'
//       }
//     }
//   )
//   console.log(response)
//   dispatch({ type: INICIAR_SESION, payload: true })
// }

export const login = ({ correo, contrasena }) => async dispatch => {
  const data = {
    email: 'luisg@mobkii.com',
    password: 'vjvjmmrh1',
    first_name: 'John',
    last_name: 'Doe',
    username: 'john.doe',
    billing: {
      first_name: 'John',
      last_name: 'Doe',
      company: '',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US',
      email: 'luisg@mobkii.com',
      phone: '(555) 555-5555'
    },
    shipping: {
      first_name: 'John',
      last_name: 'Doe',
      company: '',
      address_1: '969 Market',
      address_2: '',
      city: 'San Francisco',
      state: 'CA',
      postcode: '94103',
      country: 'US'
    }
  }
  const result = await request(`customers`, data)
  console.log(result)
  // dispatch({
  //   type: INICIAR_SESION,
  //   payload: { id: categoria, data: result }
  // })
}

const isError = () => dispatch => {
  dispatch({ type: IS_ERROR, payload: true })
}

const request = async url => {
  try {
    const data = await WooCommerce.postAsync(url)
    return JSON.parse(data.toJSON().body)
  } catch (e) {
    isError()
  }
}
