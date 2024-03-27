import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  TextareaAutosize,
  styled,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import debounce from '../../hooks/debounce';
import { useCreateBlock, useCheckSlugAvailability } from '../../hooks/blocks';
import { PROMPT_TYPES, PromptTypes } from '@smart/types';
import slugify from 'slugify';

type BlockFormProps = {
  onSubmit: () => void;
};

type SelectOption = {
  label: string;
  value: string;
};

interface BlockFormData {
  title: string;
  type: PromptTypes;
  content: string;
  slug: string;
}

const Textarea = styled(TextareaAutosize)(
  () => `
        box-sizing: border-box;
        width: 95%;
        padding: 8px 12px;
        border-radius: 8px;
        margin: 10px;
      );`
);

const errorMessages = {
  slugTaken: 'Slug is already taken',
  slugAvailable: 'Slug is available',
};

const useStyles = {
  formInputField: {
    margin: '10px',
    width: '90%',
  },
  customButton: {
    marginTop: '10px',
    marginLeft: '8px',
  },
  formContainer: {
    width: '100%',
    height: 450,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    gap: 3,
  },
  loaderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenText: {
    color: 'green',
    fontSize: '12px',
    marginTop: '2px',
    marginLeft: '10px',
  },
  redText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '2px',
    marginLeft: '10px',
  },
};

const BlockForm = ({ onSubmit }: BlockFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<BlockFormData>();

  const { mutateAsync: checkSlugExists, isPending: checkingSlug } = useCheckSlugAvailability();
  const { mutateAsync: createBlock, isPending: creatingBlock } = useCreateBlock();

  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean>(false);
  const [typeOptions, setTypeOptions] = useState<SelectOption[]>([]);
  const [type, setType] = useState<PromptTypes | ''>('');
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    setTypeOptions(
      PROMPT_TYPES.map((type: string) => ({
        label: type,
        value: type,
      }))
    );
  }, []);

  const loadingState = checkingSlug || creatingBlock;

  const checkSlugAvailability = async (slug: string) => {
    const { available } = await checkSlugExists(slug);
    setIsSlugAvailable(available);

    if (!available) {
      setError('slug', { message: errorMessages.slugTaken });
    } else {
      clearErrors('slug');
    }
  };

  const checkSlug = useCallback(debounce(checkSlugAvailability, 500), []);

  const submitHandler: SubmitHandler<BlockFormData> = async (data) => {
    console.log('Data', data);
    await createBlock(data);
    onSubmit();
  };

  const convertToSlug = (text: string) => {
    return slugify(text, { lower: true, strict: false, replacement: ' ', remove: /[\s#?%^*&$@:]+/g, trim: true });
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as PromptTypes);
    setValue('type', event.target.value as PromptTypes);
  };

  const handleTitleChange = (value: string) => {
    const localSlug = convertToSlug(value);
    setTitle(value);
    setValue('title', value);
    setValue('slug', localSlug);
    setSlug(localSlug);
    checkSlug(localSlug);
  };

  const handleSlugChange = (value: string) => {
    const localSlug = convertToSlug(value);
    setSlug(localSlug);
    setValue('slug', localSlug);
    checkSlug(localSlug);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Container sx={useStyles.formContainer}>
        {loadingState && (
          <Box sx={useStyles.loaderBox}>
            <CircularProgress variant="indeterminate" />
          </Box>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <TextField
            onChange={(event) => handleTitleChange(event.target.value)}
            value={title}
            label={'Title'}
            variant="filled"
            size="small"
            sx={useStyles.formInputField}
            required
          />

          <TextField
            onChange={(e) => handleSlugChange(e.target.value)}
            value={slug}
            label={'Slug'}
            variant="filled"
            size="small"
            sx={useStyles.formInputField}
            error={!!errors.slug}
            helperText={errors.slug ? errorMessages.slugTaken : isSlugAvailable ? errorMessages.slugAvailable : ''}
            FormHelperTextProps={{
              sx: isSlugAvailable ? useStyles.greenText : useStyles.redText,
            }}
            required
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type-label" sx={{ color: 'black' }}>
              Type
            </InputLabel>
            <Select
              id="type"
              labelId="type-label"
              label="Type"
              sx={{ color: 'black', border: '1px solid black' }}
              value={type}
              onChange={handleTypeChange}
              required
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Textarea {...register('content')} placeholder="Enter Content" minRows={5} />
        </Box>

        <Button type="submit" variant="contained" disabled={loadingState || !!Object.keys(errors).length} sx={useStyles.customButton}>
          Submit
        </Button>
      </Container>
    </form>
  );
};

export default BlockForm;
