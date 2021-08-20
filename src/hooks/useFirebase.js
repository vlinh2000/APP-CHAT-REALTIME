import React from 'react';
import { db } from '../Firebase/config';

const useFirebase = (collection, condition) => {
    /*
    condition = {
    fieldName:'ac',
    operator:'=='
    compareValue: 'acv',
    }
    
    */
    const [documents, setDocuments] = React.useState([])
    React.useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt');

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }
        const unsubcribed = collectionRef.onSnapshot(snapshot => {
            const document = snapshot.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setDocuments(document);
        })

        return unsubcribed
    }, [collection, condition])

    return documents;

};

export default useFirebase;