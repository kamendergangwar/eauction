import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import DataNoteFoundIcon from "../../../assets/DataNotFoundIcon.png";
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { DefaultMessageBoxStyles } from "./DefaultMessageBox.styles";
import IconTitle from "../IconTitle/IconTitle";
import {
  ToolsIcon,
  GrevianceBannerIcon,
} from "../SvgIcons/SvgIcons";

const DefaultMessageBox = (props) => {
  const classes = DefaultMessageBoxStyles();
  const { t } = useTranslation("DashboardPageTrans");

  return (
    <div>
      <Box textAlign="center" paddingY={8}>
        <Box className={classes.errorMsgView}>
          <Box marginBottom={1}>
            <img src={DataNoteFoundIcon} width={150} />
          </Box>
          <Typography style={{ fontSize: 16 }}>{props.firstLineMsg}</Typography>
          <Typography style={{ fontSize: 16 }}>{props.secdLineMsg}</Typography>
        </Box>
        {/* <Button variant="contained"
          color="primary"
          size="large" endIcon={<ChevronRightOutlinedIcon />} onClick={() => props.action()}>{props.actionBtnTxt}</Button> */}
      </Box>
    </div>
  );
};

export default DefaultMessageBox;
