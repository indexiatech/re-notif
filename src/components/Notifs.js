import React from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';

// These can be overridden by changing the componentClassName prop
import '../../css/styles.css';

const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

import Notif from './Notif';

function Notifs(props) {
  const { notifs, className, componentClassName, CustomComponent, transitionEnterTimeout, transitionLeaveTimeout, onActionClick, actionLabel } = props;

  const items = notifs.map((notif) => (
    <Notif
      key={getter(notif, 'id')}
      id={getter(notif, 'id')}
      message={getter(notif, 'message')}
      kind={getter(notif, 'kind')}
      componentClassName={componentClassName}
      CustomComponent={CustomComponent}
      onActionClick={onActionClick}
      actionLabel={actionLabel}
    />
  ));
  const classes = [
    `${componentClassName}__container`,
    className || null
  ].join(' ').split();

  return (
    <div className={classes} >
      <TransitionGroup
        transitionName={`${componentClassName}-transition`}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
      >
        {items}
      </TransitionGroup>
    </div>
  );
}

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
  onActionClick: null,
  action: null
};

Notifs.propTypes = {
  notifs: React.PropTypes.array,
  className: React.PropTypes.string,
  CustomComponent: React.PropTypes.func,
  componentClassName: React.PropTypes.string,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeaveTimeout: React.PropTypes.number,
  onActionClick: React.PropTypes.func,
  actionLabel: React.PropTypes.string
};

export default connect((state) => ({ notifs: state.get ? state.get('notifs') : state.notifs }), {})(Notifs);
