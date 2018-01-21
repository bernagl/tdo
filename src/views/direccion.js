import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DireccionForm } from '../components'
import { Col, Row } from 'antd'

class Direccion extends Component {
  render() {
    return (
      <div className="direccion">
        <Row>
          <Col span={24}>
            <DireccionForm
              uid={this.props.uid}
              id={this.props.match.params.id || null}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = ({ auth }) => ({ uid: auth.uid })

export default connect(mapDispatchToProps)(Direccion)
