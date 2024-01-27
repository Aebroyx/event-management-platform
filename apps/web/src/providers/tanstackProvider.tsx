'use client';
import React, { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface TanstackProviderProps {
  children: ReactNode;
}

export const TanstackProvider: React.FC<TanstackProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};