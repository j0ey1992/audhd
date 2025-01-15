import React from 'react';
import { formatNumber, formatPercentage } from '../services/dataService';

const TokenStats = ({ data, isFullscreen }) => {
    if (!data) return null;
    const { price, market, metadata } = data;

    // Hide all stats in mobile fullscreen mode
    if (isFullscreen && window.matchMedia('(max-width: 768px)').matches) {
        return null;
    }

    // Show all stats in desktop or non-fullscreen mode
    return (
        <div className={`grid grid-cols-4 ${isFullscreen ? 'gap-0.5 mb-0.5' : 'gap-4 mb-6'}`}>
            <div className={`bg-white/90 rounded ${isFullscreen ? 'py-0.5 px-1' : 'p-4'} border border-primary/20`}>
                <div className={`${isFullscreen ? 'text-[10px] leading-tight' : 'text-sm'} text-gray-600`}>Price</div>
                <div className={`${isFullscreen ? 'text-xs leading-tight' : 'text-xl'} font-bold`}>${formatNumber(price.current)}</div>
                <div
                    className={`${isFullscreen ? 'text-[10px] leading-tight' : 'text-sm'} ${
                        price.change_24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {formatPercentage(price.change_24h)}
                </div>
            </div>
            <div className={`bg-white/90 rounded ${isFullscreen ? 'py-0.5 px-1' : 'p-4'} border border-primary/20`}>
                <div className={`${isFullscreen ? 'text-[10px] leading-tight' : 'text-sm'} text-gray-600`}>Liquidity</div>
                <div className={`${isFullscreen ? 'text-xs leading-tight' : 'text-xl'} font-bold`}>${formatNumber(market.liquidity)}</div>
            </div>
            <div className={`bg-white/90 rounded ${isFullscreen ? 'py-0.5 px-1' : 'p-4'} border border-primary/20`}>
                <div className={`${isFullscreen ? 'text-[10px] leading-tight' : 'text-sm'} text-gray-600`}>24h Volume</div>
                <div className={`${isFullscreen ? 'text-xs leading-tight' : 'text-xl'} font-bold`}>${formatNumber(market.volume_24h)}</div>
            </div>
            <div className={`bg-white/90 rounded ${isFullscreen ? 'py-0.5 px-1' : 'p-4'} border border-primary/20`}>
                <div className={`${isFullscreen ? 'text-[10px] leading-tight' : 'text-sm'} text-gray-600`}>Chain</div>
                <div className={`${isFullscreen ? 'text-xs leading-tight' : 'text-xl'} font-bold`}>{metadata.chain}</div>
                <div className={`${isFullscreen ? 'text-[10px] leading-tight' : 'text-sm'} text-gray-600`}>{metadata.dex}</div>
            </div>
        </div>
    );
};

export default TokenStats;