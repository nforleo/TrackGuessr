import { UserStats } from '../models/UserStats';
import * as databaseService from '../services/database.service';

describe("Test the database functionality for the statistics", () => {
    const TEST_EMAIL = 'score@email.com';
     beforeEach(async () => {
        await databaseService.deleteUserRecord(TEST_EMAIL);
    });
    test("An initial score should be saved", async () => {
        const stats: UserStats = {
            score: 1,
            mistakes: 999999,
            time: 10000
        };

        // Save the initial score Stat
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats
        });

        // Fetch the score stat from the database
        const results = await databaseService.getUserStats(TEST_EMAIL);

        // Expect the score stat to be the initial stat
        expect(results.score).toBe(1);
    });

    test("A higher score should be updated", async () => {
        const statsWorst: UserStats = {
            score: 5,
            mistakes: 999999,
            time: 10000
        };

        const statsBetter: UserStats = {
            score: 9,
            mistakes: 555,
            time: 5001
        };

        // Save the initial mistakes Stat
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats: statsWorst
        });

        // Save the second game of stats with a better number of mistakes
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats: statsBetter
        });

        // Fetch the current mistakes stat from the database
        const results = await databaseService.getUserStats(TEST_EMAIL);

        // Expect the mistakes stat to be the the lower time
        expect(results.score).toBe(9);
    });

    test("A lower score should not be updated", async () => {
        const statsWorst: UserStats = {
            score: 5,
            mistakes: 999999,
            time: 10000
        };

        const statsBetter: UserStats = {
            score: 9,
            mistakes: 555,
            time: 5001
        };

        // Save the initial mistakes Stat
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats: statsBetter
        });

        // Save the second game of stats with a better number of mistakes
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats: statsWorst
        });

        // Fetch the current mistakes stat from the database
        const results = await databaseService.getUserStats(TEST_EMAIL);

        // Expect the mistakes stat to be the the lower time
        expect(results.score).toBe(9);
    });
});