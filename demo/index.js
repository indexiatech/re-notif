import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend, notifClear } = notifActions;

function CustomNotif(props) {
  return (
    <button className="btn btn-primary btn-lg btn-block">
      {props.message}
    </button>
  );
}
CustomNotif.propTypes = {
  message: React.PropTypes.string,
};

// React component
class Demo extends Component {
  constructor() {
    super();
    this.state = { msg: 'hello!', kind: 'info', dismissAfter: 2000, customComponent: false };
    this.handleChange = this.handleChange.bind(this);
    this.onKindChange = this.onKindChange.bind(this);
    this.toggleCustomComponent = this.toggleCustomComponent.bind(this);
    this.handleDismissAfter = this.handleDismissAfter.bind(this);
    this.clear = this.clear.bind(this);
    this.send = this.send.bind(this);
  }

  onKindChange(ev) {
    this.setState({ kind: ev.target.value });
  }

  handleChange(ev) {
    this.setState({ msg: ev.target.value });
  }

  handleDismissAfter(ev) {
    this.setState({ dismissAfter: ev.target.value });
  }

  send() {
    this.props.notifSend({ message: this.state.msg, kind: this.state.kind, dismissAfter: this.state.dismissAfter });
  }

  clear() {
    this.props.notifClear();
  }

  toggleCustomComponent() {
    const { customComponent } = this.state;
    this.setState({ customComponent: !customComponent });
  }

  render() {
    const { msg, kind, dismissAfter, customComponent } = this.state;
    const kinds = ['info', 'success', 'warning', 'danger'];

    return (
      <div className="content">
        {!customComponent && <Notifs />}
        {customComponent && <Notifs CustomComponent={CustomNotif} />}
        <div className="row">
          <div className="col col-md-3">
            <form className="form-group">
              <fieldset>
                <legend>Re-Notif Demo</legend>
                <div className="form-group">
                    <label>Message</label>
                    <input className="form-control" id="message" type="text" value={msg} onChange={this.handleChange} />
                </div>
                {kinds.map((k, index) =>
                  <div className="radio" key={index}>
                    <label>
                      <input className="" type="radio" name={k} value={k} checked={kind === k} onChange={this.onKindChange} />
                      {k}
                    </label>
                  </div>
                )}
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" value={customComponent} onClick={this.toggleCustomComponent} /> Custom Component
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Dismiss After (ms)</label>
                  <input className="form-control" type="text" value={dismissAfter} onChange={this.handleDismissAfter} />
                </div>
                </fieldset>
              </form>
              <button className="btn btn-primary" onClick={this.send}>Send</button>
              <button className="btn" onClick={this.clear}>Clear all</button>
          </div>
        </div>
      </div>
    );
  }
}
Demo.propTypes = {
  notifSend: React.PropTypes.func,
  notifClear: React.PropTypes.func,
  onNotifSend: React.PropTypes.func,
};

// Store:
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

const store = createStoreWithMiddleware(combineReducers({ notifs: notifReducer }), {});

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}

// Connected Component:
const App = connect(
  mapStateToProps,
  { notifSend, notifClear }
)(Demo);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
