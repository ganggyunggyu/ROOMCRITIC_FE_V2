import React from 'react';

export const ToastMessage = ({ message, duration = 3000 }) => {
  let toastTimer = null;
  const [visible, setVisible] = React.useState(true);
  const toastContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    toastContainerRef.current.classList.add('top-20');
    toastTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(toastTimer);
    };
  }, [duration]);

  React.useEffect(() => {
    if (visible) {
      toastContainerRef.current.classList.remove('hidden');
      toastContainerRef.current.classList.add('animate-toast-in');
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    } else {
      toastContainerRef.current.classList.remove('animate-toast-in');
      toastContainerRef.current.classList.add('animate-toast-out');
      setTimeout(() => {
        toastContainerRef.current.classList.add('hidden');
      }, 500);
    }
  }, [visible, duration]);

  return (
    <figure
      ref={toastContainerRef}
      className="fixed p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-400 text-white rounded-md shadow-md transition-all z-50 flex items-center justify-center "
    >
      {message}
    </figure>
  );
};
