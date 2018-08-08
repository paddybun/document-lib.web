import React from 'react'

export default class Header extends React.Component {
  render () {
    const header = '<Document>.Lib'
    return (
      <header>
        <h1>{header}</h1>
      </header>
    )
  }
}
