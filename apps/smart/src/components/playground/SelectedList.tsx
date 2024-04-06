import { Autocomplete, Box, Button, Checkbox, FormControl, Stack, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { blockStyles, formStyles, textStyles } from '../../theme/styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLLM } from '../../hooks/llms';
import { useEffect, useState } from 'react';
import { LLM_MODELS, Model, PromptBlock } from '@smart/types';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { addResponse, setGettingResponses } from '../../store/playground';
import { useDispatch } from 'react-redux';

interface PromptData {
  models: string[];
}

type SelectOption = {
  title: string;
  value: Model;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" color="secondary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="secondary" />;

const SelectedList = () => {
  const selectedBlocks = useAppSelector((state) => state.playground.selectedBlocks);

  const { handleSubmit } = useForm<PromptData>();
  const { sendToLLM, isPending } = useLLM();

  const [content, setContent] = useState<string | null>(null);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      if (!content) {
        toast.error('No content to send');
      } else {
        await Promise.all(
          selectedModels.map((model) =>
            sendToLLM(model, content).then((result) => {
              dispatch(addResponse({ model, response: result.response, responseTime: result.responseTime }));
              return { model, response: result.response };
            })
          )
        );
      }
    } catch (e) {
      toast.error('Error processing request');
    }
  };

  useEffect(() => {
    dispatch(setGettingResponses(isPending));
  }, [dispatch, isPending]);

  useEffect(() => {
    const llmOptions = LLM_MODELS.map((model) => ({ title: `${model.name} - (${model.host})`, value: model.name }));
    setOptions(llmOptions);
  }, []);

  useEffect(() => {
    const content = selectedBlocks.map((block) => block.content).join(' ');
    setContent(content);
  }, [selectedBlocks]);

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography variant="h2" sx={{ ...textStyles.title, fontSize: 30, textAlign: 'left' }}>
        selected blocks
      </Typography>

      <Box sx={blockStyles.blocksList}>
        <form onSubmit={handleSubmit(submitHandler)} style={{ gap: '2px', display: 'flex', flexDirection: 'row' }}>
          <Autocomplete
            multiple
            id="model-select"
            sx={{ width: '80%' }}
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
              <TextField sx={{ border: '1px solid black', color: 'black', borderRadius: 2 }} {...params} label="Models" placeholder="Select Models" />
            )}
          />

          <Button type="submit" variant="contained" sx={{ ...formStyles.customButton, width: 10, marginLeft: 'auto' }}>
            Send
          </Button>
        </form>
        <Typography variant="h5" sx={{ ...textStyles.title, fontSize: 30, fontStyle: 'italic', textAlign: 'left' }}>
          {selectedBlocks.length === 0 ? 'No blocks selected' : 'Prompt'}
        </Typography>
        {selectedBlocks.map((block) => (
          <SelectedBlockText block={block} />
        ))}
      </Box>
    </Stack>
  );
};

type SelectedBlockProps = {
  block: PromptBlock;
};

const SelectedBlockText = ({ block }: SelectedBlockProps) => {
  return <Box>{block.content}</Box>;
};

export default SelectedList;
