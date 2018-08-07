import { Route } from "react-router-dom"
import React from "react"

// Pages
import AddCategory from "../pages/AddCategory"
import AddFolder from "../pages/AddFolder"
import Categories from "../pages/Categories"
import Documents from "../pages/Documents"
import Folder from "../pages/Folder"
import Header from "./Header"
import Home from "../pages/Home"
import Navigation from "./Navigation"
import Uploaded from "../pages/Uploaded"
import EditDocument from "../pages/EditDocument"
import EditFolder from "../pages/EditFolder"

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <div class="container-fluid">
          <Header/>
          <div class="navigation">
            <Navigation/>
          </div>
          <div>
            <div id="mainContent">
              <Route exact path="/" component={Home}></Route>
              <Route path="/documents" component={Documents}></Route>
              <Route path="/uploaded" component={Uploaded}></Route>
              <Route path="/folder" component={Folder}></Route>
              <Route path="/categories" component={Categories}></Route>
              <Route path="/add_category" component={AddCategory}></Route>
              <Route path="/add_folder" component={AddFolder}></Route>
              <Route path="/edit_document" component={EditDocument}></Route>
              <Route path="/edit_folder" component={EditFolder}></Route>
            </div>
          </div>
        </div>
      </div>
    )
  };
}
