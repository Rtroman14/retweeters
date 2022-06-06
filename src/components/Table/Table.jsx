import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import { MdVerified } from "react-icons/md";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function kFormatter(num) {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
}

const columns = [
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: ({ row }) => {
            return (
                <a href={`https://twitter.com/${row.username}`} target="_blank" rel="noreferrer">
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255,255,255,.8)",
                        }}>
                        {row.name} {row.verified && <MdVerified />}
                    </Typography>
                </a>
            );
        },
    },
    {
        field: "followersCount",
        headerName: "Follower Count",
        flex: 1,
        renderCell: ({ row }) => {
            return (
                <Typography
                    variant="body1"
                    sx={{
                        color: "rgba(255,255,255,.8)",
                    }}>
                    {kFormatter(row.followersCount)}
                </Typography>
            );
        },
    },
];

export default function DataGridDemo({ retweeters, loading }) {
    const rows = retweeters?.map((user) => ({
        id: user.username,
        name: user.name,
        username: user.username,
        followersCount: user.public_metrics.followers_count,
        verified: user.verified,
    }));

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
                components={{
                    Toolbar: CustomToolbar,
                }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[25]}
                disableSelectionOnClick
                loading={loading}
                sx={{
                    ".MuiDataGrid-columnHeaders": {
                        color: "#fff",
                        fontSize: "17px",
                    },
                    ".MuiButton-root": {
                        color: "rgba(255,255,255,.8)",
                    },
                }}
            />
        </div>
    );
}
