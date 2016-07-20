# `redux-notifications`

> :warning: The previous package `re-notif` has been deprecated on NPM and renamed to `redux-notifications`. A list of changes can be found in the Changelog. Please update your applications accordingly.

[React](https://github.com/facebook/react) & [Redux](https://github.com/rackt/redux) based notifications center.

Thanks to Redux, the notification objects are maintained within Redux Store's State and are fired by Actions.

## Implementation

##### 1. Installation

`npm install --save redux-notifications`

##### 2. The next thing you need to do is to add the `redux-notifications` `reducer` to Redux.
```js
import { createStore, combineReducers } from 'redux'
import { reducer as notifReducer } from 'redux-notifications';
combineReducers({
  notifs: notifReducer,
  // ... more reducers here ...
})
```

##### 3. Add the `Notifs` component at the root of your app
```js
import { Provider }  from 'react-redux'
import { Notifs } from 'redux-notifications';

<Provider store={store}>
  <div>
    // ... other things like router ...
    <Notifs />
  </div>
</Provider>
```

## Sending notifications

Thanks to Redux, sending notification is simply done by firing an `Action`:

```
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
const { notifSend } = notifActions;

class Demo extends React.Component {
  send() {
    this.props.dispatch(notifSend({
      message: 'hello world',
      kind: 'info',
      dismissAfter: 2000
    }));
  }

  render() {
    <button onClick={this.send}>Send Notification</button>
  }
}
```

## Demo

[Watch the demo](http://indexiatech.github.io/re-notif) or [checkout its source code](https://github.com/indexiatech/re-notif/blob/master/demo/index.js)

## API

### Actions

#### `actions.notifSend({config})`

##### `config.message : string` [required]
> The notification message.

##### `config.componentClassName : string` [optional] [default:'notif']
> The base className for the Notif component. Can be used to override CSS styles.

##### `config.kind : string` [optional] [default:'info']
> The notification kind, can be one of: `info`, `success`, `warning`, `danger`.

##### `config.id : string` [optional] [default:Date.now()]
> Set an ID for the notification. If not set, defaults to Date.now().

##### `config.dismissAfter : integer` [optional] [default:null]
> Auto dismiss the notification after the given number of milliseconds.

##### `config.transitionEnterTimeout : integer` [optional] [default:600]
> Define the react-transition-group enter timeout is milliseconds.

##### `config.transitionLeaveTimeout : integer` [optional] [default:600]
> Define the react-transition-group leave timeout is milliseconds.

#### `actions.notifClear()`
> Clear all current notifications.

#### `actions.notifDismiss(id)`
> Dismiss a notification by ID

---

### Custom Component

#### `<Notifs CustomComponent={ReactComponent}/>`

##### `CustomComponent : React component`
> A custom react component can be used instead of the default Notif component

##### `id : string || number`
> The notification's unique ID

##### `message : string`
> The notification's message

##### `actionLabel : string`
> Label for action click

##### `onActionClick : func`
> Function when action is clicked. Requires `actionLabel` prop

## Development

```
git clone https://github.com/indexiatech/re-notif.git
cd re-notif
npm install
npm run start
```
Listening on localhost:3000
