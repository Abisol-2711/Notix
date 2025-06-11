import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const getDevice = (width) => {
    if (width >= 1024) return 'desktop';
    if (width >= 768) return 'tablet';
    return 'mobile';
  };

  const [breakpoint, setBreakpoint] = useState(getDevice(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getDevice(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
