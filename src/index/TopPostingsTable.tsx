import { HTMLAttributes } from 'react';
import { SystemProps } from '@mui/system';
import pluralize from 'pluralize';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TopPostingsRankingFacet } from './types';
import { useGetTopPostingsRanking } from './queries';

type Props = HTMLAttributes<HTMLDivElement> &
  SystemProps & {
    rankingFacet: TopPostingsRankingFacet;
    rankingObject: string;
    jobSearchTerm: string;
    token?: string;
  };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '1rem',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'gradient(#fff, #000)',
    color: theme.palette.text.primary,
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    fontStyle: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const createGradient = (rowUniquePostings: number | null, topRowUniquePostings: number | null): string => {
  console.log({ rowUniquePostings, topRowUniquePostings });
  if (rowUniquePostings && topRowUniquePostings) {
    const fillPercentage = (rowUniquePostings / topRowUniquePostings) * 100;
    return `linear-gradient(90deg, rgba(218,242,254,1) 0%, rgba(218,242,254,1) ${fillPercentage}%${
      fillPercentage !== 100 ? `, rgba(255,255,255,1) ${fillPercentage + 0.1}%` : ''
    })`;
  }
  return '#000';
};

const TopPostingsTable = ({ rankingFacet, rankingObject, jobSearchTerm, token, ...props }: Props) => {
  const { data, error } = useGetTopPostingsRanking(jobSearchTerm, rankingFacet, token);

  if (!data) {
    return (
      <Grid container direction="column" justifyContent="space-between" spacing={3} mt="2rem" {...props}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" fontWeight="500">
            Top {pluralize(rankingObject)} Posting
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="p" color={error ? 'error' : 'primary'}>
            {error ? `Encountered an error retrieving top postings data: ${error.message}` : 'Loading...'}
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" justifyContent="space-between" spacing={3} mt="2rem" {...props}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: '500', paddingBottom: '1rem', borderBottom: '1px solid rgba(111, 111, 111, .3)' }}
        >
          Top {pluralize(rankingObject)} Posting
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{pluralize.singular(rankingObject)}</StyledTableCell>
                <StyledTableCell align="right">Total/Unique</StyledTableCell>
                <StyledTableCell align="right">Posting Intensity</StyledTableCell>
                <StyledTableCell align="right">Median Posting Duratiton</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.ranking.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    ':hover': { transform: 'scaleY(1.01)', boxShadow: `0 0 2px 2px rgba(165,194,209,0.5)` },
                    background: () => createGradient(row.unique_postings, data.ranking[0].unique_postings),
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total_postings || <i>Unknown</i>} / {row.unique_postings || <i>Unknown</i>}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.posting_intensity ? `${Math.round(row.posting_intensity)} : 1` : <i>Unknown</i>}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.median_posting_duration ?? <i>Unknown</i>}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TopPostingsTable;
