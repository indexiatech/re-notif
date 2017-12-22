/**
 * Type definitions for redux-notifications
 */

import * as Redux from 'redux';

declare namespace ReduxNotifications {
  interface RNStatic {
    actions: Actions;
    reducer: NotifReducer;
    Notifs: NotifsComponent;
  }

  type NotifReducer = Redux.Reducer<any>;

  interface Actions {
    notifSend: (config: NotifSendConfig) => Redux.Action;
    notifClear: () => Redux.Action;
    notifDismiss: (id: string) => Redux.Action;
  }

  interface NotifSendConfig {
    /**
     * The notification message, can be one of: string, integer, element or array containing these types.
     */
    message: React.ReactNode;

    /**
     * The notification kind, can be one of: info, success, warning, danger.
     */
    kind?: NotifKind;

    /**
     * Set an ID for the notification. If not set, defaults to Date.now().
     */
    id?: string;

    /**
     * Auto dismiss the notification after the given number of milliseconds.
     */
    dismissAfter?: number;
  }

  type NotifKind = 'info' | 'success' | 'warning' | 'danger';

  type NotifsComponent = React.ComponentType<
    NotifsComponentProps | NotifsComponentWithAction
  >;

  interface NotifsComponentProps {
    className?: string;
    CustomComponent?: React.ReactType<any>;
    componentClassName?: string;
    transitionEnterTimeout?: number;
    transitionLeaveTimeout?: number;
  }

  interface NotifsComponentWithAction extends NotifsComponentProps {
    actionLabel: string;
    onActionClick: Function;
  }
}

export const actions: ReduxNotifications.Actions;
export const reducer: ReduxNotifications.NotifReducer;
export const Notifs: ReduxNotifications.NotifsComponent;
