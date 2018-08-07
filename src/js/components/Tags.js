import React from "react"

export default class Tags extends React.Component {
  constructor () {
    super()
    this.state = {
      tags: [],
      value: ""
    }
  }

  saveTag (e) {
    if (e.key === "Enter") {
      const newTags = this.state.tags.concat([this.state.value])
      this.setState({value: "", tags: newTags})
      if (this.props.retrieveValueHandler) {
        this.props.retrieveValueHandler(newTags.concat([]))
      }
    }
  }
  handleChange (e) {
    this.setState({value: e.target.value})
  }

  removeTag (e) {
    const newTags = this.state.tags.concat([])
    const index = newTags.indexOf(e.target.dataset.tag)
    newTags.splice(index, 1)
    this.setState({tags: newTags})

    if (this.props.retrieveValueHandler) {
      this.props.retrieveValueHandler(newTags.concat([]))
    }
  }

  render () {
    const tags = this.state.tags.map((item, index) => {
      return <li title="Klicken um tag zu löschen" data-tag={item} onClick={this.removeTag.bind(this)} class="list-group-item list-group-item-action" key={index}>{item}</li>
    })

    return (
      <div>
        <input class={this.props.className} onKeyPress={this.saveTag.bind(this)} value={this.state.value} onChange={this.handleChange.bind(this)}/>
        <ul class="list-group">
          {tags}
        </ul>
      </div>
    )
  }
}
