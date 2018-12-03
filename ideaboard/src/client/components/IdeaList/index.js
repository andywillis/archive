import React from 'react';

import IdeaForm from '../IdeaForm';

import style from './style.css';

function buildIdeaList(notes) {

  // For each idea return a new ideaForm component
  return notes.map((idea) => {

    const { id } = idea;

    return (
      <div
        key={id}
        data-id={id}
        role="presentation"
        className={style.idea}
      >
        <IdeaForm idea={idea} />
      </div>
    );

  });
}

function IdeaList({ ideas }) {
  if (ideas.length) {
    return (
      <div className={style.ideas}>
        {buildIdeaList(ideas)}
      </div>
    );
  }
  return <div className={style.empty}>List empty. Please add an idea.</div>;
}

export default IdeaList;
