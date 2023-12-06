//// refer to pdf
//// inside this class first thing we have to make sure that we have some file on our hard drive that we can used to store all the information.


// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//     }
// }

// //// testing
// new UsersRepository()




//// check if file exist on hard drive or not , if not then create it, use node.js documnetation file system 

// const fs = require('fs')


// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         //// check for the file, why we are using accessSyn because it is the syncronous operation & inside the construction asyncrounous operation is not allowed.
//         try{
//             fs.accessSync(this.filename)  //// if filename is not exist then this throw an error to catch this error i will use try catch error block
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')    //// will create a file if not exist, second arg is the data we want to pass
//         }
            
//     }
// }

// //// testing, will create the users.json
// const repo = new UsersRepository('users.json')






//// ************************** opening the repo data file
//// there 3 version available read/write/access the file we generally prefer the promise based version if we are not using it in contructor.

// const fs = require('fs')


// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         //// open the file called this.file
//         const content = await fs.promises.readFile(this.filename, {encoding: 'utf8'})  //// second arg is optional
        
//         //// read the content
//         console.log(content)


//         //// parsed the content


//         //// return the parsed data
//     }
// }


// //// if top level await is not available in this version of node use this helper function test currently not available so use this
// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     await repo.getAll()
// }

// test()    ///// []

// //// otherwise
// // const repo = new UsersRepository('users.json')
// // await repo.getAll()





//// ************************************** small refactor

// const fs = require('fs')


// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         //// open the file called this.file
//         const contents = await fs.promises.readFile(this.filename, {encoding: 'utf8'})  //// second arg is optional
        
//         //// read the content
//         // console.log(contents)


//         //// parsed the content
//         //// inside our file we are gonna stores all our user as JSON data, which can be safely written as a string
//         //// when load the information out of that file, we first have it as a string, so we need to take that string and parse it from JSON back into a normal java script object or an array of object in this case.
//         const data = JSON.parse(contents)


//         //// return the parsed data
//         return data
//     }
// }


// //// if top level await is not available in this version of node use this helper function test currently not available so use this
// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     const users = await repo.getAll()
//     console.log(users)    //// array [] are seeing is an actual array earlier it was a string of array '[]' although both look same
// }

// test()    ///// []

//// otherwise
// const repo = new UsersRepository('users.json')
// await repo.getAll()



// const fs = require('fs')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(await fs.promises.readFile(this.filename, {encoding: 'utf8'}))  
//     }
// }

// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     const users = await repo.getAll()
//     console.log(users)    //// array [] are seeing is an actual array earlier it was a string of array '[]' although both look same
// }

// test()





//// ********************************* saving records

// const fs = require('fs')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(
//             await fs.promises.readFile(this.filename, {encoding: 'utf8'})
//             );  
//     }

//     //// attrs is abbrevated for attributes, {email: 'ex.com', password: '123'}
//     //// in order to create a new user we are going load up the content of user.json file
//     //// so every single tym we are going to make changes to our list of users we are going to load well then add in our new user to that array and then write the file back to our harddrive.
//     async create(attrs){
//         const records = await this.getAll()
//         records.push(attrs)
//         //// write the updated 'records' back to file 'users.json'/this.filename
//         //// second arg to store the information as string, so we take that records variable that we just changed and add in that new user and we will turn it into json 
//         await fs.promises.writeFile(this.filename, JSON.stringify(records))

//     }

// }

// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     await repo.create({email:'example@.com', password:'123'})  //// await because create function itself a asynchronus in nature
//     const users = await repo.getAll()
//     console.log(users)    
// }

// test()





///// *************************************** Better JSON Formatting && Random id generation

// const fs = require('fs')
// const crypto = require('crypto')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(
//             await fs.promises.readFile(this.filename, {encoding: 'utf8'})
//             );  
//     }

//     async create(attrs){
//         attrs.id = this.randomId()
//         const records = await this.getAll()
//         records.push(attrs)
//         await this.writeAll(records)
                
//     }

//     //// before testing it delete users.json lets start from scratch
//     //// for every records we must have id to distinguish
//     //// we will use crypto doc crypto.randomBytes(size) size will be in byte, this will return buffer, buffer kind of array with raw data so will convert into string
//     randomId(){
//         return crypto.randomBytes(4).toString('hex')
//     }

//     async writeAll(records){
//         await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))  //// make it more readable, second arg we do not want so null, 3rd is for identation 
//     }
// }

// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     await repo.create({email:'example@.com', password:'123'})  //// await because create function itself a asynchronus in nature
//     const users = await repo.getAll()
//     console.log(users)    
// }

// test()






///// ***************************************** finding by an Id

// const fs = require('fs')
// const crypto = require('crypto')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(
//             await fs.promises.readFile(this.filename, {encoding: 'utf8'})
//             );  
//     }

//     async create(attrs){
//         attrs.id = this.randomId()
//         const records = await this.getAll()
//         records.push(attrs)
//         await this.writeAll(records)
                
//     }

//     randomId(){
//     return crypto.randomBytes(4).toString('hex')
//     }

//     async writeAll(records){
//         await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))  
//     }

//     async getOne(id){
//         const records = await this.getAll()
//         return records.find(record => record.id === id ) 
//     }
// }

// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     //// u need to open the user.json and copy id manually
//     const user = await repo.getOne("364cce1d")
//     console.log(user)    
// }

// test()




//// ************************** deleting the record


// const fs = require('fs')
// const crypto = require('crypto')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(
//             await fs.promises.readFile(this.filename, {encoding: 'utf8'})
//             );  
//     }

//     async create(attrs){
//         attrs.id = this.randomId()
//         const records = await this.getAll()
//         records.push(attrs)
//         await this.writeAll(records)
                
//     }

//     randomId(){
//     return crypto.randomBytes(4).toString('hex')
//     }

//     async writeAll(records){
//         await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))  
//     }

//     async getOne(id){
//         const records = await this.getAll()
//         return records.find(record => record.id === id ) 
//     }

//     async delete(id){
//         const records = await this.getAll()
//         const filteredRecords = records.filter(record => record.id !== id)
//         await this.writeAll(filteredRecords)
//     }
// }

// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     await repo.delete("364cce1d")
    
// }

// test()





/////************************************************ updating the records


// const fs = require('fs')
// const crypto = require('crypto')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(
//             await fs.promises.readFile(this.filename, {encoding: 'utf8'})
//             );  
//     }

//     async create(attrs){
//         attrs.id = this.randomId()
//         const records = await this.getAll()
//         records.push(attrs)
//         await this.writeAll(records)
                
//     }

//     randomId(){
//     return crypto.randomBytes(4).toString('hex')
//     }

//     async writeAll(records){
//         await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))  
//     }

//     async getOne(id){
//         const records = await this.getAll()
//         return records.find(record => record.id === id ) 
//     }

//     async delete(id){
//     const records = await this.getAll()
//     const filteredRecords = records.filter(record => record.id !== id)
//     await this.writeAll(filteredRecords)
//     }


//     async update(id, attrs){
//         const records = await this.getAll()
//         const record = records.find(record => record.id === id)

//         if(!record){
//             throw new Error(`Record with an id ${id} not found!`)
//         }
        
//         //// now update
//         //// if record === {email : 'test@test.com'}
//         //// if attrs === {password : '123'}
//         //// we are just copying key value pair of attrs into record
//         Object.assign(record, attrs)           //// then  record === {email : 'test@test.com', password : '123' }
//         await this.writeAll(records)    
//     }
// }

// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     await repo.update("15548b6a", {password:'mypassword'})
// }
    
// test()
      




///// **************************************************** adding filtering logic

// const fs = require('fs')
// const crypto = require('crypto')

// class UsersRepository{
//     constructor(filename){
//         if(!filename){
//             throw new Error('Creating a repository requires a filename!')
//         }
//         this.filename = filename;
//         try{
//             fs.accessSync(this.filename)          
//         }
//         catch(err){
//             fs.writeFileSync(this.filename, '[]')           
//         }
//     }

//     async getAll(){
//         return JSON.parse(
//             await fs.promises.readFile(this.filename, {encoding: 'utf8'})
//             );  
//     }

//     async create(attrs){
//         attrs.id = this.randomId()
//         const records = await this.getAll()
//         records.push(attrs)
//         await this.writeAll(records)
                
//     }

//     randomId(){
//     return crypto.randomBytes(4).toString('hex')
//     }

//     async writeAll(records){
//         await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))  
//     }

//     async getOne(id){
//         const records = await this.getAll()
//         return records.find(record => record.id === id ) 
//     }

//     async delete(id){
//     const records = await this.getAll()
//     const filteredRecords = records.filter(record => record.id !== id)
//     await this.writeAll(filteredRecords)
//     }


//     async update(id, attrs){
//         const records = await this.getAll()
//         const record = records.find(record => record.id === id)

