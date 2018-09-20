﻿# A subtree state management library when setState just doesn't cut it

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/react-incision.svg?style=flat-square)](https://npmjs.com/package/react-incision)

React Incision is a small state management library built on [React 16's context API](https://reactjs.org/docs/context.html). It allows you to expose a state object, and retrieve or update it further down the component tree.

Retrieve parent state via dot notation, or "slice" the parent state in a child component to expose a new, smaller state object. This probably sounds quite abstract, time for a few examples!

First, we'll create a stateful component. The goal is to share state with it's child components.

```js
import React from "react";
import Incision from "react-incision";

class Profile extends React.Component {
  state = {
    user: {
      name: "Sebastian",
      address: {
        streetAddress: "Samberstraat 69D",
        city: "Antwerp",
        zip: "2060"
      }
    }
  };
}
```

Next, we'll render an `Incision` component, pass our component state, and register an `onChange` handler so Incision can modify our state.

```js
class Profile extends React.Component {
  state = {
    user: {
      name: "Sebastian",
      address: {
        streetAddress: "Samberstraat 69D",
        city: "Antwerp",
        zip: "2060"
      }
    }
  };

  render() {
    return (
      <Incision
        state={this.state}
        onChange={newState => this.setState(newState)}
      >
        <UserForm />
      </Incision>
    );
  }
}
```

In the `UserForm` component we rendered above, we can "operate" on the parent state by specifying a path. The `Incision.Operate` component accepts a function as it's child. The function is invoked with two arguments: the value and a setter. We can use these to map the `name` property to an input.

```js
class UserForm extends React.Component {
  render() {
    return (
      <form>
        <Incision.Operate path="name">
          {(name, setName) => (
            <label>
              Name:{" "}
              <input value={name} onChange={e => setName(e.target.value)} />
            </label>
          )}
        </Incision.Operate>
      </form>
    );
  }
}
```

When the user types in the `name` input, the `Profile` component's state will be updated. All state changes are immutable, powered by the amazing [Immer](https://github.com/mweststrate/immer) library.

We could also operate on a street address using dot notation:

```js
<Incision.Operate path="address.streetAddress">
  {(streetAddress, setStreetAddress) => (
    <label>
      Street:{" "}
      <input
        value={streetAddress}
        onChange={e => setStreetAddress(e.target.value)}
      />
    </label>
  )}
</Incision.Operate>
```

Besides operating on state values, we can also "slice" te state to expose a subset of the state object to child components.

```js
class UserForm extends React.Component {
  render() {
    return (
      <form>
        <Incision.Slice path="address">
          <Incision.Operate path="streetAddress">
            {(name, setName) => (
              <label>
                Street:{" "}
                <input
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                />
              </label>
            )}
          </Incision.Operate>
        </Incision.Slice>
      </form>
    );
  }
}
```

## Who's this for?

Incise isn't meant to be the main state management library in your application, but is great to augment existing solutions in select parts of your app.

Other libraries (like [Redux](https://github.com/reduxjs/redux), [MobX](https://github.com/mobxjs/mobx), or [Unstated](https://github.com/jamiebuilds/unstated)) are better solutions to deal with your main application logic, because they encapsulate behavior in "actions" or similar concepts. Incise is great to reduce boilerplate in places where you don't want or need actions for every single state change, but just want to modify an object.

Forms are a perfect use case. An example flow would be:

- Retrieve user data from a redux store
- Modify the user data with a form containing inputs wrapped in `Incision.Operate` components
- When the form is submitted, dispatch an action containing the modified `user` object

No more need for `SET_NAME`, `SET_EMAIL`, etc. actions. The only one we cared about was `UPDATE_PROFILE` anyway. Of course, for simple forms `setState` is probably good enough! Incise was created for those situations where `setState` just doens't cut it.

## Installation

You can install the package via npm or yarn:

```bash
npm install react-incision
```

```bash
yarn add react-incision
```

Make sure `react@^16.5.2` is also installed.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

```bash
$ yarn test
```

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
