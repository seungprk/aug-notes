import React from 'react';
import Controls from './Controls';
import MainScene from '../3d/MainScene';
import Modal from './Modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      control: null,
      showModal: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onAddNode = this.onAddNode.bind(this);
    this.onAddLine = this.onAddLine.bind(this);
    this.onViewNode = this.onViewNode.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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

  onViewNode() {
    this.setState({
      control: {
        name: 'viewNode',
        selectedNode: null,
      },
    });
  }

  handleClick(e) {
    const { control } = this.state;
    const selectedNode = this.mainScene.selectNodeAtWindow(e.clientX, e.clientY);

    if (this.state.showModal) return;

    if (control === null) {
      if (selectedNode) selectedNode.toggleHighlight();
      return;
    }

    if (control.name === 'addNode') {
      const modControl = Object.assign({}, control);
      modControl.mouseX = e.clientX;
      modControl.mouseY = e.clientY;
      modControl.isEdit = true;
      this.setState({
        showModal: true,
        control: modControl,
      });
    } else if (control.name === 'addLine') {
      if (selectedNode === null) {
        console.log('addLine failed');
        this.setState({ control: null });
        return;
      }

      if (control.startNode === null) {
        console.log('addLine select 1');
        const modControl = Object.assign({}, control);
        modControl.startNode = selectedNode;
        this.setState({ control: modControl });
      } else {
        console.log('addLine select 2');
        this.mainScene.connectNodes(control.startNode, selectedNode);
        this.setState({ control: null });
      }
    } else if (control.name === 'viewNode') {
      if (selectedNode) {
        const modControl = Object.assign({}, control);
        modControl.selectedNode = selectedNode;
        modControl.isEdit = false;
        this.setState({
          showModal: true,
          control: modControl,
        });
      } else {
        console.log('viewNode failed');
        this.setState({ control: null });
      }
    }
  }

  handleCloseModal(titleValue, contentValue) {
    const { control } = this.state;
    if (control.name === 'addNode') {
      this.mainScene.addNodeAtWindow(titleValue, contentValue, control.mouseX, control.mouseY);
    } else if (this.state.control.name === 'viewNode') {
      this.state.control.selectedNode.update(titleValue, contentValue);
    }

    this.setState({
      showModal: false,
      control: null,
    });
  }

  render() {
    const selectedNode = this.state.control && this.state.control.selectedNode;
    return (
      <div>
        <Controls
          onAddNode={this.onAddNode}
          onAddLine={this.onAddLine}
          onViewNode={this.onViewNode}
        />
        <canvas ref={this.canvas} onClick={this.handleClick} />
        {this.state.showModal ?
          <Modal
            isEdit={this.state.control.isEdit}
            onCloseModal={this.handleCloseModal}
            selectedNode={selectedNode || { title: '', content: '' }}
          />
        : null}
      </div>
    );
  }
}

export default App;

