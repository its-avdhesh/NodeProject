import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

const TOTAL_DAYS = 50;

/**
 * Generate unique random days in the last year
 */
const getUniqueDays = (count) => {
    const days = new Set();

    while (days.size < count) {
        days.add(random.int(0, 364));
    }

    return [...days];
};

const makeCommits = async () => {
    const uniqueDays = getUniqueDays(TOTAL_DAYS);

    for (let i = 0; i < uniqueDays.length; i++) {
        const date = moment()
            .subtract(uniqueDays[i], "days")
            .hour(12)
            .minute(0)
            .second(0)
            .format();

        await jsonfile.writeFile(FILE_PATH, { date });

        await git.add([FILE_PATH]);
        await git.commit(`Daily commit: ${date}`, {
            "--date": date,
        });

        console.log(`✅ Box ${i + 1}/50 → ${date}`);
    }
};

makeCommits()
    .then(() => console.log("🎉 50 unique-day commits created"))
    .catch(console.error);
