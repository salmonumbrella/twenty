import { SseClientContext } from '@/sse-db-event/contexts/SseClientContext';
import { useSseClient } from '@/sse-db-event/hooks/useSseClient.util';
import { type ReactNode } from 'react';

type SSEProviderProps = {
  children: ReactNode;
};

export const SSEProvider = ({ children }: SSEProviderProps) => {
  const { sseClient } = useSseClient();

  return (
    <SseClientContext.Provider value={sseClient}>
      {children}
    </SseClientContext.Provider>
  );
};
