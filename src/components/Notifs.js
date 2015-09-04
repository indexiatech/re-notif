import React, { Component } from 'react'
import { connect } from 'react-redux'
//import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'

const getter = (obj, propName) => {return obj.get ? obj.get(propName) : obj[propName]}

import Notif from './Notif'

class Notifs extends Component {
  render(){
    const { notifs } = this.props
    console.log("!!!!!!!!!!", notifs)
    const items = notifs.map((n) => {
      return (
        <Notif key={getter(n, 'id')} message={getter(n, 'message')} kind={getter(n, 'kind')}/>
      )
    })
    return (
      <div className='notif-container' style={styles}>
      {/*Currently disabled due to: https://github.com/facebook/react/issues/1326}
      <TransitionGroup transitionName="notif">
        {items}
      </TransitionGroup>
      */}
     {items}
      </div>
    )
  }
}

var styles = {
  position: 'fixed',
  top: '10px',
  right: 0,
  left: 0,
  zIndex: 1000,
  width: '80%',
  maxWidth: 400,
  margin: 'auto'
}

export default connect(
  (state) => {
    return { notifs: state.get ? state.get('notifs') : state.notifs }
  },
  { }
)(Notifs)
