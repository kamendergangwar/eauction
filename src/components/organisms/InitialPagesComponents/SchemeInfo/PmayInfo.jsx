import React, { useEffect, useRef } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { initialPagesStyles } from "../InitialPages.styles";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";

const PmayInfo = (props) => {
    const { width } = props;
    const classes = initialPagesStyles();

    return (
        <AuthTemplate style={{ width: "800px" }}>
            <Box style={{ padding: "20px", textAlign: "center", fontSize: "1.1rem" }}>
                <Typography variant="h4" style={{ paddingBottom: "20px" }}>PMAY</Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit asperiores deserunt ea adipisci non? Quaerat, quos molestias vitae sequi esse sunt quibusdam ducimus animi ipsam aperiam, illo sit vero voluptatum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit asperiores deserunt ea adipisci non? Quaerat, quos molestias vitae sequi esse sunt quibusdam ducimus animi ipsam aperiam, illo sit vero voluptatum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit asperiores deserunt ea adipisci non? Quaerat, quos molestias vitae sequi esse sunt quibusdam ducimus animi ipsam aperiam, illo sit vero voluptatum!
            </Box>
        </AuthTemplate >
    );
};

export default PmayInfo;
