import { HTMLAttributes } from 'react';
import { styled } from '@mui/system';

type Props = HTMLAttributes<HTMLDivElement> & {
  backgroundColor?: string;
};

const StyledDiv = styled('div')`
  height: 100%;
  padding-bottom: 2rem;
`;

const FullHeight = ({ backgroundColor = 'white', ...props }: Props) => (
  <StyledDiv
    sx={{
      backgroundColor: backgroundColor,
    }}
    {...props}
  />
);

export default FullHeight;
