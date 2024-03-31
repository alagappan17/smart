import { PromptBlock } from '@smart/types';
import { TableRow, TableCell, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

type LessonItemTableRowProps = {
  block: PromptBlock;
  onReadMore: (block: PromptBlock) => void;
  editClick: (block: PromptBlock) => void;
  deleteClick: (block: PromptBlock) => void;
};

const BlockItemTableRow = ({ block, onReadMore, editClick, deleteClick }: LessonItemTableRowProps) => {
  const handleReadMore = () => {
    onReadMore(block);
  };

  const editClickHandler = () => {
    editClick(block);
  };

  const deleteClickHandler = () => {
    deleteClick(block);
  };

  return (
    <TableRow hover={true} style={{ cursor: 'pointer' }}>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{new Date(block.created).toString()}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.slug}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.title}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000', whiteSpace: 'pre-wrap' }}>
        {block.content.slice(0, 150)} {block.content.length > 150 && '....'}
        {block.content.length > 150 && <Typography onClick={handleReadMore}>Read More</Typography>}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>
        <EditOutlined onClick={editClickHandler} />
        <DeleteOutlined onClick={deleteClickHandler} />
      </TableCell>
    </TableRow>
  );
};

export default BlockItemTableRow;
