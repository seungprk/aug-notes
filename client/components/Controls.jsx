import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Row = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
`;

const Controls = props => (
  <Row>
    <Button onClick={props.onAddNode}>Add Node</Button>
    <Button onClick={props.onAddLine}>Add Line</Button>
    <Button onClick={props.onViewNode}>View Node</Button>
    <Button onClick={props.onResetCam}>Reset Cam</Button>
  </Row>
);

Controls.propTypes = {
  onAddNode: PropTypes.func.isRequired,
  onAddLine: PropTypes.func.isRequired,
  onViewNode: PropTypes.func.isRequired,
  onResetCam: PropTypes.func.isRequired,
};

export default Controls;

