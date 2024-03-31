import { Close } from '@mui/icons-material';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { modalStyles } from '../../theme/styles';

type ShowMoreModalProps = {
  open: boolean;
  heading: string;
  prompt: string;
  response: string;
  onClose: () => void;
};

const useStyles = {
  modal: {
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
  },
};

const ShowMoreModal = ({ open, heading, prompt, response, onClose }: ShowMoreModalProps) => {
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
          <Typography variant="h4">{heading}</Typography>
          <Typography variant="h5">Prompt: </Typography>
          <Typography variant="body1">{prompt}</Typography>
          <Typography variant="h5">Response: </Typography>
          <Typography variant="body1">{response}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShowMoreModal;
