import React from 'react';
import styles from '../AI.module.css';
import { personalities } from '../services/personalities';

// Define which actions are supported by each chain
const CHAIN_SUPPORTED_ACTIONS = {
    eth: ['pairs', 'swaps', 'traders', 'transfers'],
    cronos: ['transfers'], // Cronos only supports basic operations
    bsc: ['pairs', 'swaps', 'traders', 'transfers'],
    polygon: ['pairs', 'swaps', 'traders', 'transfers']
};

const QuickActions = ({ 
    onActionClick, 
    showPriceAction, 
    showVolumeAction, 
    showLiquidityAction, 
    showPatternAction,
    tokenAddress,
    chain,
    personality = 'AUTISM'
}) => {
    const p = personalities[personality];
    const normalizedChain = chain?.toLowerCase() || 'eth';
    const supportedActions = CHAIN_SUPPORTED_ACTIONS[normalizedChain] || [];

    // Define action buttons with personality-specific styling
    const actions = [
        // Standard analysis actions
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
        },
        // Moralis data actions - only show if supported by the chain
        {
            id: 'pairs',
            label: 'Trading Pairs',
            icon: '🔄',
            show: tokenAddress && supportedActions.includes('pairs'),
            className: 'bg-indigo-500/10 hover:bg-indigo-500/20',
            moralisAction: true
        },
        {
            id: 'swaps',
            label: 'Recent Swaps',
            icon: '💱',
            show: tokenAddress && supportedActions.includes('swaps'),
            className: 'bg-pink-500/10 hover:bg-pink-500/20',
            moralisAction: true
        },
        {
            id: 'traders',
            label: 'Top Traders',
            icon: '👥',
            show: tokenAddress && supportedActions.includes('traders'),
            className: 'bg-orange-500/10 hover:bg-orange-500/20',
            moralisAction: true
        },
        {
            id: 'transfers',
            label: 'Token Transfers',
            icon: '📤',
            show: tokenAddress && supportedActions.includes('transfers'),
            className: 'bg-teal-500/10 hover:bg-teal-500/20',
            moralisAction: true
        }
    ];

    // Filter actions based on personality preferences
    const filteredActions = actions.filter(action => {
        // Always show Moralis actions if they're supported for the chain
        if (action.moralisAction && action.show) return true;
        
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

    const handleActionClick = (actionId) => {
        onActionClick(actionId, { tokenAddress, chain });
    };

    return (
        <div className="mt-3">
            {/* Standard Analysis Actions */}
            <div className="flex flex-wrap gap-2 mb-2">
                {sortedActions.filter(action => !action.moralisAction).map(action => action.show && (
                    <button
                        key={action.id}
                        onClick={() => handleActionClick(action.id)}
                        className={`${styles['quick-action']} ${action.className} 
                            inline-flex items-center gap-1 px-3 py-1 rounded-full 
                            text-sm font-medium transition-colors duration-200
                            ${p?.traits?.energetic ? 'animate-pulse' : ''}`}
                    >
                        <span className="mr-1">{action.icon}</span>
                        {action.label}
                    </button>
                ))}
            </div>

            {/* Moralis Data Actions */}
            {tokenAddress && supportedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-primary/10">
                    {sortedActions.filter(action => action.moralisAction).map(action => action.show && (
                        <button
                            key={action.id}
                            onClick={() => handleActionClick(action.id)}
                            className={`${styles['quick-action']} ${action.className} 
                                inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                text-sm font-medium transition-colors duration-200`}
                        >
                            <span className="mr-1">{action.icon}</span>
                            {action.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Timeframe selector for pattern-focused personalities */}
            {p?.traits?.patternFocus && showPatternAction && (
                <div className="ml-auto flex items-center gap-2 mt-2">
                    <span className="text-sm text-text-secondary">Timeframe:</span>
                    <select 
                        className={`${styles['timeframe-select']} 
                            bg-surface/10 rounded-md px-2 py-1 text-sm
                            border border-primary/20 focus:border-primary
                            outline-none`}
                        onChange={(e) => handleActionClick('timeframe', e.target.value)}
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