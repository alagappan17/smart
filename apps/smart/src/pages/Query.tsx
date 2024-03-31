import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Typography, styled } from '@mui/material';
import { formStyles, smartStyles } from '../theme/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLLM } from '../hooks/llms';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LLM_MODELS } from '@smart/types';

const Textarea = styled(TextareaAutosize)(
  () => `
          border: '1px solid black';
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
        );`
);

interface PromptData {
  content: string;
  model: string;
}

const Query = () => {
  const { register, handleSubmit } = useForm<PromptData>();
  const { sendToLLM, isPending } = useLLM();

  const [response, setResponse] = useState<string | null>(null);

  const submitHandler: SubmitHandler<PromptData> = async (data) => {
    try {
      const result = await sendToLLM(data.model, data.content);
      setResponse(result.response);
    } catch (e) {
      toast.error('Error processing request');
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Typography variant="h2" sx={smartStyles.title}>
          Mock Playground
        </Typography>

        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel id="model-label">Model</InputLabel>
          <Select {...register('model')} sx={{ color: 'black', border: '1px solid black' }} id="model" labelId="model-label" label="Model" required>
            {LLM_MODELS.map((model) => (
              <MenuItem key={model.name} value={model.name}>
                {model.name} - ({model.host})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Textarea {...register('content')} placeholder="Enter Content" minRows={5} sx={{ mt: 1, width: '98%' }} required />

        <Button type="submit" variant="contained" sx={{ ...formStyles.customButton, width: 100 }}>
          Send
        </Button>
      </form>
      {isPending && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress variant="indeterminate" color="error" />
        </Box>
      )}
      {response && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            Response
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', border: '1px solid black', padding: 1, borderRadius: 2 }}>
            {response}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Query;
