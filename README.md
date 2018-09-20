# A subtree state management library when setState just doesn't cut it

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/react-incision.svg?style=flat-square)](https://npmjs.com/package/react-incision)

React Incision is a small state management library built on [React 16's context API](https://reactjs.org/docs/context.html). It allows you to expose a state object, and retrieve and update it further down the component tree. You can retrieve parent state via dot notation, or "slice" the parent state in a child component to expose a new, smaller state object. This all sounds quite abstract, time for a few examples!

First, we create a component that will keep some state. The goal is to share this state with it's child components.

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

Next, we'll render an `Incision` component, pass our component state, and register an `onChange` handler so Incision can modify our state for us.

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

In the `UserForm` component we rendered above, we can "operate" on the parent state via a path. The `Incision.Operate` component accepts a function as it's child. The function is invoked with two arguments: the value and a setter. We can use these to map the `name` property to an input.

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

Incise isn't meant to be the main state management library in your application, but is great to augment existing solutions in specific parts of your app.

Other solutions (like [Redux](https://github.com/reduxjs/redux), [MobX](https://github.com/mobxjs/mobx), or [Unstated](https://github.com/jamiebuilds/unstated)) are better solutions for your main application logic, because the encapsulate behaviour in "actions" of some sort. Incise is great to reduce boilerplate in places where you don't want or need actions for every single state change.

An example flow would be:

- Retrieve a `user` object from a redux store
- Modify the `user` object with a form built with Incision
- When the user clicks save, dispatch an action containing the modified `user` object

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
