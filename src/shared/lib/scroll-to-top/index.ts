export const scrollToTop = () => {
  window.scroll({
    top: 0,
    left: 0,
  });
};
export const scrollToTopSmooth = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
