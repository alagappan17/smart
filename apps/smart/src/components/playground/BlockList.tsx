import { useEffect, useState } from 'react';
import { useGetBlocks } from '../../hooks/blocks';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { PromptBlock } from '@smart/types';
import { Add, AddOutlined, DeleteOutlined } from '@mui/icons-material';
import ReadMoreModal from '../blocks/ReadMoreModal';
import { blockStyles, textStyles } from '../../theme/styles';
import { useDispatch } from 'react-redux';
import { addBlock, removeBlock } from '../../store/playground';
import BlockModal from '../blocks/BlockModal';

const BlockList = () => {
  const { data, refetch: refetchBlocks } = useGetBlocks();
  const [blocks, setBlocks] = useState<PromptBlock[]>([]);
  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<PromptBlock | null>(null);
  const [formModalExpanded, setFormModalExpanded] = useState(false);

  const onReadMoreClose = () => {
    setReadMoreExpanded(false);
    setSelectedBlock(null);
  };

  const onBlockModalClose = () => {
    setFormModalExpanded(false);
  };

  const onBlockModalSubmit = () => {
    setFormModalExpanded(false);
    refetchBlocks();
  };

  const onReadMore = (block: PromptBlock) => {
    setReadMoreExpanded(true);
    setSelectedBlock(block);
  };

  useEffect(() => {
    if (data) {
      setBlocks(data.results);
    }
  }, [data]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ ...textStyles.title, fontSize: 30, textAlign: 'left' }}>
          blocks
        </Typography>
        <Tooltip title="Add block">
          <Add sx={{ fontSize: 25, margin: 1, borderRadius: 10, cursor: 'pointer' }} onClick={() => setFormModalExpanded(true)} />
        </Tooltip>
      </Box>
      <Box sx={blockStyles.blocksList}>
        {blocks.map((block) => (
          <SingleBlock block={block} onReadMore={onReadMore} />
        ))}
        {selectedBlock && (
          <ReadMoreModal
            open={readMoreExpanded}
            heading={`${selectedBlock.slug} | ${selectedBlock.title}`}
            content={selectedBlock.content}
            onClose={onReadMoreClose}
          />
        )}
        <BlockModal open={formModalExpanded} onSubmit={onBlockModalSubmit} onClose={onBlockModalClose} />
      </Box>
    </>
  );
};

type SingleBlockProps = { block: PromptBlock; onReadMore: (block: PromptBlock) => void };

const SingleBlock = ({ block, onReadMore }: SingleBlockProps) => {
  const [isBlockSelected, setIsBlockSelected] = useState(false);

  const handleReadMore = () => {
    onReadMore(block);
  };

  const dispatch = useDispatch();

  const handleBlockAction = () => {
    if (isBlockSelected) {
      dispatch(removeBlock(block));
      setIsBlockSelected(false);
    } else {
      dispatch(addBlock(block));
      setIsBlockSelected(true);
    }
  };

  const READ_MORE_LIMIT = 200;

  return (
    <Stack sx={{ ...blockStyles.block, backgroundColor: '#f7f7f7' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {block.title} ({block.type})
        </Typography>
        <Button
          sx={{ ...blockStyles.iconButton, borderColor: isBlockSelected ? 'red' : 'green', color: isBlockSelected ? 'red' : 'green' }}
          onClick={handleBlockAction}
        >
          {isBlockSelected ? <DeleteOutlined /> : <AddOutlined />}
        </Button>
      </Box>
      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
        {block.slug}
      </Typography>
      <Box>
        {block.content.slice(0, READ_MORE_LIMIT)} {block.content.length > READ_MORE_LIMIT && '....'}
        {block.content.length > READ_MORE_LIMIT && (
          <Typography onClick={handleReadMore} sx={{ cursor: 'pointer' }}>
            Read More
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default BlockList;
