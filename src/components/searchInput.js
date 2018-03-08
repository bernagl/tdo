import React from 'react'
import { Divider, Input } from 'antd'

export default ({ history }) => {
  console.log(history)
  return (
    <React.Fragment>
      <Input.Search
        placeholder="input search text"
        onSearch={value => history.push(`/busqueda/${value}`)}
        placeholder="Buscar productos"
        enterButton
        style={{ padding: '10px', marginRight: 10 }}
      />
    </React.Fragment>
  )
}
