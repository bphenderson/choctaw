"use client";
import React from 'react';
import { Tabs } from '../../page/FundPostPage/Tabs';

interface FundTabsWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class FundTabsErrorBoundary extends React.Component<
  FundTabsWrapperProps,
  { hasError: boolean }
> {
  constructor(props: FundTabsWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('FundTabs error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Tabs />;
    }

    return this.props.children;
  }
}

export const FundTabsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FundTabsErrorBoundary fallback={<Tabs />}>
      {children}
    </FundTabsErrorBoundary>
  );
};
