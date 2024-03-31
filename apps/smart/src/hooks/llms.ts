import { useMutation } from '@tanstack/react-query';
import { axios } from '../query';
import { COHERE_MODELS, GOOGLE_MODELS, OLLAMA_MODELS, OPENAI_MODELS } from '@smart/types';
import { toast } from 'react-toastify';
import { useStoreResult } from './storage';
import { useCallback, useEffect, useState } from 'react';

const client = axios.client;

type UseOllamaParams = {
  model: string;
  content: string;
};

type LLMResponse = {
  prompt: string;
  response: string;
  model: string;
  responseTime?: number;
};

export const useLLM = () => {
  const { mutateAsync: storeResult } = useStoreResult();
  const { mutateAsync: sendToOllama, isPending: sendingToOllama } = useQueryOllama();
  const { mutateAsync: sendToGoogle, isPending: sendingToGoogle } = useQueryGoogle();
  const { mutateAsync: sendToCohere, isPending: sendingToCohere } = useQueryCohere();
  const { mutateAsync: sendToOpenAi, isPending: sendingToOpenAi } = useQueryOpenAi();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (sendingToOllama || sendingToGoogle || sendingToCohere || sendingToOpenAi) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [sendingToOllama, sendingToGoogle, sendingToCohere, sendingToOpenAi]);

  type StorageResult = {
    prompt: string;
    response: string;
    model: string;
    responseTime?: number;
  };

  const sendToLLM = useCallback(
    async (model: string, content: string): Promise<LLMResponse> => {
      let response;

      try {
        const start = Date.now();

        if (OLLAMA_MODELS.includes(model)) {
          response = await sendToOllama({ model, content });
        } else if (OPENAI_MODELS.includes(model)) {
          response = await sendToOpenAi(content);
        } else if (GOOGLE_MODELS.includes(model)) {
          response = await sendToGoogle(content);
        } else if (COHERE_MODELS.includes(model)) {
          response = await sendToCohere(content);
        } else {
          response = null;
        }

        const end = Date.now();
        const responseTime = Math.round(end - start);

        if (response) {
          toast.success('Response received');
          const data: StorageResult = {
            prompt: content,
            response: response.response,
            model,
            responseTime,
          };

          storeResult(data).catch((err) => {
            toast.error(`Error Storing Result: ${err}`);
            return data;
          });

          return data;
        } else {
          toast.error('No response received');
          return {
            prompt: content,
            response: 'No response received',
            model,
            responseTime,
          };
        }
      } catch (error) {
        toast.error(`Error sending to LLM: ${error}`);
        return {
          prompt: content,
          response: 'Error sending to LLM',
          model,
          responseTime: 0,
        };
      }
    },
    [storeResult, sendToCohere, sendToGoogle, sendToOllama, sendToOpenAi]
  );
  return { sendToLLM, isPending: loadingState };
};

export const useQueryOllama = () => {
  const mutation = useMutation({
    mutationFn: ({ model, content }: UseOllamaParams) => client.post('/llm/ollama', { prompt: content }, { params: { model } }).then((res) => res.data),
  });

  return mutation;
};

export const useQueryGoogle = () => {
  const mutation = useMutation({
    mutationFn: (content: string) => client.post('/llm/google', { prompt: content }).then((res) => res.data),
  });

  return mutation;
};

export const useQueryCohere = () => {
  const mutation = useMutation({
    mutationFn: (content: string) => client.post('/llm/cohere', { prompt: content }).then((res) => res.data),
  });

  return mutation;
};

export const useQueryOpenAi = () => {
  const mutation = useMutation({
    mutationFn: (content: string) => client.post('/llm/openai', { prompt: content }).then((res) => res.data),
  });

  return mutation;
};
