import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TwitterTweetEmbed } from "react-twitter-embed";

import { Grid, Paper, Skeleton, Button } from "@mui/material";

import styles from "../../styles/Home.module.css";

import Table from "../../src/components/Table/Table";

import { useLocalStorage, writeStorage, deleteFromStorage } from "@rehooks/local-storage";

export default function Retweeters() {
    const router = useRouter();

    const { id } = router.query;

    const [loading, setLoading] = useState(false);

    const [retweeterStorage] = useLocalStorage(id);

    useEffect(() => {
        if (typeof id === "string") {
            setLoading(true);

            let domain = "http://localhost:3000";
            if (process.env.NODE_ENV === "production") {
                domain = "";
            }

            if (retweeterStorage === null) {
                fetch(`${domain}/api/retweeters/${id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        writeStorage(id, data);
                    });
            }

            setLoading(false);
        }
    }, [id, retweeterStorage]);

    return (
        <div className={styles.container}>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={5}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "80%",
                    }}>
                    <div style={{ width: "60%" }}>
                        {typeof id === "string" ? (
                            <TwitterTweetEmbed tweetId={id} />
                        ) : (
                            <Skeleton variant="rectangular" width={400} height={700} />
                        )}
                    </div>
                </Grid>
                <Grid
                    item
                    xs={7}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Paper sx={{ backgroundColor: "#1A2027", height: "500px", width: "100%" }}>
                        <Table retweeters={retweeterStorage || []} loading={loading} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
