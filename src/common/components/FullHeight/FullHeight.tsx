import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type Props = HTMLAttributes<HTMLDivElement> & {
  backgroundColor?: string;
};

const StyledDiv = styled.div`
  height: 100%;
  padding-bottom: 2rem;
`;

const FullHeight = ({ backgroundColor = 'white', ...props }: Props) => (
  <StyledDiv
    css={css`
      background-color: ${backgroundColor};
    `}
    {...props}
  />
);

export default FullHeight;
