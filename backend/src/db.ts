import pkg from 'pg';
const { Pool } = pkg;

export const pool  = new Pool({
    user: "skilluser",
    host: "localhost",
    database: "skilllens",
    password: "skillpass",
    port: 5432,
});