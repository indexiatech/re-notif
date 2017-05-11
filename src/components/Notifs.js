import React from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Notif from './Notif';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

const Notifs = (props) => {
  const {
    notifications,
    className,
    componentClassName,
    CustomComponent,
    transitionEnterTimeout,
    transitionLeaveTimeout,
  } = props;

  const renderedNotifications = notifications.map((notification) => {
    if (CustomComponent) {
      return (
        <CustomComponent
          {...props}
          componentClassName={componentClassName}
          key={getter(notification, 'id')}
          id={getter(notification, 'id')}
          message={getter(notification, 'message')}
          kind={getter(notification, 'kind')}
        />
      );
    }
    return (
      <Notif
        {...props}
        componentClassName={componentClassName}
        key={getter(notification, 'id')}
        id={getter(notification, 'id')}
        message={getter(notification, 'message')}
        kind={getter(notification, 'kind')}
      />
    );
  });
  const classes = [
    `${componentClassName}__container`,
    className,
  ].join(' ').split();

  return (
    <div className={classes} >
      <CSSTransitionGroup
        transitionName={`${componentClassName}-transition`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {renderedNotifications}
      </CSSTransitionGroup>
    </div>
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  CustomComponent: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
};

Notifs.propTypes = {
  notifications: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
  CustomComponent: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.node,
    React.PropTypes.element,
  ]),
  componentClassName: React.PropTypes.string,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeaveTimeout: React.PropTypes.number,
};

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

export default connect(mapStateToProps)(Notifs);
