import React, { useState, Props } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import styles from './index.module.scss';

interface CustomToggleButtonProps {
  children: string;
  toggledInitial?: boolean;
  value: number;
}
const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({
  children,
  toggledInitial = false,
  value,
}) => {
  const [toggled, setToggled] = useState(toggledInitial);
  return (
    <Button
      key={value}
      onClick={() => setToggled(!toggled)}
      className={toggled ? styles.toggleButtonActive : styles.toggleButtonInactive}
    >
      {children}
    </Button>
  );
};
export default connect()(CustomToggleButton);
