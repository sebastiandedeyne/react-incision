# Slice & dice subtree state in React

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Latest Version on NPM](https://img.shields.io/npm/v/react-incision.svg?style=flat-square)](https://npmjs.com/package/react-incision)

```js
import React from "react";
import Incision from "react-incision";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        details: {
          name: "Sebastian"
        },
        billingAddress: {
          address: "Surgeon Drive 4",
          city: "Meditown",
          zip: "9050"
        },
        shippingAddress: {
          address: "Hospital Avenue 1A",
          city: "Mediville",
          zip: "9000"
        }
      }
    };
  }

  render() {
    return (
      <Incision container={this}>
        <TextInput label="Name" path="details.name" />
        <Incision.Slice path="billingAddress">
          <AddressFields />
        </Incision.Slice>
        <Incision.Slice path="shippingAddress">
          <AddressFields />
        </Incision.Slice>
      </Incision>
    );
  }
}

function TextInput({ label, path }) {
  return (
    <Incision.Operate path={path}>
      {(value, update) => (
        <label>
          {label}:{" "}
          <input value={value} onChange={e => update(e.target.value)} />
        </label>
      )}
    </Incision.Operate>
  );
}

function AddressFields() {
  return (
    <>
      <TextInput label="Address" path="address" />
      <TextInput label="City" path="city" />
      <TextInput label="Zip" path="zip" />
    </>
  );
}
```

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
