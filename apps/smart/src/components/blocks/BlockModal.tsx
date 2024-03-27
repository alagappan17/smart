import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import BlockForm from './BlockForm';

type BlockModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
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
};

const BlockModal = ({ open, onClose, onSubmit }: BlockModalProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="block-modal-title" aria-describedby="block-modal-description">
      <Box sx={useStyles.modal}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
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
        <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center' }}>
          New Block
        </Typography>

        <BlockForm onSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default BlockModal;
