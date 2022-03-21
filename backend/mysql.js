const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "demo",
    port: 52000,
    multipleStatements: true,
});

const CREATE_USER= `
CREATE TABLE IF NOT EXISTS user (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  age tinyint(1) unsigned NOT NULL ,
  gender varchar(50)  NOT NULL,
  job varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO user (name,age,gender,job) VALUES ("test",15,"helicopter","asdad");
`;

let dbInit = false;

/** 
 * create new user table if not exist
 * create pooling connection
 * @return pooling connection
 */
const getDB = async () => {
    if (!dbInit) {
        return new Promise((resolve, reject) => {
            pool.query(CREATE_USER, (error) => {
                if (error) {
                    console.log(error)

                    return reject(error);
                } else {
                    console.log("MySQL is connected and setup");
                    dbInit = true;
                    return resolve(pool);
                }
            });
        });
    } else {
        return pool;
    }

};

module.exports = {
    getDB,
};