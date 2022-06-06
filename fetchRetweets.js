require("dotenv").config();

const Twitter = require("./src/utils/Twitter");
const Repo = require("./src/utils/repo");

const tweet = new Twitter(process.env.BEARER_TOKEN);

let allRetweeters = [];

const tweetID = "1533640206674370560";

const repo = new Repo(`./src/tweets/${tweetID}.json`);

(async () => {
    try {
        const res = await tweet.retweeters(tweetID);

        if (res.data) {
            allRetweeters = [...allRetweeters, ...res.data];
        }

        if ("next_token" in res.meta) {
            console.log("nextPage:", res.meta.next_token);

            let morePages = true;
            let nextPage = res.meta.next_token;

            while (morePages) {
                const data = await tweet.retweeters(tweetID, nextPage);

                if (data.data) {
                    allRetweeters = [...allRetweeters, ...data.data];
                }

                if ("next_token" in data.meta) {
                    console.log("nextPage:", data.meta.next_token);

                    nextPage = data.meta.next_token;
                } else {
                    console.log("No more pages");

                    morePages = false;
                }
            }
        }

        await repo.create(allRetweeters);
    } catch (error) {
        console.log(error);
    }
})();
