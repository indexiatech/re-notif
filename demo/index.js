import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend, notifClear } = notifActions;

class CustomNotif extends Component {
  render() {
    return (
      <button className="btn btn-primary btn-lg btn-block">
        {this.props.message}
      </button>
    );
  }
}

// React component
class Demo extends Component {
  constructor() {
    super();
    this.state = {msg: 'hello!', kind: 'info', dismissAfter: 2000, customStyles: false, customComponent: false};
  }

  onKindChange(ev) {
    this.setState({kind: ev.target.value});
  }

  handleChange(ev) {
    this.setState({msg: ev.target.value});
  }

  handleDismissAfter(ev) {
    this.setState({dismissAfter: ev.target.value});
  }

  send() {
    this.props.notifSend({message: this.state.msg, kind: this.state.kind, dismissAfter: this.state.dismissAfter});
  }

  clear() {
    this.props.notifClear();
  }

  toggleCustomStyles() {
    const { customStyles } = this.state;
    this.setState({customStyles: !customStyles});
  }

  toggleCustomComponent() {
    const { customComponent } = this.state;
    this.setState({customComponent: !customComponent});
  }

  render() {
    let { msg, kind, dismissAfter, customStyles, customComponent } = this.state;
    const { onNotifSend } = this.props;
    const kinds = ['info', 'success', 'warning', 'danger'];

    let theme;
    if (customStyles) {
      theme = {
        defaultClasses: 'alert',
        successClasses: 'alert-success',
        infoClasses: 'alert-info',
        warningClasses: 'alert-warning',
        dangerClasses: 'alert-danger'
      };
    }

    return (
      <div className="content">
        {!customComponent && <Notifs theme={theme} forceNotifsStyles />}
        {customComponent && <Notifs theme={theme} CustomComponent={CustomNotif}/>}
        <div className="row">
          <div className="col col-md-3">
            <form className="form-group">
              <fieldset>
                <legend>Re-Notif Demo</legend>
                <div className="form-group">
                    <label>Message</label>
                    <input className="form-control" id="message" type="text" value={msg} onChange={::this.handleChange} />
                </div>
                {kinds.map(k =>
                  <div className="radio">
                    <label>
                      <input className="" type="radio" name={k} value={k} checked={kind === k} onChange={::this.onKindChange}/>
                      {k}
                    </label>
                  </div>
                )}
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value={customStyles} onClick={::this.toggleCustomStyles} /> Custom Styles
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value={customComponent} onClick={::this.toggleCustomComponent} /> Custom Component
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Dismiss After (ms)</label>
                  <input className="form-control" type="text" value={dismissAfter} onChange={::this.handleDismissAfter} />
                </div>
                </fieldset>
              </form>
              <button className="btn btn-primary" onClick={::this.send}>Send</button>
              <button className="btn" onClick={::this.clear}>Clear all</button>
          </div>
        </div>
      </div>
    );
  }
}

// Store:
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

const store = createStoreWithMiddleware(combineReducers({notifs: notifReducer}), {});

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}

// Connected Component:
const App = connect(
  mapStateToProps,
  {notifSend, notifClear}
)(Demo);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
