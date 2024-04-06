import { Button, Container, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { PromptBlock } from '@smart/types';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useDeleteBlock, useGetBlocks } from '../hooks/blocks';
import BlockItemTableRow from '../components/blocks/BlockItemTableRow';
import { Add } from '@mui/icons-material';
import BlockModal from '../components/blocks/BlockModal';
import ReadMoreModal from '../components/blocks/ReadMoreModal';
import { toast } from 'react-toastify';
import DeleteDialog from '../components/shared/DeleteDialog';
import { textStyles } from '../theme/styles';

const TABLEHEADERS = ['Created', 'Slug', 'Title', 'Content', 'Actions'];

const Blocks = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);

  const [blocks, setBlocks] = useState<PromptBlock[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<PromptBlock | null>(null);

  const { data, refetch } = useGetBlocks(page * rowsPerPage, rowsPerPage);
  const { mutateAsync: deleteBlock } = useDeleteBlock();

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
    setSelectedBlock(null);
  };

  const onFormSubmit = () => {
    setExpanded(false);
    refetch();
  };

  const onEditClick = (block: PromptBlock) => {
    setExpanded(true);
    setSelectedBlock(block);
  };

  const onDeleteClick = (block: PromptBlock) => {
    setDeleteDialog(true);
    setSelectedBlock(block);
  };

  const onDeleteConfirm = async () => {
    if (selectedBlock)
      try {
        await deleteBlock(selectedBlock);
        toast.success('Block Deleted Successfully');
        setDeleteDialog(false);
        refetch();
      } catch (error) {
        toast.error('Error deleting block');
      }
  };

  return (
    <Container>
      <Typography variant="h2" sx={textStyles.title}>
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
                  <TableCell width={1} sx={textStyles.tableHeader} key={header}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((block: PromptBlock) => (
              <BlockItemTableRow key={block.id} block={block} onReadMore={onReadMore} editClick={onEditClick} deleteClick={onDeleteClick} />
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
      <DeleteDialog content="Are you sure?" title="Delete Block" open={deleteDialog} onClose={() => setDeleteDialog(false)} onConfirm={onDeleteConfirm} />
      {selectedBlock && (
        <ReadMoreModal
          open={readMoreExpanded}
          heading={`${selectedBlock.slug} | ${selectedBlock.title}`}
          content={selectedBlock.content}
          onClose={onReadMoreClose}
        />
      )}
    </Container>
  );
};

export default Blocks;
