import pool from "../utils/database";
import { DatabaseResults } from "../models/DatabaseResults";
import { UserStats } from "../models/UserStats";

interface UpdateStats {
    email: string;
    stats: UserStats
}

export const updateStats = async ({
    email,
    stats
}: UpdateStats): Promise<void> => {
    // Check For existing records
    const results = await fetchUserRecord(email);
    if (results) {
        // If existing, then compare values and maybe update
        const newStats: UserStats = {
            mistakes: Math.min(stats.mistakes, results.lowest_num_mistakes),
        };
        updateUserRecord(email, newStats);
    } else {
        // Else, just insert
        await insertUserRecord(email, stats);
    }
}

export const fetchUserRecord = async (email: string): Promise<DatabaseResults> => {
    const select = `SELECT * FROM stats WHERE email = '${email}'`;
    try {
        const result = await pool.query(select);

        return result.rows[0] as DatabaseResults;
    } catch (err: unknown) {
        throw new Error(`Error fetching from database`);
    }
}

export const insertUserRecord = async (email: string, stats: UserStats): Promise<void> => {
    const insert = `INSERT INTO stats(email, fastest_time, lowest_num_mistakes, score) VALUES ('${email}', ${stats.time}, ${stats.mistakes}, ${stats.score})`;
     try {
        await pool.query(insert);
    } catch (err: unknown) {
        console.log(err);
        throw new Error(`Error inserting into database`);
    }
}

export const updateUserRecord = async (email: string, stats: UserStats): Promise<void> => {
    const update = `UPDATE stats SET fastest_time = ${stats.time}, lowest_num_mistakes = ${stats.mistakes}, score = ${stats.score} WHERE email = '${email}'`;
    try {
        await pool.query(update);
    } catch (err: unknown) {
        throw new Error(`Error updating database`);
    }
}

export const deleteUserRecord = async (email: string): Promise<void> => {
    const deleteQuery = `DELETE FROM stats WHERE email ='${email}'`;
    try {
        await pool.query(deleteQuery);
    } catch (err: unknown) {
        throw new Error(`Error updating database`);
    }
}   

export const getUserStats = async (email: string): Promise<UserStats> => {
    const stats = await fetchUserRecord(email);

    return {
        score: stats?.score,
        mistakes: stats?.lowest_num_mistakes,
        time: stats?.fastest_time
    };
}