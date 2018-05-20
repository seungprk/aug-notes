import React from 'react';
import MainScene from '../3d/MainScene';
import helper from '../../helper';

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

  handleClick() {
    const x = helper.randomInt(-100, 100);
    const y = helper.randomInt(-100, 100);
    this.mainScene.addNode(x, y, 0);
  }

  render() {
    return <canvas ref={this.canvas} onClick={() => this.handleClick()} />;
  }
}

export default App;
