import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from '../CustomToggleButton/index.module.scss';
import Button from 'react-bootstrap/Button';

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
