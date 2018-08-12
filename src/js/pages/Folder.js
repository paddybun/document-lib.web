import { connect } from "react-redux"
import { Link } from "react-router-dom"
import React from "react"

import * as folderActions from "../actions/folderActions"

@connect((store) => {
  return {
    folders: store.folders.folders
  }
})
export default class Folder extends React.Component {
  componentDidMount () {
    this.props.dispatch(folderActions.getFoldersFromServer())
  }

  editFolder (context, folder) {
    context.props.history.push(`/edit_folder?folderId=${folder.id}`)
  }

  render () {
    const rows = this.props.folders.map((item, index) => {
      return <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.currentAmount}/{item.count}</td>
        <td>{item.category}</td>
        <td>
          <button class="btn btn-primary" title="Ordner bearbeiten" onClick={() => this.editFolder(this, item) }><i class="fa fa-file-text" aria-hidden="true"></i></button>
        </td>
      </tr>
    })

    return (
      <div>
        <div>
          <h1>Ordner organisieren</h1>
        </div>
        <hr/>
        <h2>Ordner anlegen</h2>
        <Link to="add_folder">
          <button class="btn btn-success">Neu...</button>
        </Link>
        <hr/>
        <table class="table table-striped table-hover fixed">
          <colgroup>
            <col style={{width: "20%"}}/>
            <col style={{width: "20%"}}/>
            <col style={{width: "20%"}}/>
            <col style={{width: "20%"}}/>
            <col style={{width: "auto"}}/>
          </colgroup>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Dokumente</th>
              <th>Kategorie</th>
              <th>Optionen</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}
