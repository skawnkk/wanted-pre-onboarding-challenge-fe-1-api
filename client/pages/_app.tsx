import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {RecoilRoot} from 'recoil';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query'
import React, {ReactElement, ReactNode, Suspense} from "react";
import {NextPage} from "next";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import GlobalErrorBoundary from "../src/components/error/GlobalErrorBoundary";
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme'
import ErrorFallback from "../src/components/error/ErrorFallback";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const { Spinner } = chakraTheme.components
const theme = extendBaseTheme({
  components: {
    Spinner,
  },
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
      },
    },
  })

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <RecoilRoot>
      <ChakraBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <GlobalErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <ErrorFallback onReset={resetErrorBoundary} message={'global'}/>
                )}
              >
                {getLayout(
                  <Component {...pageProps} />
                )}
              </GlobalErrorBoundary>
            )}
          </QueryErrorResetBoundary>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </ChakraBaseProvider>
    </RecoilRoot>
  );
}