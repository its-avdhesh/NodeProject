import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

/**
 * Make multiple backdated commits
 * @param {number} n - number of commits
 */
const makeCommits = async (n) => {
    for (let i = 0; i < n; i++) {
        // Pick a random day within the last 365 days
        const date = moment()
            .subtract(random.int(0, 364), "days")
            .format();

        const data = { date };

        // Write date to file
        await jsonfile.writeFile(FILE_PATH, data);

        // Stage & commit with backdated author date
        await git.add([FILE_PATH]);
        await git.commit(`Backdated commit: ${date}`, {
            "--date": date,
        });

        console.log(`✅ Commit ${i + 1} created at ${date}`);
    }
};

// 🔢 Change this number to control how many commits you want
makeCommits(50)
    .then(() => console.log("🎉 All commits created successfully"))
    .catch((err) => console.error("❌ Error:", err));
