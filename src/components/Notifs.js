import React from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

import Notif from './Notif';

function Notifs(props) {
  const { notifs, theme, className, CustomComponent, forceNotifsStyles } = props;

  const items = notifs.map((notif) => (
    <Notif key={getter(notif, 'id')} message={getter(notif, 'message')} kind={getter(notif, 'kind')} theme={theme} CustomComponent={CustomComponent} />
  ));

  const styles = {
    position: 'fixed',
    top: '10px',
    right: 0,
    left: 0,
    zIndex: 1000,
    width: '80%',
    maxWidth: 400,
    margin: 'auto'
  };

  const componentStyles = forceNotifsStyles || !theme ? styles : {};
  return (
    <div className={classnames('notif-container', className)} style={componentStyles}>
      <TransitionGroup transitionName="notif" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {items}
      </TransitionGroup>
    </div>
  );
}

Notifs.propTypes = {
  notifs: React.PropTypes.array,
  theme: React.PropTypes.object,
  className: React.PropTypes.string,
  CustomComponent: React.PropTypes.func,
  forceNotifsStyles: React.PropTypes.bool
};

export default connect((state) => ({ notifs: state.get ? state.get('notifs') : state.notifs }), {})(Notifs);
