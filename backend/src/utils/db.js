import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from '../config.js';

// Initialize Firebase Admin
const app = initializeApp({
    credential: cert(config.firebase.serviceAccount),
    databaseURL: config.firebase.databaseURL
});

// Get Firestore instance
const db = getFirestore(app);

// Collection names
export const COLLECTIONS = {
    USER_PREFERENCES: 'user_preferences',
    ANALYSIS_HISTORY: 'analysis_history',
    MARKET_DATA_CACHE: 'market_data_cache'
};

/**
 * Add a document to a collection
 * @param {string} collection - Collection name
 * @param {Object} data - Document data
 * @param {string} [id] - Optional document ID
 * @returns {Promise<FirebaseFirestore.DocumentReference>}
 */
export const addDocument = async (collection, data, id = null) => {
    try {
        const timestamp = new Date();
        const docData = {
            ...data,
            created_at: timestamp,
            updated_at: timestamp
        };

        if (id) {
            await db.collection(collection).doc(id).set(docData);
            return db.collection(collection).doc(id);
        } else {
            return await db.collection(collection).add(docData);
        }
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
};

/**
 * Update a document in a collection
 * @param {string} collection - Collection name
 * @param {string} id - Document ID
 * @param {Object} data - Update data
 * @returns {Promise<void>}
 */
export const updateDocument = async (collection, id, data) => {
    try {
        const updateData = {
            ...data,
            updated_at: new Date()
        };
        await db.collection(collection).doc(id).update(updateData);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

/**
 * Get a document by ID
 * @param {string} collection - Collection name
 * @param {string} id - Document ID
 * @returns {Promise<FirebaseFirestore.DocumentData|null>}
 */
export const getDocument = async (collection, id) => {
    try {
        const doc = await db.collection(collection).doc(id).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
};

/**
 * Query documents in a collection
 * @param {string} collection - Collection name
 * @param {Array<Array>} conditions - Array of condition arrays [field, operator, value]
 * @param {number} [limit] - Optional limit
 * @returns {Promise<Array<FirebaseFirestore.DocumentData>>}
 */
export const queryDocuments = async (collection, conditions = [], limit = null) => {
    try {
        let query = db.collection(collection);

        conditions.forEach(([field, operator, value]) => {
            query = query.where(field, operator, value);
        });

        if (limit) {
            query = query.limit(limit);
        }

        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
};

/**
 * Delete a document
 * @param {string} collection - Collection name
 * @param {string} id - Document ID
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collection, id) => {
    try {
        await db.collection(collection).doc(id).delete();
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

export default {
    db,
    COLLECTIONS,
    addDocument,
    updateDocument,
    getDocument,
    queryDocuments,
    deleteDocument
};