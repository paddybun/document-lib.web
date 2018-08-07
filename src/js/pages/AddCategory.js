import React from "react"

import * as categoryActions from "../actions/categoryActions"
import store from "../store"

export default class AddCategories extends React.Component {
  constructor () {
    super()
    this.state = {
      kuerzel: "",
      catName: ""
    }
  }

  handleChange (e) {
    const state = Object.assign({}, this.state)
    state[e.target.id] = e.target.value
    this.setState(state)
  }

  addCategory () {
    store.dispatch(categoryActions.createCategory(this.state.kuerzel, this.state.catName))
    this.props.history.push("/categories")
  }

  render () {
    return (
      <div class="form">
        <h1>Kategorie hinzufügen</h1>
        <hr/>
        <div class="row">
          <div class="col-2">Kürzel:</div>
          <div class="col-3">
            <input class="form-control" id="kuerzel" type="text" value={this.state.kuerzel} onChange={this.handleChange.bind(this)} placeholder="Kürzel"/>
          </div>
        </div>
        <div class="row">
          <div class="col-2">Kategoriename:</div>
          <div class="col-3">
            <input class="form-control" id="catName" type="text" value={this.state.catName} onChange={this.handleChange.bind(this)} placeholder="Kategoriename"/>
          </div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-3">
            <button class="btn btn-success" title="Speichern" onClick={this.addCategory.bind(this)}><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    )
  };
}
