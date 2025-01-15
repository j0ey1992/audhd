import React from 'react';
import styles from '../AI.module.css';

const QuickActions = ({
  onActionClick,
  showPriceAction,
  showVolumeAction,
  showLiquidityAction,
  showPatternAction,
}) => (
  <div className={styles['quick-actions']}>
    {showPriceAction && (
      <button onClick={() => onActionClick('price')} className={styles['quick-action-button']}>
        📊 Price Analysis
      </button>
    )}
    {showVolumeAction && (
      <button onClick={() => onActionClick('volume')} className={styles['quick-action-button']}>
        📈 Volume Trends
      </button>
    )}
    {showLiquidityAction && (
      <button onClick={() => onActionClick('liquidity')} className={styles['quick-action-button']}>
        💧 Liquidity Check
      </button>
    )}
    {showPatternAction && (
      <button onClick={() => onActionClick('pattern')} className={styles['quick-action-button']}>
        🔍 Pattern Detection
      </button>
    )}
  </div>
);

export default QuickActions;