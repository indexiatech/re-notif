import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as notifReducer, actions as notifActions, Notifs } from '../src/index';
const { notifSend, notifClear, notifDismiss } = notifActions;

function CustomNotif(props) {
  return (
    <button
      className="btn btn-primary btn-lg btn-block"
      onClick={() => {
        if (props.onActionClick) {
          props.onActionClick(props.id);
        }
      }}
    >
      {props.message}
    </button>
  );
}
CustomNotif.propTypes = {
  id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  message: React.PropTypes.string,
  onActionClick: React.PropTypes.func,
};

// React component
class Demo extends Component {
  constructor() {
    super();
    this.state = {
      msg: 'hello!',
      kind: 'info',
      dismissAfter: 2000,
      customComponent: false,
      handleClick: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onKindChange = this.onKindChange.bind(this);
    this.toggleCustomComponent = this.toggleCustomComponent.bind(this);
    this.toggleHandleClick = this.toggleHandleClick.bind(this);
    this.handleDismissAfter = this.handleDismissAfter.bind(this);
    this.clear = this.clear.bind(this);
    this.send = this.send.bind(this);
    this.dismiss = this.dismiss.bind(this);
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
    this.props.notifSend({
      message: this.state.msg,
      kind: this.state.kind,
      dismissAfter: this.state.dismissAfter,
    });
  }

  clear() {
    this.props.notifClear();
  }

  dismiss(id) {
    this.props.notifDismiss(id);
  }

  toggleCustomComponent() {
    const { customComponent } = this.state;
    this.setState({ customComponent: !customComponent });
  }

  toggleHandleClick() {
    const { handleClick } = this.state;
    this.setState({ handleClick: !handleClick });
  }

  render() {
    const { msg, kind, dismissAfter, customComponent, handleClick } = this.state;
    const kinds = ['info', 'success', 'warning', 'danger'];

    let notifsComponent;
    if (customComponent && handleClick) {
      notifsComponent = (
        <Notifs
          CustomComponent={CustomNotif}
          onActionClick={id => this.dismiss(id)}
          actionLabel="close"
        />
      );
    } else if (customComponent) {
      notifsComponent = <Notifs CustomComponent={CustomNotif} />;
    } else if (handleClick) {
      notifsComponent = <Notifs onActionClick={id => this.dismiss(id)} actionLabel="close" />;
    } else {
      notifsComponent = <Notifs />;
    }

    return (
      <div className="content">
        {notifsComponent}
        <div className="row">
          <div className="col col-md-3">
            <form className="form-group">
              <fieldset>
                <legend>Re-Notif Demo</legend>
                <div className="form-group">
                  <label>Message</label>
                  <input
                    className="form-control"
                    id="message"
                    type="text"
                    value={msg}
                    onChange={this.handleChange}
                  />
                </div>
                {kinds.map((k, index) =>
                  <div className="radio" key={index}>
                    <label>
                      <input
                        className=""
                        type="radio"
                        name={k}
                        value={k}
                        checked={kind === k}
                        onChange={this.onKindChange}
                      />
                      {k}
                    </label>
                  </div>
                )}
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={customComponent}
                        onClick={this.toggleCustomComponent}
                      /> Custom Component
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={handleClick}
                        onClick={this.toggleHandleClick}
                      /> Handle Click (onActionClick)
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Dismiss After (ms)</label>
                  <input
                    className="form-control"
                    type="text" value={dismissAfter}
                    onChange={this.handleDismissAfter}
                  />
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
  notifDismiss: React.PropTypes.func,
};

// Store:
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);

const store = createStoreWithMiddleware(combineReducers({ notifs: notifReducer }), {});

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count,
  };
}

// Connected Component:
const App = connect(
  mapStateToProps,
  { notifSend, notifClear, notifDismiss }
)(Demo);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
