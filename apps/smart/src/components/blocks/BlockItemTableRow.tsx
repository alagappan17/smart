import { PromptBlock } from '@smart/types';
import { TableRow, TableCell, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

type LessonItemTableRowProps = {
  block: PromptBlock;
  onReadMore: (block: PromptBlock) => void;
  editClick: (block: PromptBlock) => void;
};

const BlockItemTableRow = ({ block, onReadMore, editClick }: LessonItemTableRowProps) => {
  const handleReadMore = () => {
    onReadMore(block);
  };

  const editClickHandler = () => {
    editClick(block);
  };

  return (
    <TableRow hover={true} style={{ cursor: 'pointer' }}>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.id}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.slug}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.title}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>
        {block.content.slice(0, 150)} {block.content.length > 150 && '....'}
        {block.content.length > 150 && <Typography onClick={handleReadMore}>Read More</Typography>}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>
        <EditOutlined onClick={editClickHandler} />
      </TableCell>
    </TableRow>
  );
};

export default BlockItemTableRow;
