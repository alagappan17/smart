import { ModelResult } from '@smart/types';
import { TableRow, TableCell, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

type ResultTableRowProps = {
  result: ModelResult;
  onReadMore: (block: ModelResult) => void;
  deleteClick: (block: ModelResult) => void;
};

const ResultTableRow = ({ result, onReadMore, deleteClick }: ResultTableRowProps) => {
  const handleReadMore = () => {
    onReadMore(result);
  };

  const deleteClickHandler = () => {
    deleteClick(result);
  };

  return (
    <TableRow hover={true} style={{ cursor: 'pointer' }}>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{result.id}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{result.model}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>{result.responseTime}</TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000', whiteSpace: 'pre-wrap' }}>
        {result.prompt.slice(0, 150)} {result.prompt.length > 150 && '....'}
        {result.prompt.length > 150 && <Typography onClick={handleReadMore}>Read More</Typography>}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000', whiteSpace: 'pre-wrap' }}>
        {result.response.slice(0, 150)} {result.response.length > 150 && '....'}
        {result.response.length > 150 && <Typography onClick={handleReadMore}>Read More</Typography>}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', color: '#000000' }}>
        <DeleteOutlined onClick={deleteClickHandler} />
      </TableCell>
    </TableRow>
  );
};

export default ResultTableRow;
