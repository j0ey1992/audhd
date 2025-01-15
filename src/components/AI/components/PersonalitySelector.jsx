import React from 'react';
import styles from '../AI.module.css';
import { personalities } from '../services/personalities';

const PersonalitySelector = ({ currentPersonality, onSelect }) => (
  <div className={styles['personality-selector']}>
    {Object.entries(personalities).map(([key, p]) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        className={`${styles['personality-button']} ${
          currentPersonality === key ? styles['active'] : ''
        }`}
      >
        {p.emoji} {p.name}
      </button>
    ))}
  </div>
);

export default PersonalitySelector;