import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { PromptBlock } from '@smart/types';
import React from 'react';

type ReadMoreModalProps = {
  open: boolean;
  block: PromptBlock;
  onClose: () => void;
};

const useStyles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 500,
    width: '50%',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 12,
    borderRadius: 10,
    p: 4,
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
};

const ReadMoreModal = ({ open, block, onClose }: ReadMoreModalProps) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="readMore-modal-title" aria-describedby="readMore-modal-description">
      <Box sx={useStyles.modal}>
        <Box sx={useStyles.closeButtonContainer}>
          <IconButton
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              onClose();
            }}
            data-testid="close-drawer"
          >
            <Close color="secondary" />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4">
            {block.slug} | {block.title}
          </Typography>
          <Typography variant="body1">{block.content}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReadMoreModal;
