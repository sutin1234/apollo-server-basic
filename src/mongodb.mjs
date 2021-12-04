import { MongoClient } from 'mongodb'
import pkg from 'mongoose';
const { connect } = pkg;
const uri =
    "mongodb://root:123456@localhost:27017/";
// const client = new MongoClient(uri, { useNewUrlParser: true });
export const connected = async () => {
    try {
        const db = connect(uri, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // await client.db('example').command({ ping: 1 });
        console.log("Connected mongo Database successfully to server");
        // const collection = await client.db('example').listCollections({}, { nameOnly: true }).toArray()
        // console.log('List of all collections :: ', JSON.stringify(collection))
        return db;
    } finally {
        // await client.close();
    }
}