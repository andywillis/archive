import React from 'react';

import IdeaForm from '../IdeaForm';
import IdeaList from '../IdeaList';
import OrderIcons from '../OrderIcons';

import style from './style.css';

function App({ order, ideas }) {
  return (
    <div className={style.app}>
      <main className={style.main}>
        <section className={style.section}>
          <header className={style.sectionHeader}>New idea</header>
          <IdeaForm />
        </section>
        <section className={style.section}>
          <header className={style.sectionHeader}>Idea list
            <OrderIcons order={order} />
          </header>
          <IdeaList ideas={ideas} />
        </section>
      </main>
    </div>
  );
}

export default App;
