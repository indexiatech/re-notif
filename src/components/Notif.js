import React from 'react';

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
    if (this.props.onActionClick) {
      this.props.onActionClick(this.props.id);
    } else {
      return;
    }
  }

  render() {
    const { kind, CustomComponent, componentClassName, actionLabel } = this.props;
    const component = !CustomComponent ?
      <div className={`${componentClassName} ${componentClassName}--${kind}`}>
          <div className={`${componentClassName}__icon`} />
          <div className={`${componentClassName}__content`}>
            <span className={`${componentClassName}__message`}>{this.props.message}</span>
          </div>
          { actionLabel &&
            <span className={`${componentClassName}__action`}>
              <button onClick={this._onActionClick}>{this.props.actionLabel}</button>
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
  id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  message: React.PropTypes.string.isRequired,
  kind: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  componentClassName: React.PropTypes.string,
  onActionClick: React.PropTypes.func,
  actionLabel: React.PropTypes.string,
  CustomComponent: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.node,
    React.PropTypes.element
  ]),
};

export default Notif;
