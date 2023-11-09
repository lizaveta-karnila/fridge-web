import {DocumentSnapshot, DocumentReference} from "firebase/firestore";
import {getDoc} from "firebase/firestore";

interface IItemWithId {
  id: string;
}

async function mapFirestoreDocumentSnapshot<TResult extends IItemWithId>(
  firestoreDoc: DocumentSnapshot,
  depth: number = 5,
): Promise<TResult | null> {
  // to avoid annoying TS :)
  // returns snapshot if depth limit is exceeded
  if (--depth === 0) return firestoreDoc as unknown as TResult;

  const data = firestoreDoc.data();
  if (!data) return null;

  const dependencies: Record<string, any> = (await Promise.all(
    Object.keys(data)
      .filter(key => data[key] instanceof DocumentReference)
      .map(async key => ({
          key,
          data: await mapFirestoreDocumentSnapshot(await getDoc(data[key]), depth)
        })
      )
  )).reduce((acc, value) => ({
    ...acc,
    [value.key]: value.data,
  }), {});

  return {
    ...firestoreDoc.data(),
    ...dependencies,
    id: firestoreDoc.id,
  } as TResult;
}

export async function mapFirestoreDocuments<TResult extends IItemWithId>(
  firestoreDocs: DocumentSnapshot[],
  depth: number = 5,
): Promise<TResult[]> {
  return (await Promise.all(
    firestoreDocs.map(doc => mapFirestoreDocumentSnapshot<TResult>(doc, depth))
  )).filter((item) => item !== null) as TResult[];
}
