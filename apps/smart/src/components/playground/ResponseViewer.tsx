import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { blockStyles, textStyles } from '../../theme/styles';

const ResponseViewer = () => {
  const gettingResponse = useAppSelector((state) => state.playground.gettingResponses);
  const responses = useAppSelector((state) => state.playground.responses);

  return (
    <>
      <Typography variant="h2" sx={{ ...textStyles.title, fontSize: 30, textAlign: 'left' }}>
        responses
      </Typography>
      <Stack sx={blockStyles.blocksList}>
        {responses.length > 0 &&
          responses.map((response) => (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', padding: 1, borderRadius: 2 }}>
                {response.model} - {response.responseTime}ms
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', border: '1px solid black', padding: 1, borderRadius: 2 }}>
                {response.response}
              </Typography>
            </Box>
          ))}

        {gettingResponse && (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress variant="indeterminate" color="error" />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default ResponseViewer;
