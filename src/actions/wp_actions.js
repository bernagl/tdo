import axios from 'axios'
import { GET_NOTICIAS, INICIAR_SESION } from './types'

// let bridge = false

export const login = ({ correo, contrasena }) => async dispatch => {
  const { data } = await axios.post(
    'wservice.php',
    {
      email: correo,
      password: contrasena,
      exec: 'auth'
    },
    {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }
  )
  if (data.status === 202) {
    dispatch({ type: INICIAR_SESION, payload: data.data })
    localStorage.setItem('user', JSON.stringify(data.data))(
      (window.location.href = `login.html?email=${data.data.user_email}`)
    )
  }
  return data.status

  // const user = {
  //   ID: '3',
  //   user_login: 'Luis',
  //   user_email: 'luisg@mobkii.com',
  //   user_pass: '^#fIOMW6ULmoa4N2D^lP@W29',
  //   user_nicename: 'luis',
  //   user_registered: '2018-03-06 16:16:22',
  //   user_status: '0',
  //   user_url: ''
  // }
  // dispatch({
  //   type: INICIAR_SESION,
  //   payload: user
  // })

  // localStorage.setItem('user', JSON.stringify(user))
  // window.location.href = `p.html?email=${user.user_email}`
  // return 202
}

export const getNoticias = () => async dispatch => {
  const { data } = await axios.get(
    'http://tdorthodontics.com/wp-json/wp/v2/promociones'
  )
  console.log(data)
  dispatch({ type: GET_NOTICIAS, payload: data })
}
