import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {

  console.log("Put to the database")

  const connectDb = await openDB("jate", 1)

  const trnsaction = connectDb.transaction("jate", "readwrite")

  const store = trnsaction.objectStore("jate")

  const req = store.put({ id: 1, value: content })

  const res = await req
  
  console.log("Data saved to the database!", res)
}

export const getDb = async () => {
  
  console.log("Get from the database!")

  const connectDb = await openDB("jate", 1)

  const trnsaction = connectDb.transaction("jate", "readonly")

  const store = trnsaction.objectStore("jate")

  const req = store.getAll()

  const res = await req

  console.log("res.value", res)

  return res?.value
}

initdb();
