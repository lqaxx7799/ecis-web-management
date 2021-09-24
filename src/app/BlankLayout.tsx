import React from 'react';

type Props = {
  children: JSX.Element;
};

const BlankLayout = ({ children }: Props) => {
  return (
    <div>{children}</div>
  );
}

export default BlankLayout;