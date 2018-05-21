import React from 'react';
import MainScene from '../3d/MainScene';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.mainScene = new MainScene(this.canvas.current);
    this.mainScene.addNode(0, 0, 0);
    this.mainScene.addNode(10, 10, 0);
  }

  handleClick(e) {
    this.mainScene.addNodeAtWindow(e.clientX, e.clientY);
  }

  render() {
    return <canvas ref={this.canvas} onClick={e => this.handleClick(e)} />;
  }
}

export default App;
