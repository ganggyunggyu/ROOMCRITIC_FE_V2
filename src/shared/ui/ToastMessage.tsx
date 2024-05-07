import React from 'react';

const ToastMessage = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current.classList.add('top-20');
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  React.useEffect(() => {
    if (visible) {
      ref.current.classList.remove('hidden');
      ref.current.classList.add('animate-toast-in');
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    } else {
      ref.current.classList.remove('animate-toast-in');
      ref.current.classList.add('animate-toast-out');
      setTimeout(() => {
        ref.current.classList.add('hidden');
      }, 500);
    }
  }, [visible, duration]);

  return (
    <div
      ref={ref}
      className='fixed top-0 left-1/2 transform -translate-x-1/2 bg-violet-400 text-white px-4 py-2 rounded-md shadow-md transition-all hidden'
      role='alert'
    >
      <p>{message}</p>
    </div>
  );
};

export default ToastMessage;
