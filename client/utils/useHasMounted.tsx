import React, { useEffect, useState } from 'react';

// https://www.joshwcomeau.com/snippets/react-hooks/use-has-mounted/

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

interface ClientOnlyProps {
  children?: React.ReactNode;
}

// same logic as `useHasMounted`
export const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted ? <React.Fragment>{children}</React.Fragment> : null;
  // return null;
};
