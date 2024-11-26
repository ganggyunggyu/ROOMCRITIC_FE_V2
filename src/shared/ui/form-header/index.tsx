import React from 'react';

type FormHeaderProps = {
  text: string;
};
export const FormHeader: React.FC<FormHeaderProps> = ({ text }) => {
  return (
    <div className="w-full p-3 md:p-10 ">
      <h2 className="text-center text-3xl font-bold leading-9 tracking-tight">{text}</h2>
    </div>
  );
};
