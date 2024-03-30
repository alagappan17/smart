import { useMutation, useQuery } from '@tanstack/react-query';
import { axios } from '../query';
import { PromptBlock, CreatePromptBlockDTO } from '@smart/types';

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

export const useCreateBlock = () => {
  const mutation = useMutation({ mutationFn: (item: CreatePromptBlockDTO) => client.post('/blocks', item).then((res) => res.data) });

  return mutation;
};

export const useUpdateBlock = () => {
  const mutation = useMutation({
    mutationFn: (item: PromptBlock) => client.put(`/blocks/${item.id}`, item).then((res) => res.data),
  });

  return mutation;
};

export const useDeleteBlock = () => {
  const mutation = useMutation({
    mutationFn: (item: PromptBlock) => client.delete(`/blocks/${item.id}`).then((res) => res.data),
  });

  return mutation;
};

export const useCheckSlugAvailability = () => {
  return useMutation({
    mutationFn: (slug: string) => {
      return client.get(`/blocks/${slug}/available`).then((res) => res.data);
    },
  });
};
