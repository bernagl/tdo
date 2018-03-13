import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import {
  Carrito,
  Categoria,
  Categorias,
  Direccion,
  Inicio,
  Login,
  Main,
  Perfil,
  Pedido,
  Producto,
  Prueba,
  Search,
  Registro
} from '../views'

export const Pre = () => {
  return (
    <HashRouter>
      <Route path="/" component={Main} />
    </HashRouter>
  )
}

export const Aplicacion = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/carrito/:paso?" component={Carrito} />
        <Route exact path="/busqueda/:search" component={Search} />
        <Route exact path="/producto/:id" component={Producto} />
        <Route exact path="/categoria/:id" component={Categoria} />
        <Route exact path="/categorias" component={Categorias} />
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/direccion/:id?" component={Direccion} />
        <Route exact path="/prueba" component={Prueba} />
        <Route exact path="/pedido/:id" component={Pedido} />
        <Route exact path="/" component={Inicio} />
      </Switch>
    </HashRouter>
  )
}

export const Routes = () => {
  return (
    // <HashRouter>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/registro" component={Registro} />
      {/* <Route path="/" component={Main} /> */}
    </Switch>
    // </HashRouter>
  )
}
