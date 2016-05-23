import React from 'react';
import classnames from 'classnames';

class Notif extends React.Component {
  constructor() {
    super();
    this._id = new Date().getTime();
    this._onActionClick = this._onActionClick.bind(this);
  }

  /*
   * Handle action click event
   * @description Handle click events on the
   */
  _onActionClick(event) {
    event.preventDefault();
    if (this.props.onClick) {
      this.props.onActionClick();
    } else {
      return;
    }
  }

  render() {
    const { kind, CustomComponent, componentClassName, action } = this.props;

    const classes = [
      componentClassName,
      `${componentClassName}--${kind}`,
    ];

    const component = !CustomComponent ?
      <div className={classnames(classes)}>
          <div className={`${componentClassName}__icon`} />
          <div className={`${componentClassName}__content`}>
            <span className={`${componentClassName}__message`}>{this.props.message}</span>
          </div>
          { action &&
            <span className={`${componentClassName}__action`}>
              <button onClick={this._onActionClick}>{this.props.action}</button>
            </span>
          }
          <div className={`${componentClassName}__close`} />
      </div>
      :
      <CustomComponent {...this.props} />;

    return component;
  }
}

Notif.defaultProps = {
  kind: 'info',
};

Notif.propTypes = {
  message: React.PropTypes.string.isRequired,
  kind: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  action: React.PropTypes.string,
  componentClassName: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onActionClick: React.PropTypes.func,
  dismissAfter: React.PropTypes.number,
  CustomComponent: React.PropTypes.node
};

export default Notif;
