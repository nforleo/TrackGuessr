import { UserStats } from '../models/UserStats';
import * as databaseService from '../services/database.service';

describe("Test the database functionality for the statistics", () => {
    const TEST_EMAIL = 'test@email.com';
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

        // Expect the time stat to be the the lower time
        expect(results.time).toBe(5000);
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

    test("A higher score should be updated", async () => {
        const statsWorst: UserStats = {
            score: 5,
            mistakes: 999999,
            time: 10000
        };

        const statsBetter: UserStats = {
            score: 9,
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
        expect(results.mistakes).toBe(9);
    });
});