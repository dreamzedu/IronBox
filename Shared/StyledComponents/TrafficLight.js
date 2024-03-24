import styled, { css } from "styled-components";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  padding: 10px;

  ${(props) =>
    props.available &&
    css`
      background: #66e0ff;
    `}

  ${(props) =>
    props.limited &&
    css`
      background: #ffcc00;
    `}

    ${(props) =>
    props.unavailable &&
    css`
      background: #0066ff;
    `}

    ${(props) =>
            props.cancelled &&
            css`
          background: #808080;
    `}

`;

export default TrafficLight;