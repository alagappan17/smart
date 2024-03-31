import { Autocomplete, Box, Button, Checkbox, CircularProgress, Container, TextField, TextareaAutosize, Typography, styled } from '@mui/material';
import { formStyles, smartStyles } from '../theme/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLLM } from '../hooks/llms';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LLM_MODELS, Model } from '@smart/types';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="secondary" />;

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
  models: string[];
}

type SelectOption = {
  title: string;
  value: Model;
};

type ResponseStore = {
  model: string;
  response: string;
  responseTime?: number;
};

const Query = () => {
  const { register, handleSubmit, setValue } = useForm<PromptData>();
  const { sendToLLM, isPending } = useLLM();

  const [responses, setResponses] = useState<ResponseStore[]>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const submitHandler: SubmitHandler<PromptData> = async (data) => {
    try {
      await Promise.all(
        data.models.map((model) =>
          sendToLLM(model, data.content).then((result) => {
            setResponses((responses) => [...responses, { model, response: result.response, responseTime: result.responseTime }]);
            return { model, response: result.response };
          })
        )
      );
    } catch (e) {
      toast.error('Error processing request');
    }
  };

  useEffect(() => {
    const llmOptions = LLM_MODELS.map((model) => ({ title: `${model.name} - (${model.host})`, value: model.name }));
    setOptions(llmOptions);
  }, []);

  useEffect(() => {
    setValue('models', selectedModels);
  }, [selectedModels, setValue]);

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Typography variant="h2" sx={smartStyles.title}>
          Query the LLM
        </Typography>

        <Autocomplete
          multiple
          id="model-select"
          options={options}
          getOptionLabel={(option: SelectOption) => option.title}
          disableCloseOnSelect
          onChange={(event, value) => {
            setSelectedModels(value.map((item) => item.value));
          }}
          value={options.filter((option) => selectedModels.includes(option.value))}
          renderOption={(props, option: SelectOption, { selected }) => (
            <Typography {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.title}
            </Typography>
          )}
          renderInput={(params) => (
            <TextField sx={{ border: '1px solid black', color: 'black', borderRadius: 2 }} {...params} label="Checkboxes" placeholder="Favorites" />
          )}
        />

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

      {responses.length > 0 && (
        <Typography variant="h4" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
          Responses
        </Typography>
      )}

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
    </Container>
  );
};

export default Query;
