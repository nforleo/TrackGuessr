import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const user = process.env.PG_USER;
const password = process.env.PG_PASS

console.log(`${user}:${password}`);

const pool = new Pool({
    user,
    host: 'localhost',
    database: 'postgres',
    password,
    port: 30432
});

export default pool;
