# `re-notif`

[React](https://github.com/facebook/react) & [Redux](https://github.com/rackt/redux) based notifications center.

Thanks to Redux, the notification objects are maintained within Redux Store's State and are fired by Actions,

Features such auto dismiss and styling are supported (see below)


# Setup

## Installation

`npm install --save re-notif`

Note: for the fade animation to work properly, the css file `re-notif/lib/re-notif.css` must be included

## Enhance reducer

Enhance Your Redux root reducer with the notification reducer:

```js
import { reducer as notifReducer } from 're-notif';
combineReducers({
  notifs: notifReducer,
  ...more reducers here...
})
```

## Notifications Container Placement

In your application DOM tag put the `Notifs` component

```js
import { Notifs } from 're-notif';
class App extends Component {
  render() {
    <div className="content">
      <Notifs/>
    </div>
  }
}
```

## Sending notifications

Thanks to Redux, sending notification is simply done by firing an `Action`:

```js
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;

class Demo extends Component {
  send() {
    this.props.dispatch(notifSend({message: 'hello world', kind: 'info', dismissAfter: 2000}));
  }

  render() {
    <button onClick={::this.send}>Send</button>
  }
}
```

# Demo

[Watch the demo](http://indexiatech.github.io/re-notif) or [checkout its source code](https://github.com/indexiatech/re-notif/blob/master/demo/index.js)


# API

## Components

### `<Notifs theme={object} CustomComponent={ReactComponent}/>`

#### - `theme.infoClasses : string` [optional]

> The CSS classes to attach to an `info` kind notification.

#### - `theme.successClasses : string` [optional]

> The CSS classes to attach to an `success` kind notification.

#### - `theme.warningClasses : string` [optional]

> The CSS classes to attach to an `warning` kind notification.

#### - `theme.dangerClasses : string` [optional]

> The CSS classes to attach to an `danger` kind notification.

#### - `CustomComponent : React Component`

> A custom component to render for every notification fired, component will have the following props:

##### - `props.message`

> The notification's message.

---

## Reducer

> The notifications reducer, should be mounted under `notifs`.

---

## Actions

### `actions.sendNotif(config:Object)`

> Send a notification

#### -`config.message : string`

> The notification message

#### - `config.kind : enum` [optional]

> The notification kind, can be one of: `info`, `success`, `warning`, `danger`.

#### - `config.dismissAfter: integer` [optional]

> Auto dismiss the notification after the given number of MS.

### `actions.notifClear()`

> Clear all current notifications.
