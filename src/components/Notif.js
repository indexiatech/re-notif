import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
const { string, func, number, shape } = PropTypes;

/**
 * A single notification component
 */
class Notif extends Component {
  static defaultProps = {
    kind: 'info'
  }

  constructor() {
    super();
    this._id = new Date().getTime();
    this._onActionClick = this._onActionClick.bind(this);
  }

  componentDidMount() {
    if (this.props.dismissAfter) {
      setTimeout(() => this.props.onDismiss(this.props.id), this.props.dismissAfter);
    }
  }

  /*
   * Handle action click event
   * @description Handle click events on the
   */
  _onActionClick = (event) => {
    event.preventDefault();
    if (this.props.onClick) {
      this.props.onActionClick();
    } else {
      return;
    }
  }

  render() {
    const { theme, kind, CustomComponent, action } = this.props;

    let classes;
    let styles = {};
    if (!theme) {
      const stylesPerType = stylesNotif[kind];
      styles = {
        ...stylesNotif.base,
        ...stylesPerType,
      };
    } else {
      classes = classnames('re-notif', theme.defaultClasses, theme[`${kind}Classes`]);
    }

    const component = !CustomComponent ?
      <div className={classes} style={styles}>
        <div>
          <div className="notif-icon"/>
          <div className="notif-content">
            <span className="notif-message">{this.props.message}</span>
          </div>
          { action &&
            <span className="notif-action">
              <button onClick={this._onActionClick}>{this.props.action}</button>
            </span>
          }
          <div className="notif-close"/>
        </div>
      </div>
      :
      <CustomComponent {...this.props}/>;

    return component;
  }
}

const stylesNotif = {
  base: {
    position: 'relative',
    font: '1rem normal Helvetica, sans-serif',
    overflow: 'hidden',
    'borderRadius': 4,
    'marginBottom': 2,
    'maxHeight': 400,
    boxSizing: 'border-box',
    boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
    padding: '0.5rem',
    color: '#fff'
  },

  success: {
    backgroundColor: '#64ce83'
  },

  info: {
    backgroundColor: '#3ea2ff'
  },

  warning: {
    backgroundColor: '#ff7f48'
  },

  danger: {
    backgroundColor: '#e74c3c'
  }
};

const styleCountdown = {
  base: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 4
  },

  info: {
    'backgroundColor': '#71bbff'
  }
};

Notif.propTypes = {
  /*
   * The notification message
   */
  message: PropTypes.string.isRequired,

  /**
   * The message kind to render, this affects the styling of the notification.
   **/
  kind: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,

  /*
   * The given text will be rendered as a button within the notification
   */
  action: string,

  onClick: func,

  /*
   * A handler to be invoked when the action recieves a click event.
   */
  onActionClick: func,

  /*
   * The time in milliseconds that the notification will automatically dismiss after
   */
  dismissAfter: number,

  /*
   * A handler to be invoked upon notification dismiss
   */
  onDismis: func,

  theme: shape({
    defaultClasses: string,
    successClasses: string,
    infoClasses: string,
    warningClasses: string,
    dangerClasses: string
  })
};

export default Notif;
