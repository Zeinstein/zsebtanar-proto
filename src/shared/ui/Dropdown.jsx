import * as React from 'react'
import { propEq } from 'ramda'
import { uid } from 'shared/util/uuid'

export class Dropdown extends React.Component {
  id = `id-dd-${uid()}`
  state = { open: false }

  getComponent(type) {
    return this.props.children.filter(propEq('type', type))
  }

  toggleDropdown = () => this.setState({ open: !this.state.open })

  renderToggle() {
    const toggle = this.getComponent(DropdownToggle)
    return React.Children.map(toggle, child =>
      React.cloneElement(child, {
        id: this.id,
        active: this.state.open
      })
    )
  }

  renderMenu() {
    const menu = this.getComponent(DropdownMenu)
    return React.Children.map(menu, child =>
      React.cloneElement(child, {
        id: this.id,
        active: this.state.open,
        className: this.props.right ? 'dropdown-menu-right' : ''
      })
    )
  }

  render() {
    const Elm = this.props.elementType || 'div'
    return (
      <Elm
        className={`nav-item dropdown ${this.props.className || ''} ${this.state.open
          ? 'show'
          : ''}`}
        onMouseOut={this.toggleDropdown}
        onMouseOver={this.toggleDropdown}
      >
        {this.renderToggle()}
        {this.renderMenu()}
      </Elm>
    )
  }
}

export function DropdownToggle(props) {
  return (
    <a
      className={`${props.className || 'nav-link'} dropdown-toggle`}
      id={props.id}
      aria-haspopup="true"
      aria-expanded={props.active}
      title={props.title}
    >
      {props.children}
    </a>
  )
}

export function DropdownMenu(props) {
  return (
    <div
      className={`dropdown-menu ${props.className || ''} ${props.active ? 'show' : ''}`}
      aria-labelledby={props.id}
      key="DropdownMenuKey"
    >
      {props.children}
    </div>
  )
}

export function DropdownDevider(props) {
  return <div className="dropdown-divider" />
}