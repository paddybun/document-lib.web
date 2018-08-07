import { Link } from "react-router-dom"
import React from "react"

export default class Navigation extends React.Component {
  render () {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/documents">Dokumente</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/uploaded">Upload</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/folder">Ordner</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/categories">Kategorien</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
