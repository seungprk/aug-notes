import React from 'react';
import Controls from './Controls';
import MainScene from '../3d/MainScene';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.onAddNode = this.onAddNode.bind(this);
    this.onAddLine = this.onAddLine.bind(this);
  }

  componentDidMount() {
    this.mainScene = new MainScene(this.canvas.current);
    this.mainScene.addDonut(0, 0, 0);
  }

  onAddNode(e) {
    console.log('add');
    e.preventDefault();
  }

  onAddLine(e) {
    console.log('add');
    e.preventDefault();
  }

  handleClick(e) {
    console.log('handle');
    const selected = this.mainScene.selectAtWindow(e.clientX, e.clientY);
    if (!selected) {
      const text = prompt('Node Text:');
      this.mainScene.addNodeAtWindow(text, e.clientX, e.clientY);
    }
  }

  render() {
    return (
      <div>
        <Controls onAddNode={this.onAddNode} onAddLine={this.onAddLine} />
        <canvas ref={this.canvas} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
