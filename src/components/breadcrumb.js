import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

export default ({ urls }) => {
  console.log(urls)
  return (
    <Breadcrumb style={{ margin: '10px 0px' }}>
      {urls.map((url, key) => {
        return (
          <Breadcrumb.Item key={key}>
            <Link to={url.path}>
              {url.icon && <Icon type={url.icon} />}
              <span> {url.name}</span>
            </Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}