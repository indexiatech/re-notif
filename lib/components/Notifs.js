'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactLibReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _reactLibReactCSSTransitionGroup2 = _interopRequireDefault(_reactLibReactCSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Notif = require('./Notif');

var _Notif2 = _interopRequireDefault(_Notif);

var getter = function getter(obj, propName) {
  return obj.get ? obj.get(propName) : obj[propName];
};

var Notifs = (function (_Component) {
  _inherits(Notifs, _Component);

  function Notifs() {
    _classCallCheck(this, Notifs);

    _get(Object.getPrototypeOf(Notifs.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Notifs, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var notifs = _props.notifs;
      var theme = _props.theme;
      var className = _props.className;
      var CustomComponent = _props.CustomComponent;
      var forceNotifsStyles = _props.forceNotifsStyles;

      var items = notifs.map(function (notif) {
        return _react2['default'].createElement(_Notif2['default'], { key: getter(notif, 'id'), message: getter(notif, 'message'), kind: getter(notif, 'kind'), theme: theme, CustomComponent: CustomComponent });
      });

      var componentStyles = forceNotifsStyles || !theme ? styles : {};
      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('notif-container', className), style: componentStyles },
        _react2['default'].createElement(
          _reactLibReactCSSTransitionGroup2['default'],
          { transitionName: 'notif', transitionEnterTimeout: transitionEnterTimeout || 500, transitionLeaveTimeout: transitionLeaveTimeout || 500 },
          items
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      theme: _react.PropTypes.object,
      className: _react.PropTypes.string,
      CustomComponent: _react.PropTypes.func,
      forceNotifsStyles: _react.PropTypes.bool,
      stateSelector: _react.PropTypes.func,
      transitionEnterTimeout: _react.PropTypes.number,
      transitionLeaveTimeout: _react.PropTypes.number
    },
    enumerable: true
  }]);

  return Notifs;
})(_react.Component);

var styles = {
  position: 'fixed',
  top: '10px',
  right: 0,
  left: 0,
  zIndex: 1000,
  width: '80%',
  maxWidth: 400,
  margin: 'auto'
};

exports['default'] = (0, _reactRedux.connect)(function (state, ownProps) {
  return { notifs: ownProps.stateSelector ? ownProps.stateSelector(state) : state.notifs };
}, {})(Notifs);
module.exports = exports['default'];