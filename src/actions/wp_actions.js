import axios from 'axios'
import { INICIAR_SESION } from './types'

export const login = ({ email, password }) => async dispatch => {
  const response = await axios.post('wservice.php', {
    exec: 'auth',
    email,
    password
  })

  console.log(response)
}
