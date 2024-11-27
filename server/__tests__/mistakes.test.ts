import { UserStats } from '../models/UserStats';
import * as databaseService from '../services/database.service';

describe("Test the database functionality for the statistics", () => {
    const TEST_EMAIL = 'mistakes@email.com';
    beforeEach(async () => {
        await databaseService.deleteUserRecord(TEST_EMAIL);
    });
    test("An initial number of mistakes should be saved", async () => {
        const stats: UserStats = {
            score: -1,
            mistakes: 999999,
            time: 10000
        };

        // Save the initial mistakes Stat
        await databaseService.updateStats({
            email: TEST_EMAIL,
            stats
        });

        // Fetch the mistakes stat from the database
        const results = await databaseService.getUserStats(TEST_EMAIL);

        // Expect the mistakes stat to be the initial stat
        expect(results.mistakes).toBe(999999);
    });

    test("A better number of mistakes should be updated", async () => {
        const statsWorst: UserStats = {
            score: -1,
            mistakes: 999999,
            time: 10000
        };

        const statsBetter: UserStats = {
            score: -1,
            mistakes: 555,
            time: 5000
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
        expect(results.mistakes).toBe(555);
    });
});