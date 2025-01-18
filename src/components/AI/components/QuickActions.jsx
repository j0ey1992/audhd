import React from 'react';
import styles from '../AI.module.css';
import { personalities } from '../services/personalities';

const QuickActions = ({ 
    onActionClick, 
    showPriceAction, 
    showVolumeAction, 
    showLiquidityAction, 
    showPatternAction,
    personality = 'AUTISM'
}) => {
    const p = personalities[personality];

    // Define action buttons with personality-specific styling
    const actions = [
        {
            id: 'price',
            label: p?.traits?.technicalTerms ? 'Price Analysis' : 'Price Check',
            icon: '📈',
            show: showPriceAction,
            className: 'bg-blue-500/10 hover:bg-blue-500/20'
        },
        {
            id: 'volume',
            label: p?.traits?.technicalTerms ? 'Volume Analysis' : 'Volume Check',
            icon: '📊',
            show: showVolumeAction,
            className: 'bg-green-500/10 hover:bg-green-500/20'
        },
        {
            id: 'liquidity',
            label: p?.traits?.technicalTerms ? 'Liquidity Analysis' : 'Liquidity Check',
            icon: '💧',
            show: showLiquidityAction,
            className: 'bg-purple-500/10 hover:bg-purple-500/20'
        },
        {
            id: 'pattern',
            label: p?.traits?.technicalTerms ? 'Pattern Analysis' : 'Pattern Check',
            icon: '🔍',
            show: showPatternAction,
            className: 'bg-yellow-500/10 hover:bg-yellow-500/20'
        }
    ];

    // Filter actions based on personality preferences
    const filteredActions = actions.filter(action => {
        if (!p?.traits?.technicalPreference) return true;
        switch (action.id) {
            case 'pattern':
                return p.traits.technicalPreference.patterns;
            case 'volume':
                return p.traits.technicalPreference.volume;
            default:
                return true;
        }
    });

    // Sort actions based on personality priority
    const sortedActions = [...filteredActions].sort((a, b) => {
        if (!p?.traits?.technicalPreference?.priority) return 0;
        const priorityA = p.traits.technicalPreference.priority.indexOf(a.id);
        const priorityB = p.traits.technicalPreference.priority.indexOf(b.id);
        return priorityA - priorityB;
    });

    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {sortedActions.map(action => action.show && (
                <button
                    key={action.id}
                    onClick={() => onActionClick(action.id)}
                    className={`${styles['quick-action']} ${action.className} 
                        inline-flex items-center gap-1 px-3 py-1 rounded-full 
                        text-sm font-medium transition-colors duration-200
                        ${p?.traits?.energetic ? 'animate-pulse' : ''}`}
                >
                    <span className="mr-1">{action.icon}</span>
                    {action.label}
                </button>
            ))}

            {/* Timeframe selector for pattern-focused personalities */}
            {p?.traits?.patternFocus && showPatternAction && (
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-text-secondary">Timeframe:</span>
                    <select 
                        className={`${styles['timeframe-select']} 
                            bg-surface/10 rounded-md px-2 py-1 text-sm
                            border border-primary/20 focus:border-primary
                            outline-none`}
                        onChange={(e) => onActionClick('timeframe', e.target.value)}
                    >
                        {p.traits.preferredTimeframes.map(tf => (
                            <option key={tf} value={tf}>{tf}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default QuickActions;