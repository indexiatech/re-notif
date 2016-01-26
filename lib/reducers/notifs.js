'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = notifs;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _actionsNotifs = require('../actions/notifs');

function notifs(domain, action) {
  if (domain === undefined) domain = [];

  if (!action || !action.type) return domain;

  switch (action.type) {
    case _actionsNotifs.NOTIF_SEND:
      return [action.payload].concat(_toConsumableArray(domain));
    case _actionsNotifs.NOTIF_DISMISS:
      return domain.filter(function (notif) {
        return notif.id !== action.payload;
      });
    case _actionsNotifs.NOTIF_CLEAR:
      return [];
    default:
      return domain;
  }
}

module.exports = exports['default'];