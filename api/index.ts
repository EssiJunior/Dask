import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Get a specific collection base on the collection name and the id of the document
 * @param {String} id
 * @param {String} collectionName
 * @returns {DocumentReference<DocumentData>}
 */
export const getDocumentReference = (
  id: string,
  collectionName: string
): DocumentReference<DocumentData> => {
  return doc(db, collectionName, id);
};

/**
 * Get the whole collection base on the collection name
 * @param {String} collectionName
 * @returns {CollectionReference<DocumentData>}
 */
export const getCollectionReference = (
  collectionName: string
): CollectionReference<DocumentData> => {
  return collection(db, collectionName);
};
