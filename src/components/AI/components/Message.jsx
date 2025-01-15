import React from 'react';
import styles from '../AI.module.css';
import QuickActions from './QuickActions';
import { personalities } from '../services/personalities';

const formatMessage = (text) => {
  if (!text) return '';
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={index} className="font-bold text-primary">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

const Message = ({ message, onActionClick }) => (
  <div className={`flex gap-4 ${styles['animate-fade-in']}`}>
    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
      {message.type === 'bot' ? personalities[message.personality].emoji : '👤'}
    </div>
    <div
      className={`flex-1 ${
        message.type === 'bot' ? 'bg-primary/5' : 'bg-secondary/5'
      } rounded-xl p-4`}
    >
      <p className="text-gray-700 whitespace-pre-wrap">
        {formatMessage(message.content)}
        {message.loading && <span className={styles['loading-dots']} />}
      </p>
      {message.miniChart && (
        <pre className={styles['mini-chart']}>{message.miniChart}</pre>
      )}
      {message.type === 'bot' && !message.loading && (
        <QuickActions
          onActionClick={onActionClick}
          showPriceAction={message.content.toLowerCase().includes('price')}
          showVolumeAction={message.content.toLowerCase().includes('volume')}
          showLiquidityAction={message.content.toLowerCase().includes('liquidity')}
          showPatternAction={message.content.toLowerCase().includes('pattern')}
        />
      )}
    </div>
  </div>
);

export default Message;