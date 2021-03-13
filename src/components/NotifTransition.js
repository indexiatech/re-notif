import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Notif from './Notif';
import { CSSTransition } from 'react-transition-group';

export function NotifTransition(props) {
  const {
    // CSSTransition props
    addEventListener,
    appear,
    classNames,
    enter,
    exit,
    in: inProp,
    mountOnEnter,
    // eslint-disable-next-line no-unused-vars
    nodeRef,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    timeout,
    unmountOnExit,

    // NotifTransition props
    CustomComponent,

    // Custom component props
    ...rest,
  } = props;

  const ref = useRef(null);
  const Component = CustomComponent || Notif;

  return (
    <CSSTransition
      addEndListener={addEventListener}
      appear={appear}
      classNames={classNames}
      enter={enter}
      exit={exit}
      in={inProp}
      mountOnEnter={mountOnEnter}
      nodeRef={ref}
      onEnter={onEnter}
      onEntered={onEntered}
      onEntering={onEntering}
      onExit={onExit}
      onExited={onExited}
      onExiting={onExiting}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
    >
      <Component
        ref={ref}
        {...rest}
      />
    </CSSTransition>
  );
}

NotifTransition.defaultProps = {
  CustomComponent: null
};

let CSSTransitionPropTypes = {};
if (CSSTransition.propTypes) {
  CSSTransitionPropTypes = { ...CSSTransition.propTypes };
  delete CSSTransitionPropTypes.children;
}

NotifTransition.propTypes = {
  ...CSSTransitionPropTypes,

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
  CustomComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  componentClassName: PropTypes.string.isRequired,
};
