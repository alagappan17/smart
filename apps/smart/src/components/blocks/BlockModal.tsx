import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import BlockForm from './BlockForm';
import { PromptBlock } from '@smart/types';

type BlockModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  block: PromptBlock | null;
};

const useStyles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '50%',
    width: '50%',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 12,
    borderRadius: 10,
    p: 4,
  },
  closeButtonContainer: {
    // New styles for positioning the close button
    position: 'absolute',
    right: 10,
    top: 10,
  },
};

const BlockModal = ({ open, onClose, onSubmit, block }: BlockModalProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="block-modal-title" aria-describedby="block-modal-description">
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
