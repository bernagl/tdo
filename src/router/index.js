import React from 'react'
import { Switch, Route } from 'react-router-dom'
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
  Registro
} from '../views'

export const Aplicacion = () => {
  return (
    <div>
      <Switch>
        <Route path="/producto/:id" component={Producto} />
        <Route path="/categoria/:id" component={Categoria} />
        <Route path="/categorias" component={Categorias} />
        <Route path="/carrito/:paso?" component={Carrito} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/direccion/:id?" component={Direccion} />
        <Route path="/prueba" component={Prueba} />
        <Route path="/pedido/:id" component={Pedido} />
        <Route path="/" component={Inicio} />
      </Switch>
    </div>
  )
}

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Registro} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  )
}
