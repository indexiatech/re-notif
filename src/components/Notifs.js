import React from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';

// These can be overridden by changing the componentClassName prop
import '../../css/styles.css';

const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

import Notif from './Notif';
import { notifDismiss } from '../actions/notifs';

class Notifs extends React.Component {
  constructor() {
    super();
    this._onDismiss = this._onDismiss.bind(this);
  }

  _onDismiss(id) {
    this.props.notifDismiss(id);
  }

  render() {
    const { notifs, className, componentClassName, CustomComponent, transitionEnterTimeout, transitionLeaveTimeout, onActionClick, actionLabel, dismissAfter } = this.props;
    const items = notifs.map((notif) => (
      <Notif
        key={getter(notif, 'id')}
        id={getter(notif, 'id')}
        message={getter(notif, 'message')}
        kind={getter(notif, 'kind')}
        componentClassName={componentClassName}
        CustomComponent={CustomComponent}
        dismissAfter={notif.dismissAfter || dismissAfter}
        onDismiss={this.onDismiss}
        onActionClick={onActionClick}
        actionLabel={actionLabel}
      />
    ));

    return (
      <div className={`${componentClassName}__container ${className}`} >
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
}

Notifs.defaultProps = {
  componentClassName: 'notif',
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600,
  onActionClick: null,
  action: null,
  dismissAfter: 3000
};

Notifs.propTypes = {
  notifs: React.PropTypes.array,
  className: React.PropTypes.string,
  CustomComponent: React.PropTypes.func,
  componentClassName: React.PropTypes.string,
  transitionEnterTimeout: React.PropTypes.number,
  transitionLeaveTimeout: React.PropTypes.number,
  onActionClick: React.PropTypes.func,
  actionLabel: React.PropTypes.string,
  dismissAfter: React.PropTypes.number,
  notifDismiss: React.PropTypes.func
};

export default connect((state) => ({ notifs: state.get ? state.get('notifs') : state.notifs }), { notifDismiss })(Notifs);
