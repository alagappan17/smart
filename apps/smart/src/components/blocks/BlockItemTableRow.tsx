import { PromptBlock } from '@smart/types';
import { TableRow, TableCell } from '@mui/material';

type LessonItemTableRowProps = {
  block: PromptBlock;
};

const BlockItemTableRow = ({ block }: LessonItemTableRowProps) => {
  return (
    <TableRow hover={true} style={{ cursor: 'pointer' }}>
      <TableCell sx={{ textAlign: 'center' }}>{block.id}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{block.title}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{block.slug}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{block.content}</TableCell>
    </TableRow>
  );
};

export default BlockItemTableRow;
