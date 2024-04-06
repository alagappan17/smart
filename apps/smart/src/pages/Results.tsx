import { Container, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { textStyles } from '../theme/styles';
import { ModelResult } from '@smart/types';
import { useState, ChangeEventHandler, useEffect } from 'react';
import { toast } from 'react-toastify';
import DeleteDialog from '../components/shared/DeleteDialog';
import ResultTableRow from '../components/results/ResultTableRow';
import { useDeleteResult, useGetResults } from '../hooks/results';
import ShowMoreModal from '../components/results/ShowMoreModal';

const TABLEHEADERS = ['ID', 'Model', 'Response Time', 'Prompt', 'Response', 'Actions'];

const Results = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [count, setCount] = useState(0);

  const [blocks, setBlocks] = useState<ModelResult[]>([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const [selectedResult, setSelectedResult] = useState<ModelResult | null>(null);

  const { data, refetch } = useGetResults(page * rowsPerPage, rowsPerPage);
  const { mutateAsync: deleteResult } = useDeleteResult();

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

  const onReadMore = (result: ModelResult) => {
    setReadMoreExpanded(true);
    setSelectedResult(result);
  };

  const onReadMoreClose = () => {
    setReadMoreExpanded(false);
  };

  const onDeleteClick = (result: ModelResult) => {
    setDeleteDialog(true);
    setSelectedResult(result);
  };

  const onDeleteConfirm = async () => {
    if (selectedResult)
      try {
        await deleteResult(selectedResult);
        toast.success('Result Deleted Successfully');
        setDeleteDialog(false);
        refetch();
      } catch (error) {
        toast.error('Error deleting result');
      }
  };

  return (
    <Container>
      <Typography variant="h2" sx={textStyles.title}>
        results
      </Typography>

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
            {blocks.map((result: ModelResult) => (
              <ResultTableRow key={result.id} result={result} onReadMore={onReadMore} deleteClick={onDeleteClick} />
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
      <DeleteDialog content="Are you sure?" title="Delete Block" open={deleteDialog} onClose={() => setDeleteDialog(false)} onConfirm={onDeleteConfirm} />
      {selectedResult && (
        <ShowMoreModal
          open={readMoreExpanded}
          heading={`${selectedResult.model} | ${selectedResult.id}`}
          prompt={selectedResult.prompt}
          response={selectedResult.response}
          onClose={onReadMoreClose}
        />
      )}
    </Container>
  );
};

export default Results;
