import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import store from "./store"

import Layout from "./components/Layout"

const app = document.getElementById("app")

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Layout/>
    </HashRouter>
  </Provider>,
  app
)
