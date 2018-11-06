import React from 'react';

import style from './style.css';

function Loader() {
  return (
    <div className={style.loader}>
      <div className={style.bounce}>&nbsp;</div>
    </div>
  );
}

export default Loader;
