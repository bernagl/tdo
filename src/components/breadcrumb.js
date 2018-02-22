import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <Link to="/">
          <Icon type="home" />
          <span>Inicio</span>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <Link to={`/categoria/${categoria.id}`}>
          <Icon type="o-tag" />
          <span>{categoria.nombre}</span>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>
  )
}
