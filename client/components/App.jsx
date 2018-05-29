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
      nodes: [],
    };
    this.mainScene = null;

    this.handleClick = this.handleClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.onAddNode = this.onAddNode.bind(this);
    this.onAddLine = this.onAddLine.bind(this);
    this.onViewNode = this.onViewNode.bind(this);
    this.onResetCam = this.onResetCam.bind(this);
  }

  componentDidMount() {
    this.mainScene = new MainScene(this.canvas.current);
    this.mainScene.addDonut(0, 0, 0);
  }

  onAddNode() {
    const node = this.mainScene.addNodeAtWindow('', '', 0, 0);
    const newNodes = this.state.nodes.slice();
    newNodes.push(node);

    this.setState({
      nodes: newNodes,
      control: {
        name: 'addNode',
        newNode: node,
        isPlaced: false,
      },
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

  onResetCam() {
    this.mainScene.resetCamera();
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
      modControl.isPlaced = true;
      this.setState({
        showModal: true,
        control: modControl,
      });
      this.mainScene.controls.enabled = false;
    } else if (control.name === 'addLine') {
      if (selectedNode === null) {
        console.log('addLine failed');
        this.setState({ control: null });
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
        this.updateUrl();
      }
    } else if (control.name === 'viewNode') {
      if (selectedNode) {
        const modControl = Object.assign({}, control);
        modControl.selectedNode = selectedNode;
        this.setState({
          showModal: true,
          control: modControl,
        });
        this.mainScene.controls.enabled = false;
      } else {
        console.log('viewNode failed');
        this.setState({ control: null });
      }
    }
  }

  updateUrl() {
    const serializables = [];
    this.state.nodes.forEach(node => serializables.push(node.getSerializable()));
    const url = JSON.stringify(serializables);
    window.history.replaceState(null, null, url);
  }

  handleCloseModal(titleValue, contentValue) {
    const { control } = this.state;
    if (control.name === 'addNode') {
      control.newNode.update(titleValue, contentValue);
    } else if (this.state.control.name === 'viewNode') {
      control.selectedNode.update(titleValue, contentValue);
    }

    this.setState({
      showModal: false,
      control: null,
    });
    this.mainScene.controls.enabled = true;
    this.updateUrl();
  }

  handleMouseMove(e) {
    const { control } = this.state;

    if (control && control.name === 'addNode' && !control.isPlaced) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      this.mainScene.moveNodeAtWindow(x, y, control.newNode);
    }
  }

  render() {
    const selectedNode = this.state.control && this.state.control.selectedNode;
    return (
      <div>
        <Controls
          onAddNode={this.onAddNode}
          onAddLine={this.onAddLine}
          onViewNode={this.onViewNode}
          onResetCam={this.onResetCam}
        />
        <canvas ref={this.canvas} onClick={this.handleClick} onMouseMove={this.handleMouseMove} />
        {this.state.showModal ?
          <Modal
            onCloseModal={this.handleCloseModal}
            selectedNode={selectedNode || { title: '', content: '' }}
          />
        : null}
      </div>
    );
  }
}

export default App;

