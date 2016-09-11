import React from 'react';

const Notif = ({ kind, CustomComponent, componentClassName, actionLabel, onActionClick, id }) => {
  const _onActionClick = (ev) => {
    ev.preventDefault();

    if (!onActionClick) {
      return;
    }

    onActionClick(id);
  };

  if (CustomComponent) {
    return <CustomComponent {...this.props} />;
  }

  return (
    <div className={`${componentClassName} ${componentClassName}--${kind}`}>
        <div className={`${componentClassName}__icon`} />
        <div className={`${componentClassName}__content`}>
          <span className={`${componentClassName}__message`}>{this.props.message}</span>
        </div>
        { actionLabel &&
          <span className={`${componentClassName}__action`}>
            <button onClick={_onActionClick}>{this.props.actionLabel}</button>
          </span>
        }
        <div className={`${componentClassName}__close`} />
    </div>
  );
};

Notif.defaultProps = {
  kind: 'info',
};

Notif.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,
  message: React.PropTypes.string,
  kind: React.PropTypes.oneOf([
    'success',
    'info',
    'warning',
    'danger'
  ]),
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
