import React, { Component } from 'react'
import WooCommerceAPI from 'woocommerce-api'
import logo from './logo.svg'
import './App.css'

const WooCommerce = new WooCommerceAPI({
  url: 'https://tdo.mobkii.net',
  consumerKey: 'ck_066d8c61e98aa3d10ffddb9d7ebaaa085116f86d',
  consumerSecret: 'cs_570edcf90f97f3902570386a92d1dc99dab083a6',
  wpAPI: true,
  version: 'wc/v1'
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { productos: [] }
  }

  componentDidMount() {
    WooCommerce.getAsync(
      'products'
    ).then(function(result) {
      console.log(JSON.parse(result.toJSON().body))
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
