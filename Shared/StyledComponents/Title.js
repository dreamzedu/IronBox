import styled, { css } from "styled-components";

const Title = styled.Text`
    font-weight: bold;

    ${(props) =>
        props.small &&
        css`
            font-size: 18;
        `
    }

    ${(props) =>
        props.medium &&
        css`
            font-size: 28;
        `
    }

    ${(props) => 
        props.large &&
        css`
            font-size: 38;
        `
    }

    ${(props) => 
        props.xl &&
        css`            
        font-size: 48,
        `
    }
`;

export default Title;

