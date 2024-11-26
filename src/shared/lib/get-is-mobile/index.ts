export const getIsMobile = (): boolean => {
  return window.matchMedia('(max-width: 768px)').matches;
};
