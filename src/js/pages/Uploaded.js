import React from "react"
import { connect } from "react-redux"

import * as documentActions from "../actions/documentActions"

@connect((store) => {
  return {
    newDocuments: store.documents.newDocuments
  }
})
export default class Uploaded extends React.Component {
  componentWillMount () {
    this.props.dispatch(documentActions.getNewDocumentsFromServer())
  }

  submitFile (e) {
    let formData = new FormData()
    const files = this.filesInput.files

    for (var key in files) {
    // check if this is a file:
      if (files.hasOwnProperty(key) && files[key] instanceof File) {
        formData.append(key, files[key])
      }
    }

    try {
      this.props.dispatch(documentActions.uploadFile(formData))
    } catch (error) {
      console.log(error)
    }
    e.preventDefault()
    e.target.reset()
  }

  deleteFile (context, documentName) {
    context.props.dispatch(documentActions.deleteFile("unsorted", "unsorted", documentName))
  }

  editDocument (context, documentName) {
    context.props.history.push(`/edit_document?documentName=${documentName}`)
  }

  render () {
    const newFiles = this.props.newDocuments.map((item, index) => {
      return <tr key={index}>
        <td scope="row">{index}</td>
        <td>{item}</td>
        <td>
          <button class="btn btn-primary" title="Dokument bearbeiten" onClick={() => this.editDocument(this, item) }><i class="fa fa-file-text" aria-hidden="true"></i></button>
          &nbsp;
          <button class="btn btn-danger" title="Dokument Löschen" data-filename={item} onClick={() => this.deleteFile(this, item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
        </td>
      </tr>
    })

    return (
      <div>
        <h1>Neue Dokumente (WIP)</h1>
        <hr/>
        <h2>Upload</h2>
        <form class="form" onSubmit={this.submitFile.bind(this)} method="POST" encType="multipart/form-data" >
          <div class="row">
            <div class="col">
              <input id="fileInput" class="form-control-file" type="file" accept="application/pdf" ref={(input) => { this.filesInput = input }} name="file" multiple/>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input title="Upload" class="btn btn-success" type="submit" value="Upload"/>
            </div>
          </div>
        </form>

        <hr/>
        <h2>Einsortieren</h2>
        <table class="table table-striped table-hover">
          <colgroup>
            <col style={{width: "15%"}}/>
            <col style={{width: "70%"}}/>
            <col style={{width: "15%"}}/>
          </colgroup>
          <thead>
            <tr>
              <th>#</th>
              <th>Dokument</th>
              <th>Optionen</th>
            </tr>
          </thead>
          <tbody>
            {newFiles}
          </tbody>
        </table>
      </div>
    )
  }
}
