import { Dialect } from "sequelize"

const dbConfig= {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root.Password66',
    DB: 'book_library',
    dialect: 'mysql' as Dialect,
    pool: {
        max: 10,
        min: 1
    }
}
export default dbConfig