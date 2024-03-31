import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { PromptBlock } from '@smart/types';
import React from 'react';
import { modalStyles } from '../../theme/styles';

type ReadMoreModalProps = {
  open: boolean;
  block: PromptBlock;
  onClose: () => void;
};

const useStyles = {
  modal: {
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
  },
};

const ReadMoreModal = ({ open, block, onClose }: ReadMoreModalProps) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="readMore-modal-title" aria-describedby="readMore-modal-description">
      <Box sx={{ ...modalStyles.modal, ...useStyles.modal }}>
        <Box sx={modalStyles.closeButtonContainer}>
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