//         if(!record){
//             throw new Error(`Record with an id ${id} not found!`)
//         }
        
//         Object.assign(record, attrs)           
//         await this.writeAll(records)    
//     }


//     async getOneBy(filter){
//         const records = await this.getAll()
//         for(let record of records){
//             let found = true;
//             //// iterating through object so we used in so they we will get key 
//             for(let key in filter){
//                 if(record[key] !== filter[key]){
//                     found = false;
//                 }
//             }
//         if(found){
//             return record;
//         }
//     }
// }

// }
        
// const test = async() => {
//     const repo = new UsersRepository('users.json')
//     const user = await repo.getOneBy({password: "mypassword"})
//     console.log(user)
// }
    
// test()






//// exporting an instance

// const fs = require('fs');
// const crypto = require('crypto');

// class UsersRepository {
//   constructor(filename) {
//     if (!filename) {
//       throw new Error('Creating a repository requires a filename');
//     }

//     this.filename = filename;
//     try {
//       fs.accessSync(this.filename);
//     } catch (err) {
//       fs.writeFileSync(this.filename, '[]');
//     }
//   }

//   async getAll() {
//     return JSON.parse(
//       await fs.promises.readFile(this.filename, {
//         encoding: 'utf8'
//       })
//     );
//   }

//   async create(attrs) {
//     attrs.id = this.randomId();

//     const records = await this.getAll();
//     records.push(attrs);

//     await this.writeAll(records);

//     return attrs;
//   }

//   async writeAll(records) {
//     await fs.promises.writeFile(
//       this.filename,
//       JSON.stringify(records, null, 2)
//     );
//   }

//   randomId() {
//     return crypto.randomBytes(4).toString('hex');
//   }

//   async getOne(id) {
//     const records = await this.getAll();
//     return records.find(record => record.id === id);
//   }

//   async delete(id) {
//     const records = await this.getAll();
//     const filteredRecords = records.filter(record => record.id !== id);
//     await this.writeAll(filteredRecords);
//   }

//   async update(id, attrs) {
//     const records = await this.getAll();
//     const record = records.find(record => record.id === id);

//     if (!record) {
//       throw new Error(`Record with id ${id} not found`);
//     }

//     Object.assign(record, attrs);
//     await this.writeAll(records);
//   }

//   async getOneBy(filters) {
//     const records = await this.getAll();

//     for (let record of records) {
//       let found = true;

//       for (let key in filters) {
//         if (record[key] !== filters[key]) {
//           found = false;
//         }
//       }

//       if (found) {
//         return record;
//       }
//     }
//   }
// }

// module.exports = new UsersRepository('users.json');


//// user.json shoud be in root directory so delete it and run after cd..








//// ***************************************** salting + hashing password, Comparing hashed password
//// refer to pdf
//// for hashing algo use scrypt from crypto


// const fs = require('fs');
// const crypto = require('crypto');
// const util = require('util');
// const scrypt = util.promisify(crypto.scrypt);

// class UsersRepository {
//   constructor(filename) {
//     if (!filename) {
//       throw new Error('Creating a repository requires a filename');
//     }

//     this.filename = filename;
//     try {
//       fs.accessSync(this.filename);
//     } catch (err) {
//       fs.writeFileSync(this.filename, '[]');
//     }
//   }

//   async getAll() {
//     return JSON.parse(
//       await fs.promises.readFile(this.filename, {
//         encoding: 'utf8'
//       })
//     );
//   }

//   //// drivedkey is a buffer that contains our hashed password, i am calling it buff
//   //// instead of using direct sycpt we can use promisfy from util
//   async create(attrs) {
//     attrs.id = this.randomId();
//     const salt = crypto.randomBytes(8).toString('hex')
//     // await scrypt(atrrs.password, salt, 64, (err, buff)=>{
//     //     const hashed = buff.toString('hex')
//     // })
    
//     const buf = await scrypt(attrs.password, salt, 64);      //// now we do not need the callback as we are using promise based
//     const records = await this.getAll();
//     const record = {
//       ...attrs,
//       password: `${buf.toString('hex')}.${salt}`
//     };
//     records.push(record);

//     await this.writeAll(records);

//     ///////// return attrs;
//     return record;

//   }



//   async comparePasswords(saved, supplied){
//     //// saved -> password that is saved in our database 'hashed.salt'
//     //// supplied -> password we got by user during signin.
//     // const result = saved.split('.')
//     // const hashed = result[0]
//     // const salt = result[1]

//     const [hashed, salt] = saved.split('.');
//     const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

