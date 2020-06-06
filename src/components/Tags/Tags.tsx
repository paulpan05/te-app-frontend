import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import styles from '../Button/index.module.scss';

interface TagsDivProps {
  tags: string[];
  setTag: Function; // (tag: string, boolean)
  initialActiveTags?: string[]; // holds strings of initially active tags
}

const TagsDiv: React.FC<TagsDivProps> = ({ tags, setTag, initialActiveTags }) => {
  const init = {};
  tags.map((tag) => (init[tag] = initialActiveTags?.includes(tag)));

  const [activeTags, setActiveTags] = useState(init);

  return (
    <div>
      {tags.map((tag, i) => {
        return (
          <Button
            key={i}
            onClick={() => {
              const activeTagsCopy = Object.create(activeTags);
              activeTagsCopy[tag] = !activeTagsCopy[tag];
              setActiveTags(activeTagsCopy);
              setTag(tag, activeTagsCopy[tag]);
            }}
            className={activeTags[tag] ? styles.toggleButtonActive : styles.toggleButtonInactive}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
};

export default connect()(TagsDiv);
