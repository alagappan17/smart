import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { PromptBlock } from '@smart/types';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useGetBlocks } from '../hooks/blocks';
import BlockItemTableRow from '../components/blocks/BlockItemTableRow';

const useStyles = {
  title: {
    fontWeight: 300,
    marginBottom: 2,
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: '800',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
};

const TABLEHEADERS = ['ID', 'Slug', 'Title', 'Content'];

const Blocks = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);

  const [blocks, setBlocks] = useState<PromptBlock[]>([]);

  const { data } = useGetBlocks(page * rowsPerPage, rowsPerPage);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleRowsPageChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (data) {
      setBlocks(data.results);
      setCount(data.total);
    }
  }, [data]);

  return (
    <Container>
      <Typography variant="h2" sx={useStyles.title}>
        blocks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {TABLEHEADERS.map((header: string) => {
                return (
                  <TableCell sx={useStyles.tableHeader} key={header}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block: PromptBlock) => (
              <BlockItemTableRow key={block.id} block={block} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                component="td"
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 50, 100]}
                colSpan={5}
                count={count}
                onRowsPerPageChange={handleRowsPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Blocks;
