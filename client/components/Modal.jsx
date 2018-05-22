import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import marked from 'marked';

marked.setOptions({ breaks: true });

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
`;

const Label = styled.div`
  display: block;
  margin: 0.25em auto;
  color: white;
  font-size: 2em;
  text-align: center;
`;

const Title = styled.div`
  background-color: white;
  text-align: center;
`;

const Content = styled.div`
  padding: 1em;
  background-color: white;
  overflow: auto;
`;

const Input = styled.input`
  display: block;
  margin: 1em auto;
  width: 70vw;
  text-align: center;
`;

const Textarea = styled.textarea`
  display: block;
  margin: 1em auto;
  resize: none;
  width: 70vw;
  height: 50vh;
`;

const Button = styled.button`
  display: block;
  margin: 1em auto;
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: props.isEdit || false,
      titleValue: props.selectedNode.title,
      contentValue: props.selectedNode.content,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ titleValue: e.target.value });
  }

  handleTextareaChange(e) {
    this.setState({ contentValue: e.target.value });
  }

  handleClose() {
    this.props.onCloseModal(this.state.titleValue, this.state.contentValue);
    this.setState({ isEdit: false });
  }

  handlePreview() {
    this.setState({ isEdit: false });
  }

  handleEdit() {
    this.setState({ isEdit: true });
  }

  render() {
    if (this.state.isEdit) {
      return (
        <ModalWrapper>
          <Label>Title</Label>
          <Input type="text" value={this.state.titleValue} onChange={this.handleInputChange} />
          <Label>Content</Label>
          <Textarea
            value={this.state.contentValue}
            onChange={this.handleTextareaChange}
          />
          <Button onClick={this.handlePreview}>Preview</Button>
        </ModalWrapper>
      );
    }

    const markdownHTML = { __html: marked(this.state.contentValue) };
    return (
      <ModalWrapper>
        <Label>Title</Label>
        <Title>{this.state.titleValue}</Title>
        <Label>Content</Label>
        <Content dangerouslySetInnerHTML={markdownHTML} />
        <Button onClick={this.handleEdit}>Edit</Button>
        <Button onClick={this.handleClose}>Close</Button>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  selectedNode: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;

