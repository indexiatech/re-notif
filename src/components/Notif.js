import React from 'react';

const Notif = ({ kind, componentClassName, actionLabel, onActionClick, id, message }) => {
  const handleActionClick = (ev) => {
    ev.preventDefault();

    if (!onActionClick) {
      return;
    }

    onActionClick(id);
  };

  return (
    <div className={`${componentClassName} ${componentClassName}--${kind}`}>
      <div className={`${componentClassName}__icon`} />
      <div className={`${componentClassName}__content`}>
        <span className={`${componentClassName}__message`}>{message}</span>
      </div>
      {actionLabel &&
        <span className={`${componentClassName}__action`}>
          <button onClick={handleActionClick}>{actionLabel}</button>
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
    React.PropTypes.number,
  ]).isRequired,
  message: React.PropTypes.string.isRequired,
  kind: React.PropTypes.oneOf([
    'success',
    'info',
    'warning',
    'danger',
  ]).isRequired,
  componentClassName: React.PropTypes.string,
  onActionClick: React.PropTypes.func,
  actionLabel: React.PropTypes.string,
};

export default Notif;
