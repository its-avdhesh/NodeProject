import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();
const TOTAL_BOXES = 50;

// Generate 50 unique UTC days
const getUniqueDaysUTC = (count) => {
    const days = new Set();
    while (days.size < count) {
        days.add(random.int(1, 364));
    }
    return [...days];
};

const makeCommits = async () => {
    const days = getUniqueDaysUTC(TOTAL_BOXES);

    for (let i = 0; i < days.length; i++) {
        // Force UTC midnight (prevents collisions)
        const date = moment.utc()
            .subtract(days[i], "days")
            .hour(0)
            .minute(0)
            .second(0)
            .format();

        await jsonfile.writeFile(FILE_PATH, { date });

        await git.add([FILE_PATH]);
        await git.commit(`UTC daily commit: ${date}`, {
            "--date": date,
        });

        console.log(`🟩 Box ${i + 1}/50 → ${date}`);
    }
};

makeCommits()
    .then(() => console.log("🎉 Exactly 50 GitHub boxes generated"))
    .catch(console.error);
