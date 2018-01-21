import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { eliminarDireccion, getDirecciones } from '../actions/perfil_actions'
import { Button, Col, Icon, List, message, Popconfirm, Row } from 'antd'

class Direcciones extends Component {
  componentDidMount() {
    this.props.getDirecciones(this.props.uid)
  }

  async eliminarDireccion(id) {
    const { uid } = this.props
    const response = await this.props.eliminarDireccion({ id, uid })
    response
      ? message.success('Dirección eliminada')
      : message.error('Ocurrió un error')
  }

  renderDirecciones() {
    return this.props.direcciones.map(direccion => {
      return (
        <List.Item
          actions={[
            <Popconfirm
              title="¿Eliminar dirección?"
              onConfirm={this.eliminarDireccion.bind(this, direccion.id)}
              okText="Si"
              cancelText="No"
              placement="left"
            >
              <Icon type="delete" />
            </Popconfirm>,
            <Link to={`/direccion/${direccion.id}`}>
              <Icon type="edit" />
            </Link>
          ]}
          key={direccion.id}
        >
          <List.Item.Meta
            title={`${direccion.calle}, ${direccion.numero}`}
            description={`${direccion.colonia}, ${direccion.ciudad}, ${
              direccion.estado
            }`}
          />
          <div />
        </List.Item>
      )
    })
  }
  render() {
    return (
      <div className="direcciones">
        {!this.props.direcciones ? (
          <Row>
            <Col span={24}>
              <span>No tienes ninguna dirección</span>
            </Col>
          </Row>
        ) : (
          <List>{this.renderDirecciones()}</List>
        )}
        <Row className="mt-20">
          <Col span={24}>
            <Link to="/direccion/">
              <Button type="primary" icon="plus" className="fw">
                Agregar dirección
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ direccion }) => ({
  direcciones: direccion.direcciones
})

export default connect(mapStateToProps, { eliminarDireccion, getDirecciones })(
  Direcciones
)
