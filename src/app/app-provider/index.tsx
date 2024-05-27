import React from 'react';
import { cn } from '../../shared/lib/cn';
import { useAppSelector } from '../store';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useNavigationType, useLocation } from 'react-router-dom';

export const AppProvider = ({ children }) => {
  const { darkModeClasses } = useAppSelector((state) => state.darkMode);
  const location = useLocation();
  const navigationType = useNavigationType();
  const pageNation = navigationType === 'POP' ? 'page-transition--pop' : 'page-transition--push';

  return (
    <TransitionGroup
      childFactory={(child) =>
        React.cloneElement(child, {
          classNames: pageNation,
        })
      }
    >
      <CSSTransition timeout={1000} key={location.pathname}>
        <main
          className={cn(
            `${darkModeClasses} pt-12 transition-all flex flex-col items-center justify-center`,
          )}
        >
          {children}
        </main>
      </CSSTransition>
    </TransitionGroup>
  );
};
