import { Container, Typography, Grid } from '@mui/material';
import { textStyles } from '../theme/styles';
import BlockList from '../components/playground/BlockList';
import SelectedList from '../components/playground/SelectedList';
import ResponseViewer from '../components/playground/ResponseViewer';

const useStyles = {
  mainContainer: {
    gap: 3,
    width: '100%',
    textAlign: 'center',
  },
};

const Playground = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" sx={textStyles.title}>
        Playground
      </Typography>
      <Grid container sx={useStyles.mainContainer}>
        <Grid item xs={4}>
          <BlockList />
        </Grid>
        <Grid item xs={4}>
          <SelectedList />
        </Grid>
        <Grid item xs={3}>
          <ResponseViewer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Playground;
