///<reference path='../react/react.d.ts' />
///<reference path='../redux/redux.d.ts' />
declare module ReNotif {
    import React = __React;
    interface ThemeProps {
        /**
         * The CSS classes to attach to an info notification.
         */
        infoClasses?: string,
        /**
         * The CSS classes to attach to a success notification.
         */
        successClasses?: string,
        /**
         * The CSS classes to attach to a warning notification.
         */
        warningClasses?: string,
        /**
         * The CSS classes to attach to a danger notification.
         */
        dangerClasses?: string,
    }
    interface NotifsProps {
        className?: string,
        /**
         * Set CSS classes to attach to the different kinds of notifications.
         */
        theme?: string,
        /**
         * Provide a custom component to use for the Notif items.
         * @see https://github.com/indexiatech/re-notif/blob/master/src/components/Notif.js
         */
        CustomComponent?: React.ComponentClass<any>,
        /**
         * Whether to force usage of the default `styles`
         * @see https://github.com/Flavorus/re-notif/blob/custom-state-selector/src/components/Notifs.js#L28
         */
        forceNotifsStyles?: boolean,
        /**
         * A custom state selector that will be used by the Redux connect function to select the slice of your state tree where you mounted the notifications reducer. 
         * @example `<Notifs stateSelector={ (state) => state.somewhere.notif } />`
         */
        stateSelector?(state): any,
        /**
         * React CSSTransitionGroup enter animation timeout
         * @default 500
         */
        transitionEnterTimeout?: number,
        /**
         * React CSSTransitionGroup leave animation timeout
         * @default 500
         */
        transitionLeaveTimeout?: number,
    }
    class Notifs extends React.Component<NotifsProps, {}> {
        render(): React.DOMElement<any>;
    }

    interface ActionConfig {
        /**
         * The notification message.
         */
        message: string,
        /**
         * The notification kind, can be one of: info, success, warning, danger.
         */
        kind?: string,
        /**
         * Auto dismiss the notification after the given number of milliseconds.
         */
        dismissAfter?: number,
    }
    interface Actions {
        /**
         * Send a notification.
         */
        sendNotif(config: ActionConfig): void;
        /**
         * Clear all current notifications.
         */
        notifClear(): void;
    }
}

declare var actions: ReNotif.Actions;
declare var reducer: Redux.Reducer;
declare var Notifs: typeof ReNotif.Notifs;

declare module 're-notif' {
    export { actions, reducer, Notifs }
}