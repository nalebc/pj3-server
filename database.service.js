const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Polydraw:poly123456@cluster0.taabw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = "Polydraw"
USERS_COLLECTION ="Users"
var collection;
var client;
function start(){
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    if(err){
      console.log(err)
      client.close()
      
    }
        collection = client.db(DATABASE_NAME).collection(USERS_COLLECTION)
        console.log("DB Started")
        // perform actions on the collection object
        //client.close();
      })
}

function  getUsers() {
    return collection.find({}).toArray().then((user) => {
        console.log(user)
    }).catch(()=> {
      throw new Error('Error while getting Users');
  
    })
}
module.exports = {
  start,
  getUsers
};