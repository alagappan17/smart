import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type DeleteDialogProps = {
  open: boolean;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteDialog = ({ open, title, content, confirmText, cancelText, onClose, onConfirm }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" sx={{ backgroundColor: 'white', color: 'black' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'white' }}>
        <DialogContentText sx={{ color: 'black' }}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'white', color: 'black' }}>
        <Button autoFocus onClick={onClose}>
          {cancelText || 'Cancel'}
        </Button>
        <Button onClick={onConfirm} sx={{ color: 'red', border: '1px solid red' }}>
          {confirmText || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
