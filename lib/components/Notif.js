'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var string = _react.PropTypes.string;
var func = _react.PropTypes.func;
var number = _react.PropTypes.number;
var shape = _react.PropTypes.shape;

/**
 * A single notification component
 */

var Notif = (function (_Component) {
  _inherits(Notif, _Component);

  _createClass(Notif, null, [{
    key: 'defaultProps',
    value: {
      kind: 'info'
    },
    enumerable: true
  }]);

  function Notif() {
    var _this = this;

    _classCallCheck(this, Notif);

    _get(Object.getPrototypeOf(Notif.prototype), 'constructor', this).call(this);

    this._onActionClick = function (event) {
      event.preventDefault();
      if (_this.props.onClick) {
        _this.props.onActionClick();
      } else {
        return;
      }
    };

    this._id = new Date().getTime();
    this._onActionClick = this._onActionClick.bind(this);
  }

  /*
   * Handle action click event
   * @description Handle click events on the
   */

  _createClass(Notif, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var theme = _props.theme;
      var kind = _props.kind;
      var CustomComponent = _props.CustomComponent;
      var action = _props.action;

      var classes = undefined;
      var styles = {};
      if (!theme) {
        var stylesPerType = stylesNotif[kind];
        styles = _extends({}, stylesNotif.base, stylesPerType);
      } else {
        classes = (0, _classnames2['default'])('re-notif', theme.defaultClasses, theme[kind + 'Classes']);
      }

      var component = !CustomComponent ? _react2['default'].createElement(
        'div',
        { className: classes, style: styles },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement('div', { className: 'notif-icon' }),
          _react2['default'].createElement(
            'div',
            { className: 'notif-content' },
            _react2['default'].createElement(
              'span',
              { className: 'notif-message' },
              this.props.message
            )
          ),
          action && _react2['default'].createElement(
            'span',
            { className: 'notif-action' },
            _react2['default'].createElement(
              'button',
              { onClick: this._onActionClick },
              this.props.action
            )
          ),
          _react2['default'].createElement('div', { className: 'notif-close' })
        )
      ) : _react2['default'].createElement(CustomComponent, this.props);

      return component;
    }
  }]);

  return Notif;
})(_react.Component);

var stylesNotif = {
  base: {
    position: 'relative',
    font: '1rem normal Helvetica, sans-serif',
    overflow: 'hidden',
    'borderRadius': 4,
    'marginBottom': 2,
    'maxHeight': 400,
    boxSizing: 'border-box',
    boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
    padding: '0.5rem',
    color: '#fff'
  },

  success: {
    backgroundColor: '#64ce83'
  },

  info: {
    backgroundColor: '#3ea2ff'
  },

  warning: {
    backgroundColor: '#ff7f48'
  },

  danger: {
    backgroundColor: '#e74c3c'
  }
};

var styleCountdown = {
  base: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 4
  },

  info: {
    'backgroundColor': '#71bbff'
  }
};

Notif.propTypes = {
  /*
   * The notification message
   */
  message: _react.PropTypes.string.isRequired,

  /**
   * The message kind to render, this affects the styling of the notification.
   **/
  kind: _react2['default'].PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,

  /*
   * The given text will be rendered as a button within the notification
   */
  action: string,

  onClick: func,

  /*
   * A handler to be invoked when the action recieves a click event.
   */
  onActionClick: func,

  /*
   * The time in milliseconds that the notification will automatically dismiss after
   */
  dismissAfter: number,

  /*
   * A handler to be invoked upon notification dismiss
   */
  onDismis: func,

  theme: shape({
    defaultClasses: string,
    successClasses: string,
    infoClasses: string,
    warningClasses: string,
    dangerClasses: string
  })
};

exports['default'] = Notif;
module.exports = exports['default'];