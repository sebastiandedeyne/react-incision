import React from "react";
import Incision from "../src";
import { mount } from "enzyme";

test("it can display a value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "Sebastian"
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Operate path="name">{name => name}</Incision.Operate>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.text()).toBe("Sebastian");
});

test("it can display a nested value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          name: "Sebastian"
        }
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Operate path="user.name">{name => name}</Incision.Operate>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.text()).toBe("Sebastian");
});

test("it can display a sliced value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          name: "Sebastian"
        }
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Slice path="user">
            <Incision.Operate path="name">{name => name}</Incision.Operate>
          </Incision.Slice>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.text()).toBe("Sebastian");
});

test("it can display a nested sliced value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          details: {
            name: "Sebastian"
          }
        }
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Slice path="user.details">
            <Incision.Operate path="name">{name => name}</Incision.Operate>
          </Incision.Slice>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.text()).toBe("Sebastian");
});

test("it can operate on a value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "Sebastian"
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Operate path="name">
            {(name, setName) => (
              <>
                <h1>{name}</h1>
                <button onClick={() => setName("Freek")}>Freekify</button>
              </>
            )}
          </Incision.Operate>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.find("h1").text()).toBe("Sebastian");

  component.find("button").simulate("click");

  expect(component.find("h1").text()).toBe("Freek");
});

test("it can operate on a nested value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          name: "Sebastian"
        }
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Operate path="user.name">
            {(name, setName) => (
              <>
                <h1>{name}</h1>
                <button onClick={() => setName("Freek")}>Freekify</button>
              </>
            )}
          </Incision.Operate>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.find("h1").text()).toBe("Sebastian");

  component.find("button").simulate("click");

  expect(component.find("h1").text()).toBe("Freek");
});

test("it can operate on a sliced value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          name: "Sebastian"
        }
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Slice path="user">
            <Incision.Operate path="name">
              {(name, setName) => (
                <>
                  <h1>{name}</h1>
                  <button onClick={() => setName("Freek")}>Freekify</button>
                </>
              )}
            </Incision.Operate>
          </Incision.Slice>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.text()).toBe("Sebastian");
});

test("it can operate on a nested sliced value", () => {
  class Dummy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {
          details: {
            name: "Sebastian"
          }
        }
      };
    }

    render() {
      return (
        <Incision container={this}>
          <Incision.Slice path="user.details">
            <Incision.Operate path="name">
              {(name, setName) => (
                <>
                  <h1>{name}</h1>
                  <button onClick={() => setName("Freek")}>Freekify</button>
                </>
              )}
            </Incision.Operate>
          </Incision.Slice>
        </Incision>
      );
    }
  }

  const component = mount(<Dummy />);

  expect(component.text()).toBe("Sebastian");
});
