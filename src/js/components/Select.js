import React from "react"

export default class Select extends React.Component {
  render () {
    const options = this.props.selectOptions.map((item) => {
      return <option key={item[this.props.keyItem]} value={item[this.props.valueItem]}>{item[this.props.displayItem]}</option>
    })

    return (
      <select class="form-control form-control-sm" onChange={this.props.changeEvent}>
        <option></option>
        { options }
      </select>
    )
  }
}
