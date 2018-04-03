import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNoticias } from '../actions/wp_actions'
import { Card, Col, Icon, Row } from 'antd'
import DocumentTitle from 'react-document-title'

const { Meta } = Card

class Noticias extends Component {
  componentDidMount() {
    this.props.getNoticias()
  }

  renderNoticias() {
    return this.props.noticias.map((noticia, key) => {
      return (
        <Card hoverable style={{ width: '100%' }} key={key}>
          <Meta
            title={noticia.title.rendered}
            description={<a href={noticia.link}>Ver</a>}
          />
        </Card>
      )
    })
  }

  render() {
    if (this.props.noticias.length === 0) {
      return <Icon type="loading" />
    }
    return (
      <DocumentTitle title="Noticias">
        <Row className="row">
          <Col span={24}>{this.renderNoticias()}</Col>
        </Row>
      </DocumentTitle>
    )
  }
}

const mapDispatchToProps = ({ noticias }) => ({ noticias })

export default connect(mapDispatchToProps, { getNoticias })(Noticias)
