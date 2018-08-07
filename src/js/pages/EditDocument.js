import { Typeahead } from "react-bootstrap-typeahead"
import { connect } from "react-redux"
import React from "react"

import Tags from "../components/Tags"
import Select from "../components/Select"

import * as folderActions from "../actions/folderActions"
import * as categoryActions from "../actions/categoryActions"

@connect((store) => {
  return {
    folders: store.folders.folders,
    categories: store.categories.categories
  }
})
export default class EditDocument extends React.Component {
  constructor () {
    super()
    this.state = {
      documentName: "",
      folder: "",
      selectedCategory: "",
      value: "",
      tags: []
    }
  }

  componentWillMount () {
    const searchParameter = "documentName="
    const searchIndex = this.props.location.search.indexOf(searchParameter) + searchParameter.length
    const documentName = this.props.location.search.slice(searchIndex, this.props.location.search.length)
    this.setState({documentName})

    this.props.dispatch(folderActions.getFoldersFromServer())
    this.props.dispatch(categoryActions.getCategoriesFromServer())
  }

  changeFolder (e) {
    this.setState({folder: e[0]})
  }

  getTags (tags) {
    this.setState({tags})
  }

  handleChange (e) {
    this.setState({selectedCategory: e.target.value})
  }

  saveDocument (e) {
    console.log("Saving form", this.state)
  }

  render () {
    return (
      <div>
        <h1>Dokument bearbeiten</h1>
        <hr/>
        <div class="form">
          <div class="row">
            <div class="col-2">
              Dokument Name:
            </div>
            <div class="col-3">
              <input class="form-control form-control-sm" value={this.state.documentName} readOnly/>
            </div>
          </div>

          <div class="row">
            <div class="col-2">
              Ordner
            </div>
            <div class="col-3">
              <Typeahead
                class="form-control-sm"
                onChange={this.changeFolder.bind(this)}
                options={this.props.folders}
                labelKey={option => `${option.folderName}`}
              />
            </div>
          </div>

          <div class="row">
            <div class="col-2">
              Kategorie:
            </div>
            <div class="col-3">
              <Select id="categorySelect" selectOptions={this.props.categories} changeEvent={this.handleChange.bind(this)} keyItem="id" valueItem="short" displayItem="name"/>
            </div>
          </div>
          <div class="row">
            <div class="col-2">Tags</div>
            <div class="col-3">
              <Tags class="form-control form-control-sm" retrieveValueHandler={this.getTags.bind(this)}/>
            </div>
          </div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-3">
              <button class="btn btn-success" onClick={this.saveDocument.bind(this)}><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
