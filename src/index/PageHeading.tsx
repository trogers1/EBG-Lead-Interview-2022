import { HTMLAttributes } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = HTMLAttributes<HTMLDivElement> & {
  text: string;
};

const PageHeading = ({ text, ...props }: Props) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <Typography
      variant="h3"
      component="h1"
      color="primary"
      {...props}
      sx={{
        textAlign: 'start',
        width: '100%',
        fontWeight: '500',
        margin: '1rem',
      }}
    >
      Job Posting Competition: {text}
    </Typography>
  </Box>
);

export default PageHeading;
