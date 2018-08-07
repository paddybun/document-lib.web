import React from "react"
import { connect } from "react-redux"

import Select from "../components/Select"

import * as documentActions from "../actions/documentActions"
import * as categoryActions from "../actions/categoryActions"

@connect((store) => {
  return {
    docs: store.documents.documents,
    categories: store.categories.categories
  }
})
export default class Documents extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedOption: ""
    }
  }
  componentWillMount () {
    this.props.dispatch(categoryActions.getCategoriesFromServer())
  }

  handleChange (e) {
    this.setState({selectedOption: e.target.value})
    this.reloadDocuments(e.target.value)
  }

  reloadDocuments (category) {
    if (!category && !this.state.selectedOption && this.state.selectedOption === "") {
      category = this.props.categories[0].short
      this.setState({selectedOption: category})
    }

    this.props.dispatch(documentActions.getDocumentsFromServer(0, 20, category))
  }

  render () {
    const documents = this.props.docs.map((item, index) => {
      return <tr key={item.id}>
        <td scope="row">{item.id}</td>
        <td>{item.dokumentName}</td>
      </tr>
    })

    return (
      <div>
        <h1>Dokumente (WIP)</h1>
        <hr/>
        <h2>Filter</h2>
        <div class="form">
          <div class="row">
            <div class="col-2">Kategorie auswählen:</div>
            <div class="col-3"><Select id="categorySelect" selectOptions={this.props.categories} changeEvent={this.handleChange.bind(this)} keyItem="id" valueItem="short" displayItem="name"/></div>
          </div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-3"><button title="Neu laden" class="btn btn-success" onClick={this.reloadDocuments.bind(this, undefined)}><i class="fa fa-refresh" aria-hidden="true"></i></button></div>
          </div>
        </div>

        <hr/>
        <h2>Dokumente</h2>
        <table class="table table-striped table-hover">
          <colgroup>
            <col style={{width: "15%"}}></col>
            <col style={{width: "85%"}}></col>
          </colgroup>
          <thead>
            <tr>
              <th>#</th>
              <th>Dokument</th>
            </tr>
          </thead>
          <tbody>
            {documents}
          </tbody>
        </table>
      </div>
    )
  }
}
