import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Function to make multiple commits
const makeCommits = async (n) => {
    if (n <= 0) return;

    const x = random.int(0, 54); // Random week offset
    const y = random.int(0, 6);  // Random day offset
    const date = moment()
        .subtract(1, "y")
        .add(x, "w")
        .add(y, "d")
        .format();

    const data = { date };

    jsonfile.writeFile(path, data, async () => {
        try {
            await git.add([path]);
            await git.commit(date, { "--date": date });
            console.log(`Commit ${n} made at ${date}`);

            // Recursively make more commits
            await makeCommits(n - 1);
        } catch (error) {
            console.error("Git commit error:", error);
        }
    });
};

// Start committing process
makeCommits(100); // Change 10 to the number of commits you want
