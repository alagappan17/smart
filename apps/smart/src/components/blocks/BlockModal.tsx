import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import BlockForm from './BlockForm';
import { PromptBlock } from '@smart/types';
import { modalStyles } from '../../theme/styles';

type BlockModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  block: PromptBlock | null;
};

const BlockModal = ({ open, onClose, onSubmit, block }: BlockModalProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="block-modal-title" aria-describedby="block-modal-description">
      <Box sx={modalStyles.modal}>
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
        <Box>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            New Block
          </Typography>
          <BlockForm onSubmit={handleSubmit} block={block} />
        </Box>
      </Box>
    </Modal>
  );
};

export default BlockModal;
