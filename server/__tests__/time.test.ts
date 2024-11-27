import { UserStats } from '../models/UserStats';
import * as databaseService from '../services/database.service';

describe("Test the database functionality for the statistics", () => {
    const TEST_EMAIL = 'time@email.com';
    beforeEach(async () => {
        await databaseService.deleteUserRecord(TEST_EMAIL);
    });

    test("An initial time should be saved", async () => {
        const stats: UserStats = {
            score: -1,
            mistakes: 999999,
            time: 10000
        };

        // Save the initial Time Stat
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats
        });

        // Fetch the time stat from the database
        const results = await databaseService.getUserStats(TEST_EMAIL);

        // Expect the time stat to be the initial stat
        expect(results.time).toBe(10000);
    });

    test("A better time should be updated", async () => {
        const statsWorst: UserStats = {
            score: -1,
            mistakes: 999999,
            time: 10000
        };

        const statsBetter: UserStats = {
            score: -1,
            mistakes: 999999,
            time: 5000
        };

        // Save the initial Time Stat
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats: statsWorst
        });

        // Save the second game of stats with a better score
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats: statsBetter
        });

        // Fetch the current time stat from the database
        const results = await databaseService.getUserStats(TEST_EMAIL);
        console.log('time stats:', results);

        // Expect the time stat to be the the lower time
        expect(results.time).toBe(5000);
    });
});