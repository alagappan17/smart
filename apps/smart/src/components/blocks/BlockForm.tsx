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
  Grid,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import debounce from '../../hooks/debounce';
import { useCreateBlock, useCheckSlugAvailability, useUpdateBlock } from '../../hooks/blocks';
import { PROMPT_TYPES, PromptBlock, PromptTypes } from '@smart/types';
import slugify from 'slugify';

type BlockFormProps = {
  onSubmit: () => void;
  block: PromptBlock | null;
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
        border: '1px solid black';
        width: 100%;
        padding: 8px 12px;
        border-radius: 8px;
      );`
);

const errorMessages = {
  slugTaken: 'Slug is already taken',
  slugAvailable: 'Slug is available',
};

const useStyles = {
  formInputField: {
    width: '100%',
  },
  customButton: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
    height: 325,
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

const BlockForm = ({ onSubmit, block }: BlockFormProps) => {
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
  const { mutateAsync: updateBlock, isPending: updatingBlock } = useUpdateBlock();

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

  useEffect(() => {
    if (block) {
      setValue('title', block.title);
      setValue('type', block.type);
      setValue('content', block.content);
      setValue('slug', block.slug);
      setTitle(block.title);
      setType(block.type);
      setSlug(block.slug);
    }
  }, [block, setValue]);

  const loadingState = checkingSlug || creatingBlock || updatingBlock;

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
    if (block) {
      await updateBlock({ ...data, id: block.id });
      onSubmit();
    } else {
      await createBlock(data);
      onSubmit();
    }
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

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={(event) => handleTitleChange(event.target.value)}
              value={title}
              label={'Title'}
              variant="filled"
              size="small"
              sx={useStyles.formInputField}
              required
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }} variant="filled">
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                sx={{ color: 'black', border: '1px solid black' }}
                id="type"
                labelId="type-label"
                label="Type"
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
          </Grid>
          <Grid item xs={12}>
            <Textarea {...register('content')} placeholder="Enter Content" minRows={5} sx={{ mt: 1, width: '95%' }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={loadingState || !!Object.keys(errors).length} sx={useStyles.customButton}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default BlockForm;
