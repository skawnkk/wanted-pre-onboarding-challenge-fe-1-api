import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {RecoilRoot} from 'recoil';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary, useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {isAxiosError} from "axios";
import {createStandaloneToast} from '@chakra-ui/react'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import GlobalErrorBoundary from "../src/components/error/GlobalErrorBoundary";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const {ToastContainer, toast} = createStandaloneToast();

function queryErrorHandler(error: string): void {
  const id = 'react-query-error';
  toast.closeAll();
  toast({ id, title:error, status: 'error', variant: 'subtle', isClosable: true, position:'top'});
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        suspense: true,
      }
    },
  })

  // onError: (error) => {
  //   if (isAxiosError(error)) {
  //     queryErrorHandler(error.response?.data.details || error.message)
  //   }
  // }

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <GlobalErrorBoundary
              //onReset={reset}
              // fallbackRender={({ resetErrorBoundary }) => (
              //   <div>
              //     There was an error!
              //     <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              //   </div>
              // )}
            >
              {getLayout(
                <>
                  <Component {...pageProps} />
                  {/*<ToastContainer/>*/}
                </>
              )}
            </GlobalErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </RecoilRoot>
  );
}