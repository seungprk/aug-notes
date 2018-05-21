import React from 'react';
import Controls from './Controls';
import MainScene from '../3d/MainScene';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = { control: null };

    this.handleClick = this.handleClick.bind(this);
    this.onAddNode = this.onAddNode.bind(this);
    this.onAddLine = this.onAddLine.bind(this);
    this.onEditNode = this.onEditNode.bind(this);
  }

  componentDidMount() {
    this.mainScene = new MainScene(this.canvas.current);
    this.mainScene.addDonut(0, 0, 0);
  }

  onAddNode() {
    this.setState({
      control: { name: 'addNode' },
    });
  }

  onAddLine() {
    this.setState({
      control: {
        name: 'addLine',
        startNode: null,
      },
    });
  }

  onEditNode() {
    this.setState({
      control: { name: 'editNode' },
    });
  }

  handleClick(e) {
    const { control } = this.state;
    const selectedNode = this.mainScene.selectNodeAtWindow(e.clientX, e.clientY);

    if (control === null) {
      if (selectedNode) selectedNode.toggleHighlight();
      return;
    }

    if (control.name === 'addNode') {
      const text = prompt('Enter text');
      this.mainScene.addNodeAtWindow(text, e.clientX, e.clientY);
      this.setState({ control: null });
    } else if (control.name === 'addLine') {
      if (selectedNode === null) {
        console.log('addLine failed');
        this.setState({ control: null });
        return;
      }

      if (control.startNode === null) {
        console.log('addLine select 1');
        const modControl = Object.assign(control);
        modControl.startNode = selectedNode;
        this.setState({ control: modControl });
      } else {
        console.log('addLine select 2');
        this.mainScene.connectNodes(control.startNode, selectedNode);
        this.setState({ control: null });
      }
    } else if (control.name === 'editNode') {
      if (selectedNode) {
        const text = prompt('Enter new text');
        selectedNode.updateText(text);
      } else {
        console.log('editNode failed');
      }
      this.setState({ control: null });
    }
  }

  render() {
    return (
      <div>
        <Controls
          onAddNode={this.onAddNode}
          onAddLine={this.onAddLine}
          onEditNode={this.onEditNode}
        />
        <canvas ref={this.canvas} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
