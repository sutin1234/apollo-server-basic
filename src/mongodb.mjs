
import pkg from 'mongoose';
const { connect } = pkg;
const uri =
    "mongodb://root:123456@localhost:27017/";
export const connected = async () => {
    try {
        const db = connect(uri, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected mongo Database successfully to server");
        return db;
    } finally {
        // await client.close();
    }
}