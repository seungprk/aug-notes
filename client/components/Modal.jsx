import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 100vh;
`;

const Input = styled.input`
  display: block;
  width: 500px;
  max-width: 100vw;
  padding: 1rem;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Textarea = styled.textarea`
  display: block;
  resize: none;
  width: 500px;
  max-width: 100vw;
  height: 50vh;
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
`;

const Button = styled.button`
  display: block;
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: props.selectedNode.title,
      contentValue: props.selectedNode.content,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleInputChange(e) {
    this.setState({ titleValue: e.target.value });
  }

  handleTextareaChange(e) {
    this.setState({ contentValue: e.target.value });
  }

  handleClose() {
    this.props.onCloseModal(this.state.titleValue, this.state.contentValue);
  }

  render() {
    return (
      <ModalWrapper>
        <Input type="text" placeholder="Title" value={this.state.titleValue} onChange={this.handleInputChange} />
        <Textarea
          placeholder="Write your note here"
          value={this.state.contentValue}
          onChange={this.handleTextareaChange}
        />
        <Button onClick={this.handleClose}>Close</Button>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  selectedNode: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;

