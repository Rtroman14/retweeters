const Twitter = require("../../../src/utils/Twitter");
// const Repo = require("../../../src/utils/repo");

export default async function fetchRetweeters(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        const tweet = new Twitter(process.env.BEARER_TOKEN);

        let allRetweeters = [];

        // const repo = new Repo(`../../../src/tweets/${id}.json`);

        try {
            const res = await tweet.retweeters(id);

            if (res.data) {
                allRetweeters = [...allRetweeters, ...res.data];
            }

            if ("next_token" in res.meta) {
                console.log("nextPage:", res.meta.next_token);

                let morePages = true;
                let nextPage = res.meta.next_token;

                while (morePages) {
                    const data = await tweet.retweeters(id, nextPage);

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

            // await repo.create(allRetweeters);
        } catch (error) {
            console.log(error);
        }

        res.status(200).json(allRetweeters);
    } else {
        res.status(500).json(false);
    }
}
