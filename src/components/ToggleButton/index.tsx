import React, { useState, Props } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './index.module.scss';
import { connect } from 'react-redux';

interface ToggleButtonProps {
  children: string;
  toggledInitial?: boolean;
  value: number;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ children, toggledInitial = false, value }) => {
  const [toggled, setToggled] = useState(toggledInitial);

  return (
  <Button
    key={value}
    onClick={() => setToggled(!toggled)}
    className={(toggled) ? styles.toggleButtonActive : styles.toggleButtonInactive}>
      {children}
    </Button>
    )
  }

export default connect()(ToggleButton);