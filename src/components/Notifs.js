import React from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';

// These can be overridden by changing the componentClassName prop
import '../../css/styles.css';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

import Notif from './Notif';

const Notifs = ({ notifications, className, componentClassName, transitionEnterTimeout, transitionLeaveTimeout }) => {
  const renderedNotifications = notifications.map((notification) => (
    <Notif
      key={getter(notification, 'id')}
      id={getter(notification, 'id')}
      message={getter(notification, 'message')}
      kind={getter(notification, 'kind')}
      {...this.props}
    />
  ));
  const classes = [
    `${componentClassName}__container`,
    className
  ].join(' ').split();

  return (
    <div className={classes} >
      <TransitionGroup
        transitionName={`${componentClassName}-transition`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {renderedNotifications}
      </TransitionGroup>
    </div>
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
};

Notifs.propTypes = {
  notifications: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  componentClassName: React.PropTypes.string,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeaveTimeout: React.PropTypes.number,
};

export default connect((state) => ({ notifications: state.get ? state.get('notifs') : state.notifs }), {})(Notifs);
