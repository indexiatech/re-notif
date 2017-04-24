'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = notifs;

var _actions = require('./actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function notifs() {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  if (!action || !action.type) return domain;

  switch (action.type) {
    case _actions.NOTIF_SEND:
      return [action.payload].concat(_toConsumableArray(domain.filter(function (_ref) {
        var id = _ref.id;
        return id !== action.payload.id;
      })));
    case _actions.NOTIF_DISMISS:
      return domain.filter(function (notif) {
        return notif.id !== action.payload;
      });
    case _actions.NOTIF_CLEAR:
      return [];
    default:
      return domain;
  }
}