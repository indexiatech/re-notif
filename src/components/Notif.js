import React from 'react';
import PropTypes from 'prop-types';

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
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  kind: PropTypes.oneOf([
    'success',
    'info',
    'warning',
    'danger',
  ]).isRequired,
  componentClassName: PropTypes.string,
  onActionClick: PropTypes.func,
  actionLabel: PropTypes.string,
};

export default Notif;
