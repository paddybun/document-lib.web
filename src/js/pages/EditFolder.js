import { connect } from "react-redux"
import React from "react"

import * as categoryActions from "../actions/categoryActions"
import * as folderActions from "../actions/folderActions"

import Select from "../components/Select"

class EditFolder extends React.Component {
  constructor () {
    super()
    this.state = {
      id: "",
      selectedCategory: "",
      folderName: "",
      folderMaxDocAmount: 0
    }
  }

  handleInputChange (e) {
    const state = Object.assign({}, this.state)
    state[e.target.id] = e.target.value
    this.setState(state)
  }

  componentWillMount () {
    this.props.dispatch(categoryActions.getCategoriesFromServer())
    this.props.dispatch(folderActions.getFoldersFromServer())
  }

  componentWillReceiveProps (nextProp) {
    if (nextProp.folders.length === 1 && !nextProp.folders[0].folderName) {
      return
    }

    const searchParameter = "folderId="
    const searchIndex = nextProp.location.search.indexOf(searchParameter) + searchParameter.length
    const folderId = nextProp.location.search.slice(searchIndex, this.props.location.search.length)
    const folderToEdit = nextProp.folders.filter((item) => item.id === folderId)[0]

    let newState = Object.assign({}, this.state)
    newState.id = folderToEdit.id
    newState.folderName = folderToEdit.folderName
    newState.folderMaxDocAmount = folderToEdit.folderMaxDocAmount
    newState.selectedCategory = folderToEdit.folderCategoryShort

    this.setState(newState)
  }

  handleChange (e) {
    this.setState({selectedCategory: e.target.value})
  }

  saveFolder (e) {
    console.log("saved")
  }

  render () {
    return (
      <div>
        <h1>Ordner "{this.state.folderName}" ändern</h1>
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
              <input id="folderMaxDocAmount" type="number" class="form-control" value={this.state.folderMaxDocAmount} onChange={this.handleInputChange.bind(this)}/>
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
              <button class="btn btn-success" title="Speichern" onClick={this.saveFolder.bind(this)}><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

const mapStateToProps = (state) => ({
  folders: state.folders.folders,
  categories: state.categories.categories
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder)