//     return hashed === hashedSuppliedBuf.toString('hex');
//   }



//   async writeAll(records) {
//     await fs.promises.writeFile(
//       this.filename,
//       JSON.stringify(records, null, 2)
//     );
//   }

//   randomId() {
//     return crypto.randomBytes(4).toString('hex');
//   }

//   async getOne(id) {
//     const records = await this.getAll();
//     return records.find(record => record.id === id);
//   }

//   async delete(id) {
//     const records = await this.getAll();
//     const filteredRecords = records.filter(record => record.id !== id);
//     await this.writeAll(filteredRecords);
//   }

//   async update(id, attrs) {
//     const records = await this.getAll();
//     const record = records.find(record => record.id === id);

//     if (!record) {
//       throw new Error(`Record with id ${id} not found`);
//     }

//     Object.assign(record, attrs);
//     await this.writeAll(records);
//   }

//   async getOneBy(filters) {
//     const records = await this.getAll();

//     for (let record of records) {
//       let found = true;

//       for (let key in filters) {
//         if (record[key] !== filters[key]) {
//           found = false;
//         }
//       }

//       if (found) {
//         return record;
//       }
//     }
//   }
// }

// module.exports = new UsersRepository('users.json');







// const fs = require('fs');
// const crypto = require('crypto');
// const util = require('util');

// const scrypt = util.promisify(crypto.scrypt);

// class UsersRepository {
//   constructor(filename) {
//     if (!filename) {
//       throw new Error('Creating a repository requires a filename');
//     }

//     this.filename = filename;
//     try {
//       fs.accessSync(this.filename);
//     } catch (err) {
//       fs.writeFileSync(this.filename, '[]');
//     }
//   }

//   async getAll() {
//     return JSON.parse(
//       await fs.promises.readFile(this.filename, {
//         encoding: 'utf8'
//       })
//     );
//   }

//   async create(attrs) {
//     attrs.id = this.randomId();

//     const salt = crypto.randomBytes(8).toString('hex');
//     const buf = await scrypt(attrs.password, salt, 64);

//     const records = await this.getAll();
//     const record = {
//       ...attrs,
//       password: `${buf.toString('hex')}.${salt}`
//     };
//     records.push(record);

//     await this.writeAll(records);

//     return record;
//   }

//   async comparePasswords(saved, supplied) {
//     // Saved -> password saved in our database. 'hashed.salt'
//     // Supplied -> password given to us by a user trying sign in
//     const [hashed, salt] = saved.split('.');
//     const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

//     return hashed === hashedSuppliedBuf.toString('hex');
//   }

//   async writeAll(records) {
//     await fs.promises.writeFile(
//       this.filename,
//       JSON.stringify(records, null, 2)
//     );
//   }

//   randomId() {
//     return crypto.randomBytes(4).toString('hex');
//   }

//   async getOne(id) {
//     const records = await this.getAll();
//     return records.find(record => record.id === id);
//   }

//   async delete(id) {
//     const records = await this.getAll();
//     const filteredRecords = records.filter(record => record.id !== id);
//     await this.writeAll(filteredRecords);
//   }

//   async update(id, attrs) {
//     const records = await this.getAll();
//     const record = records.find(record => record.id === id);

//     if (!record) {
//       throw new Error(`Record with id ${id} not found`);
//     }

//     Object.assign(record, attrs);
//     await this.writeAll(records);
//   }

//   async getOneBy(filters) {
//     const records = await this.getAll();

//     for (let record of records) {
//       let found = true;

//       for (let key in filters) {
//         if (record[key] !== filters[key]) {
//           found = false;
//         }
//       }

//       if (found) {
//         return record;
//       }
//     }
//   }
// }

// module.exports = new UsersRepository('users.json');





/////***************************************** creating class reuse

const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  
  async create(attrs) {
  attrs.id = this.randomId();

  const salt = crypto.randomBytes(8).toString('hex');
  const buf = await scrypt(attrs.password, salt, 64);

  const records = await this.getAll();
  const record = {
    ...attrs,
    password: `${buf.toString('hex')}.${salt}`
  };
  records.push(record);

  await this.writeAll(records);

  return record;
}

async comparePasswords(saved, supplied) {
  // Saved -> password saved in our database. 'hashed.salt'
  // Supplied -> password given to us by a user trying sign in
  const [hashed, salt] = saved.split('.');
  const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

  return hashed === hashedSuppliedBuf.toString('hex');
  }

}

module.exports = new UsersRepository('users.json');





