import { Button, Container, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { PromptBlock } from '@smart/types';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useGetBlocks } from '../hooks/blocks';
import BlockItemTableRow from '../components/blocks/BlockItemTableRow';
import { toast } from 'react-toastify';
import { Add } from '@mui/icons-material';
import BlockModal from '../components/blocks/BlockModal';
import ReadMoreModal from '../components/blocks/ReadMoreModal';
import { set } from 'mongoose';

const useStyles = {
  title: {
    fontWeight: 300,
    marginBottom: 2,
    textAlign: 'center',
  },
  tableHeader: {
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000000',
  },
};

const TABLEHEADERS = ['ID', 'Slug', 'Title', 'Content', 'Actions'];

const Blocks = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);

  const [blocks, setBlocks] = useState<PromptBlock[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<PromptBlock | null>(null);

  const { data, refetch } = useGetBlocks(page * rowsPerPage, rowsPerPage);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    setPage(page);
  };

  const handleRowsPageChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (data) {
      setBlocks(data.results);
      setCount(data.total);
    }
  }, [data]);

  const onReadMore = (block: PromptBlock) => {
    console.log('Blocks', block);
    setReadMoreExpanded(true);
    setSelectedBlock(block);
  };

  const handleAddClick = () => {
    setExpanded(true);
  };

  const onFormClose = () => {
    setSelectedBlock(null);
    setExpanded(false);
  };

  const onReadMoreClose = () => {
    setReadMoreExpanded(false);
  };

  const onFormSubmit = () => {
    setExpanded(false);
    refetch();
  };

  const onEditClick = (block: PromptBlock) => {
    setExpanded(true);
    setSelectedBlock(block);
  };

  return (
    <Container>
      <Typography variant="h2" sx={useStyles.title}>
        blocks
      </Typography>

      <Button variant="contained" onClick={() => handleAddClick()} sx={{ marginTop: 2 }}>
        <Add /> Add Block
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {TABLEHEADERS.map((header: string) => {
                return (
                  <TableCell width={1} sx={useStyles.tableHeader} key={header}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block: PromptBlock) => (
              <BlockItemTableRow key={block.id} block={block} onReadMore={onReadMore} editClick={onEditClick} />
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
      <BlockModal open={expanded} block={selectedBlock} onClose={onFormClose} onSubmit={onFormSubmit} />
      {selectedBlock && <ReadMoreModal open={readMoreExpanded} block={selectedBlock} onClose={onReadMoreClose} />}
    </Container>
  );
};

export default Blocks;
