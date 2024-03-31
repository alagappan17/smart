import { useMutation } from '@tanstack/react-query';
import { axios } from '../query';

const client = axios.client;

type StorageResult = {
  prompt: string;
  response: string;
  model: string;
  responseTime?: number;
};

export const useStoreResult = () => {
  return useMutation({
    mutationFn: (data: StorageResult) => {
      return client.post<{ message: string }>('/storage/result', data).then((res) => res.data);
    },
  });
};
