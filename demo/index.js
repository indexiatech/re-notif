import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//import Notifs from '../src/components/Notifs'
//import { notifSend, notifClear } from '../src/actions/notif'

import { notifReducer, notifActions, NotifsComponent } from '../lib'
const { notifSend, notifClear } = notifActions

// React component
class Demo extends Component {
  constructor() {
    super()
    this.state = {msg: 'hello!', kind: 'info', dismissAfter: 2000}
  }

  handleChange (e) {
    this.setState({msg: e.target.value});
  }

  handleDismissAfter (e) {
    this.setState({dismissAfter: e.target.value});
  }

  onKindChange (e) {
    this.setState({kind: e.target.value});
  }

  send() {
    this.props.notifSend({message: this.state.msg, kind: this.state.kind, dismissAfter: this.state.dismissAfter})
  }

  clear() {
    this.props.notifClear()
  }

  render(){
    let { msg, kind, dismissAfter } = this.state
    const { onNotifSend } = this.props
    const kinds = ['info', 'success', 'warning', 'error']
    return (
      <div>
        <NotifsComponent/>
        <form className="pure-form pure-form-stacked">
        <fieldset>
        <legend>Re-Notif Demo</legend>
        <label>Message</label>
        <input id="message" type="text" value={msg} onChange={::this.handleChange} />
        <label>Kind</label>
        {kinds.map(k =>
          <input className="pure-checkbox" type="radio" name={k} value={k} checked={kind === k} onChange={::this.onKindChange}>{k}</input>
        )}
        <p>Dismiss After (ms)</p>
        <input type="text" value={dismissAfter} onChange={::this.handleDismissAfter} />
        </fieldset>
        </form>
        <button className="pure-button pure-button-primary" onClick={::this.send}>Send</button>
        <button className="pure-button" onClick={::this.clear}>Clear all</button>
      </div>
    )
  }
}

// Store:
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore)

const store = createStoreWithMiddleware(combineReducers({notifs: notifReducer}), {})

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Connected Component:
const App = connect(
  mapStateToProps,
  {notifSend, notifClear}
)(Demo)

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
)
