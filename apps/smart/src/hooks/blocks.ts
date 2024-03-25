import { useQuery } from '@tanstack/react-query';
import { axios } from '../query';
import { PromptBlock } from '@smart/types';

const client = axios.client;

type GetBlocksResponse = {
  total: number;
  results: PromptBlock[];
};

export const useGetBlocks = (skip = 0, limit = 100) => {
  const queryKey = ['blocks'];

  const query = useQuery<GetBlocksResponse>({
    queryKey,
    queryFn: () => client.get('/blocks').then((res) => res.data),
  });

  return query;
};
