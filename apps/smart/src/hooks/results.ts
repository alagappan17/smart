import { useMutation, useQuery } from '@tanstack/react-query';
import { axios } from '../query';
import { ModelResult } from '@smart/types';

const client = axios.client;

type GetResultsResponse = {
  total: number;
  results: ModelResult[];
};

export const useGetResults = (skip = 0, limit = 100) => {
  const queryKey = ['results'];

  const query = useQuery<GetResultsResponse>({
    queryKey,
    queryFn: () =>
      client
        .get('/storage/results', {
          params: {
            skip,
            limit,
          },
        })
        .then((res) => res.data),
  });

  return query;
};

export const useDeleteResult = () => {
  const mutation = useMutation({
    mutationFn: (item: ModelResult) => client.delete(`/storage/results/${item.id}`).then((res) => res.data),
  });

  return mutation;
};
