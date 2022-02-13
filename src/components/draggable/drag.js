import React, { Component } from "react";
import Draggable from "react-draggable";

export default class App extends Component {
  state = { disabled: false };

  toggleDraggable = () =>
    this.setState((prevState) => ({ disabled: !this.state.disabled }));

  render = () => {
    const { disabled } = this.state;
    return (
      <Draggable>
        <div className="box">
          <div>Move me around!</div>
        </div>
      </Draggable>
    );
  };
}
