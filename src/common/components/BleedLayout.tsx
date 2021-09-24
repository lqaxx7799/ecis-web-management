import React from 'react';

type Props = {
  children: JSX.Element;
};

const BleedLayout = ({ children }: Props) => {
  return (
    <main className="wrapper">
      {children}
    </main>
  );
}

export default BleedLayout;
