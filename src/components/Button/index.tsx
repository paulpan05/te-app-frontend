import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import styles from './index.module.scss';

interface CustomToggleButtonProps {
  children: string;
  toggledInitial?: boolean;
  value: number;
  tags: string[];
  setTag: Function; // (tag: string, boolean)
}

const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({
  children,
  toggledInitial = false,
  value,
  tags,
  setTag,
}) => {
  const [toggled, setToggled] = useState(toggledInitial);
  return (
    <Button
      key={value}
      onClick={() => {
        setToggled(!toggled);
        setTag(tags[value], !toggled);
      }}
      className={toggled ? styles.toggleButtonActive : styles.toggleButtonInactive}
    >
      {children}
    </Button>
  );
};

export default connect()(CustomToggleButton);
