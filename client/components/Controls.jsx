import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Row = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Controls = props => (
  <Row>
    <button onClick={props.onAddNode}>Add Node</button>
    <button onClick={props.onAddLine}>Add Line</button>
  </Row>
);

Controls.propTypes = {
  onAddNode: PropTypes.func.isRequired,
  onAddLine: PropTypes.func.isRequired,
};

export default Controls;

