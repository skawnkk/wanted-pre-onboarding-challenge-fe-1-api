import React, { Component, ErrorInfo, ReactNode } from "react";

type State = {
  error: Error | null;
}

interface FallbackProps {
  error: State['error']
  resetErrorBoundary:()=>void
}

interface ErrorBoundaryProps {
  onReset:()=>void
  onError?:()=>void
  fallbackRender: (arg:FallbackProps)=> React.ReactNode
  children: React.ReactNode
}

const initialState = {error: null};

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = initialState

  resetErrorBoundary = (...args: Array<unknown>) => {
    const {onReset} = this.props
    onReset && onReset()
    this.reset()
  }

  reset() {
    this.setState(initialState)
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log('errorBoundary', error)
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const {onError} = this.props
    onError && onError()
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      if(this.props.fallbackRender!==undefined){
        return this.props.fallbackRender({
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        })
      }
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;