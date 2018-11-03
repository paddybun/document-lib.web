import { connect } from "react-redux"
import { Link } from "react-router-dom"
import React from "react"

import * as categoryActions from "../actions/categoryActions";

@connect((store) => {
  return {
    categories: store.categories.categories
  }
})
export default class Categories extends React.Component {
  componentWillMount() {
    this.props.dispatch(categoryActions.getCategoriesFromServer())
  }

  deleteCategory(id) {
    this.props.dispatch(categoryActions.deleteCategory(id))
  }

  render() {
    const rows = this.props.categories.map((item) => {
      return <tr key={item.id}>
        <td scope="row">{item.id}</td>
        <td>{item.short}</td>
        <td>{item.name}</td>
        <td><button class="btn btn-danger" data-category={item.id} onClick={() => this.deleteCategory(item.id)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
      </tr>
    })

    return (
      <div>
        <h1>Kategorien</h1>
        <hr />
        <h2>Kategorie anlegen</h2>
        <div class="row">
          <div class="col">
            <Link to="add_category">
              <button class="btn btn-success">Neu...</button>
            </Link>
          </div>
        </div>
        <br />
        <table class="table table-striped table-hover">
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th>#</th>
              <th>Kürzel</th>
              <th>Kategorie</th>
              <th>Optionen</th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}