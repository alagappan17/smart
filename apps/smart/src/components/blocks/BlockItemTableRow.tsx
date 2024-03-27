import { PromptBlock } from '@smart/types';
import { TableRow, TableCell } from '@mui/material';

type LessonItemTableRowProps = {
  block: PromptBlock;
};

const BlockItemTableRow = ({ block }: LessonItemTableRowProps) => {
  return (
    <TableRow hover={true} style={{ cursor: 'pointer' }}>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.id}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.slug}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.title}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{block.content}</TableCell>
    </TableRow>
  );
};

export default BlockItemTableRow;
