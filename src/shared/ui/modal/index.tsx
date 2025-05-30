import React from 'react';
import { Button } from '../button';
import { cn } from '@/shared/lib/cn';
import { useAppSelector } from '@/app/store';

export const Modal = ({ isModal, setIsModal }) => {
  const backgroundRef = React.useRef(null);
  const modalRef = React.useRef(null);

  const darkModeClasses = useAppSelector(
    (state) => state.darkMode.darkModeClasses,
  );

  React.useEffect(() => {
    const modalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target) {
            entry.target.classList.add('translate-y-10');
          }
        } else {
          if (entry.target) {
            entry.target.classList.remove('-translate-y-60');
          }
        }
      });
    });
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target) {
            entry.target.classList.add('bg-black');
          }
        } else {
          entry.target.classList.remove('bg-black');
        }
      });
    });

    if (modalRef.current) {
      modalObserver.observe(modalRef.current);
    }

    if (backgroundRef.current) {
      backgroundObserver.observe(backgroundRef.current);
    }

    return () => {
      if (modalRef.current) {
        modalObserver.unobserve(modalRef.current);
      }
      if (backgroundRef.current) {
        backgroundObserver.unobserve(backgroundRef.current);
      }
    };
  }, [isModal]);

  // const deleteModal = () => {
  //   setIsResultModalView(false);
  // };

  if (isModal) {
    return (
      <div className="w-screen h-screen flex justify-center absolute z-50 transition-1s">
        <div
          ref={backgroundRef}
          className="w-full h-full absolute transition-1s opacity-50"
          onClick={() => setIsModal(false)}
        />
        <div
          ref={modalRef}
          className={cn(
            darkModeClasses,
            `absolute border-main-color p-8 rounded-md flex items-center justify-center flex-col gap-5 shadow-lg transition-1s -translate-y-60 bg-white`,
          )}
        >
          <p className="text-xl p-5 text-blue-400">나가주세요</p>

          <div className="flex gap-3">
            <Button
              label="닫기"
              variant={'alert'}
              onClick={() => setIsModal(false)}
            />
            <Button
              label="나가기"
              variant={'main'}
              onClick={() => (window.location.href = 'https://www.naver.com')}
            />
          </div>
        </div>
      </div>
    );
  }
};
