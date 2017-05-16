'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifSend = notifSend;
exports.notifDismiss = notifDismiss;
exports.notifClear = notifClear;
var NOTIF_SEND = exports.NOTIF_SEND = 'NOTIF_SEND';
var NOTIF_DISMISS = exports.NOTIF_DISMISS = 'NOTIF_DISMISS';
var NOTIF_CLEAR = exports.NOTIF_CLEAR = 'NOTIF_CLEAR';

/**
 * Publish a notification,
 * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.``
 */
function notifSend(notif) {
  var payload = Object.assign({}, notif);
  if (!payload.id) {
    payload.id = new Date().getTime();
  }
  return function (dispatch) {
    dispatch({ type: NOTIF_SEND, payload: payload });

    if (payload.dismissAfter) {
      setTimeout(function () {
        dispatch({
          type: NOTIF_DISMISS,
          payload: payload.id
        });
      }, payload.dismissAfter);
    }
  };
}

/**
 * Dismiss a notification by the given id.
 */
function notifDismiss(id) {
  return { type: NOTIF_DISMISS, payload: id };
}

/**
 * Clear all notifications
 */
function notifClear() {
  return { type: NOTIF_CLEAR };
}