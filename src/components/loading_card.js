import React, { Component } from 'react'
import { Card } from 'antd'

export default class LoadingCard extends Component {
  constructor(props) {
    super(props)
    this.renderCard = this.renderCard.bind(this)
  }

  renderCard() {
    const cards = new Array(this.props.cantidad).fill(1)
    return cards.map((i, key) => {
      return (
        <Card
          loading
          title=""
          key={key}
          style={{ width: '100%', margin: '10px 0' }}
        >
          ...
        </Card>
      )
    })
  }

  render() {
    return <div>{this.renderCard()}</div>
  }
}
