import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'tushar123',
    database: 'EmployeeManagement',
    port: 5433
});