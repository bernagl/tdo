import axios from 'axios'
import WooCommerce from './woocommerce'
import { INICIAR_SESION, IS_ERROR } from './types'

export const login = ({ correo, contrasena }) => async dispatch => {
  // const { data } = await axios.post(
  //   'wservice.php',
  //   {
  //     email: correo,
  //     password: contrasena,
  //     exec: 'auth'
  //   },
  //   {
  //     headers: {
  //       'Content-type': 'multipart/form-data'
  //     }
  //   }
  // )
  const user = {
    ID: '3',
    user_login: 'Luis',
    user_email: 'luisg@mobkii.com',
    user_pass: '^#fIOMW6ULmoa4N2D^lP@W29',
    user_nicename: 'luis',
    user_registered: '2018-03-06 16:16:22',
    user_status: '0',
    user_url: ''
  }

  // data.status === 202 && dispatch({ type: INICIAR_SESION, payload: data.data })
  dispatch({ type: INICIAR_SESION, payload: user })
  return 202
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
