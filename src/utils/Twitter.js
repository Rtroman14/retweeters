require("dotenv").config();

const axios = require("axios");

const PARAMS = "user.fields=public_metrics,created_at,verified";

module.exports = class Twitter {
    constructor(bearer) {
        if (!bearer) {
            throw new Error("Using Twitter requires an API key.");
        }

        this.bearer = bearer;
    }

    config(method, slug) {
        try {
            return {
                method,
                url: `https://api.twitter.com/2/tweets/${slug}`,
                headers: {
                    Authorization: `Bearer ${this.bearer}`,
                },
            };
        } catch (error) {
            console.log("config()", error);
        }
    }

    async retweeters(id, pageToken = false) {
        let page = "";

        if (pageToken) {
            page = `&pagination_token=${pageToken}`;
        }

        const slug = `${id}/retweeted_by?${PARAMS}${page}`;

        try {
            const config = this.config("get", slug);

            const { data } = await axios(config);

            return data;
        } catch (error) {
            console.log("retweeters()", error);
        }
    }
};
