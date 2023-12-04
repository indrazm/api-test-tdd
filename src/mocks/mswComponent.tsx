'use client';

import React, { useEffect, useState } from 'react';

interface MSWProps {
  children: React.ReactNode;
}

export const MSW: React.FC<MSWProps> = ({ children }) => {
  const isDev = process.env.NEXT_PUBLIC_TEST_ENABLE === 'true';
  const [isReady, setIsReady] = useState(false);

  async function init() {
    if (isDev) {
      const initMock = await import('@/mocks').then((res) => res.InitMocks);
      await initMock();
      setIsReady(true);
    }
  }

  useEffect(() => {
    if (!isReady) init();
  }, [isReady]);

  return <div>{children}</div>;
};
