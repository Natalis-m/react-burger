import React from 'react';

import { useInView } from 'react-intersection-observer';

function menu() {
  const [refBun, inViewBuns] = useInView();
  const [refMain, inViewMain] = useInView();
  const [refSauce, inViewSauce] = useInView();

  return <div>menu</div>;
}

export default menu;
