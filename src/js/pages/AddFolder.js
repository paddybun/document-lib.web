import { connect } from "react-redux"
import React from "react"

import * as categoryActions from "../actions/categoryActions"
import * as folderActions from "../actions/folderActions"

import Select from "../components/Select"

@connect((store) => {
  return {
    categories: store.categories.categories
  }
})
export default class AddFolder extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedCategory: "",
      folderDocumentCount: 0,
      folderName: ""
    }
  }

  handleInputChange (e) {
    const state = Object.assign({}, this.state)
    state[e.target.id] = e.target.value
    this.setState(state)
  }

  componentWillMount () {
    this.props.dispatch(categoryActions.getCategoriesFromServer())
  }

  handleChange (e) {
    this.setState({selectedCategory: e.target.value})
  }

  addFolder (e) {
    this.props.dispatch(folderActions.createFolder(this.state.folderName, this.state.selectedCategory, this.state.folderDocumentCount))
    this.props.history.push("/folder")
  }

  render () {
    return (
      <div>
        <h1>Ordner hinzufügen</h1>
        <hr/>
        <div class="form">
          <div class="row">
            <div class="col-2">Name</div>
            <div class="col-3">
              <input id="folderName" type="text" class="form-control" value={this.state.folderName} onChange={this.handleInputChange.bind(this)}/>
            </div>
          </div>
          <div class="row">
            <div class="col-2">Maximale Anzahl an Dokumenten</div>
            <div class="col-3">
              <input id="folderDocumentCount" type="number" class="form-control" value={this.state.folderDocumentCount} onChange={this.handleInputChange.bind(this)}/>
            </div>
          </div>
          <div class="row">
            <div class="col-2">Kategorie</div>
            <div class="col-3">
              <Select selectOptions={this.props.categories} changeEvent={this.handleChange.bind(this)} keyItem="id" valueItem="short" displayItem="name"/>
            </div>
          </div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-3">
              <button class="btn btn-success" title="Speichern" onClick={this.addFolder.bind(this)}><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
