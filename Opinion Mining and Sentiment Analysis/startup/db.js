import mysql from 'mysql2/promise';

const connect = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'task',
    password: ""
});

async function migration() {
    await connect.execute(
        "CREATE TABLE IF NOT EXISTS `users` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL, `email` VARCHAR(250) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,`password` VARCHAR(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,  `date_modified` TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,  `date_added` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`))"
    );
}

migration();
export default connect;