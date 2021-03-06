const {ApolloServer, gql} = require('apollo-server');
const {getDB} = require('./mysql');

const typeDefs = gql`
  type User {
   id:Int,
   name:String,
   age:Int,
   job:String,
   gender:String
  }
  
  type Query {
    allUsers: [User]
  }
  type Mutation{
    addUser(name:String,age:Int,job:String,gender:String):User
    deleteUser(id:Int):Boolean
    updateUser(id:Int,name:String,age:Int,job:String,gender:String):User
  }

`;


const resolvers = {
    Query: {
        /**
        * query to get all user
        *@param db - db connection
        */
        allUsers: async (_, __, {db}) => {
            return new Promise((res, rej) => {
                db.query("SELECT * FROM user", (err, users) => {
                    if (err) {
                        rej(err);
                        console.log(err);
                    } else {
                        res(users);
                    }
                });
            });
        },
    },

    Mutation: {
        /**
         *  add new user to db
         * @param db - db connection
         */
        addUser: async (_, {name, age, job, gender}, {db}) => {
            return new Promise((res, rej) => {
                db.query(`INSERT INTO user SET name = ?, age = ?, job = ?, gender = ? `, [name, age, job, gender], (err, result) => {
                    if (err) {
                        rej(err);
                    } else {
                        res({
                            id: result.insertId,
                            name,
                            age,
                            job,
                            gender
                        });
                    }
                });
            })
        },

        /**
         * delete one user from db
         * @param db - db connection
         */
        deleteUser: async (_, {id}, {db}) => {
            return new Promise((res, rej) => {
                db.query(`DELETE FROM user WHERE id = ?`, id, (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(true);
                    }
                });
            })
        },

        /**
         * update user
         * @param db - db connection
         */
        updateUser: async (_, {id, name, age, gender, job}, {db}) => {
            console.log(id,name,age,gender)
            return new Promise((res, rej) => {
                db.query(`UPDATE user SET name = ?,age = ?, gender = ?, job = ?  WHERE id = ?`, [name, age, gender, job, id], (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res({id, name, age, gender, job});
                    }
                });
            })
        },
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        db: await getDB()
    })
});


server.listen().then(({url}) => {
    console.log(`????  Server ready at ${url}`);
});