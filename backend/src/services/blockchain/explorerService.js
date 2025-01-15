import axios from 'axios';
import { config } from '../../config.js';
import { COLLECTIONS, addDocument, getDocument } from '../../utils/db.js';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache for blockchain data

// Explorer configurations
const EXPLORERS = {
    ethereum: {
        baseUrl: 'https://api.etherscan.io/api',
        apiKey: config.blockchain?.etherscan?.apiKey,
        name: 'Etherscan'
    },
    bsc: {
        baseUrl: 'https://api.bscscan.com/api',
        apiKey: config.blockchain?.bscscan?.apiKey,
        name: 'BSCScan'
    }
};

/**
 * Format contract data
 */
const formatContractData = (data, chain) => {
    return {
        address: data.ContractAddress || data.Address,
        name: data.ContractName,
        symbol: data.Symbol || '',
        verified: data.IsVerified === '1',
        verification_date: data.VerifiedTimestamp || null,
        compiler: {
            version: data.CompilerVersion,
            optimization: data.OptimizationUsed === '1'
        },
        source: {
            code: data.SourceCode,
            abi: data.ABI !== 'Contract source code not verified' ? JSON.parse(data.ABI) : null
        },
        license: data.License,
        metadata: {
            chain,
            creation_date: data.CreationDate,
            creator_address: data.CreatorAddress,
            transaction_hash: data.TxHash
        }
    };
};

/**
 * Get explorer instance for chain
 */
const getExplorer = (chain) => {
    const explorer = EXPLORERS[chain.toLowerCase()];
    if (!explorer) {
        throw new Error(`Unsupported blockchain: ${chain}`);
    }
    if (!explorer.apiKey) {
        throw new Error(`API key not configured for ${explorer.name}`);
    }
    return explorer;
};

/**
 * Get contract source code and verification status
 */
export const getContractCode = async (address, chain = 'ethereum') => {
    try {
        const explorer = getExplorer(chain);

        // Check cache
        const cacheKey = `explorer_contract_${chain}_${address}`;
        const cached = await getDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from explorer
        const response = await axios.get(explorer.baseUrl, {
            params: {
                module: 'contract',
                action: 'getsourcecode',
                address: address,
                apikey: explorer.apiKey
            }
        });

        if (response.data.status !== '1' || !response.data.result[0]) {
            throw new Error(response.data.message || 'Failed to fetch contract data');
        }

        const formattedData = formatContractData(response.data.result[0], chain);

        // Cache result
        await addDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, {
            data: formattedData,
            timestamp: Date.now()
        }, cacheKey);

        return formattedData;
    } catch (error) {
        console.error('Error fetching contract code:', error);
        throw new Error(`Failed to fetch contract code: ${error.message}`);
    }
};

/**
 * Get contract transactions
 */
export const getContractTransactions = async (address, chain = 'ethereum', page = 1, offset = 100) => {
    try {
        const explorer = getExplorer(chain);

        // Check cache
        const cacheKey = `explorer_txs_${chain}_${address}_${page}`;
        const cached = await getDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from explorer
        const response = await axios.get(explorer.baseUrl, {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                page: page,
                offset: offset,
                sort: 'desc',
                apikey: explorer.apiKey
            }
        });

        if (response.data.status !== '1') {
            throw new Error(response.data.message || 'Failed to fetch transactions');
        }

        const transactions = response.data.result.map(tx => ({
            hash: tx.hash,
            block_number: parseInt(tx.blockNumber),
            timestamp: parseInt(tx.timeStamp) * 1000,
            from: tx.from,
            to: tx.to,
            value: tx.value,
            gas_used: tx.gasUsed,
            gas_price: tx.gasPrice,
            success: tx.isError === '0',
            method: tx.functionName.split('(')[0] || 'transfer',
            metadata: {
                chain,
                nonce: tx.nonce,
                input: tx.input,
                contract_address: tx.contractAddress || null
            }
        }));

        // Cache result
        await addDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, {
            data: transactions,
            timestamp: Date.now()
        }, cacheKey);

        return transactions;
    } catch (error) {
        console.error('Error fetching contract transactions:', error);
        throw new Error(`Failed to fetch contract transactions: ${error.message}`);
    }
};

/**
 * Get contract events
 */
export const getContractEvents = async (address, chain = 'ethereum', page = 1, offset = 100) => {
    try {
        const explorer = getExplorer(chain);

        // Check cache
        const cacheKey = `explorer_events_${chain}_${address}_${page}`;
        const cached = await getDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from explorer
        const response = await axios.get(explorer.baseUrl, {
            params: {
                module: 'logs',
                action: 'getLogs',
                address: address,
                page: page,
                offset: offset,
                apikey: explorer.apiKey
            }
        });

        if (response.data.status !== '1') {
            throw new Error(response.data.message || 'Failed to fetch events');
        }

        const events = response.data.result.map(event => ({
            transaction_hash: event.transactionHash,
            block_number: parseInt(event.blockNumber),
            timestamp: parseInt(event.timeStamp) * 1000,
            address: event.address,
            topics: event.topics,
            data: event.data,
            metadata: {
                chain,
                log_index: event.logIndex,
                transaction_index: event.transactionIndex
            }
        }));

        // Cache result
        await addDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, {
            data: events,
            timestamp: Date.now()
        }, cacheKey);

        return events;
    } catch (error) {
        console.error('Error fetching contract events:', error);
        throw new Error(`Failed to fetch contract events: ${error.message}`);
    }
};

/**
 * Get contract holders
 */
export const getContractHolders = async (address, chain = 'ethereum', page = 1, offset = 100) => {
    try {
        const explorer = getExplorer(chain);

        // Check cache
        const cacheKey = `explorer_holders_${chain}_${address}_${page}`;
        const cached = await getDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
            return cached.data;
        }

        // Fetch from explorer
        const response = await axios.get(explorer.baseUrl, {
            params: {
                module: 'token',
                action: 'tokenholderlist',
                contractaddress: address,
                page: page,
                offset: offset,
                apikey: explorer.apiKey
            }
        });

        if (response.data.status !== '1') {
            throw new Error(response.data.message || 'Failed to fetch holders');
        }

        const holders = response.data.result.map(holder => ({
            address: holder.TokenHolderAddress,
            balance: holder.TokenHolderQuantity,
            share: parseFloat(holder.Share),
            metadata: {
                chain,
                first_transaction_timestamp: parseInt(holder.FirstTransactionTimestamp) * 1000,
                last_transaction_timestamp: parseInt(holder.LastTransactionTimestamp) * 1000
            }
        }));

        // Cache result
        await addDocument(COLLECTIONS.BLOCKCHAIN_DATA_CACHE, {
            data: holders,
            timestamp: Date.now()
        }, cacheKey);

        return holders;
    } catch (error) {
        console.error('Error fetching contract holders:', error);
        throw new Error(`Failed to fetch contract holders: ${error.message}`);
    }
};

export default {
    getContractCode,
    getContractTransactions,
    getContractEvents,
    getContractHolders,
    EXPLORERS
};