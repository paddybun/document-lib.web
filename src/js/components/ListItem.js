import React from "react"

export default class Document extends React.Component {
  render () {
    const listItemName = this.props.itemName
    const listItemValue = this.props.itemValue
    return (
      <li data-itemValue={listItemValue}>{listItemName}</li>
    )
  }
}
