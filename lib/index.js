'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reducersNotifs = require('./reducers/notifs');

var _reducersNotifs2 = _interopRequireDefault(_reducersNotifs);

var _actionsNotifs = require('./actions/notifs');

var actions = _interopRequireWildcard(_actionsNotifs);

var _componentsNotifs = require('./components/Notifs');

var _componentsNotifs2 = _interopRequireDefault(_componentsNotifs);

exports.Notifs = _componentsNotifs2['default'];
exports.actions = actions;
exports.reducer = _reducersNotifs2['default'];