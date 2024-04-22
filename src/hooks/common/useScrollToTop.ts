import { useEffect, useRef } from 'react';

function useScrollToTop() {
  const toTopScrollref = useRef(null);

  useEffect(() => {
    // toTopScrollref.current.scrollIntoView({ behavior: 'smooth' });
    console.log(toTopScrollref);
  }, []);

  return { toTopScrollref };
}

export default useScrollToTop;
