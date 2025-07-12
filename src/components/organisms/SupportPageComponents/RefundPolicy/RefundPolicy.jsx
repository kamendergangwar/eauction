import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { SupportPagesStyles } from "../SupportPages.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";

const RefundPolicy = (props) => {
  const { width } = props;
  const classes = SupportPagesStyles();
  const { t } = useTranslation("SupportPageTrans");
  const history = useHistory();
  const [policyTableData, setPolicyTableData] = useState([]);

  useEffect(() => {
    let p_table = [
      {
        "td2": t("refundPolicy.section1.tableData.tBody.row1.scenarios"),
        "td3": "100%",
        "td4": t("refundPolicy.section1.tableData.tBody.row1.timeOfRefund")
      },
      {
        "td2": t("refundPolicy.section1.tableData.tBody.row2.scenarios"),
        "td3": "100%",
        "td4": t("refundPolicy.section1.tableData.tBody.row2.timeOfRefund")
      },
      {
        "td2": t("refundPolicy.section1.tableData.tBody.row3.scenarios"),
        "td3": "100%",
        "td4": t("refundPolicy.section1.tableData.tBody.row3.timeOfRefund")
      },
      {
        "td2": t("refundPolicy.section1.tableData.tBody.row4.scenarios"),
        "td3": "",
        "td4": t("refundPolicy.section1.tableData.tBody.row4.timeOfRefund")
      }
    ];
    setPolicyTableData(p_table);
  }, []);

  return (
    <FormCard>
      <Box className={classes.rootContainer}>
        <Typography variant="h2" className={classes.pageTitle}>
          {t("refundPolicy.title")}
        </Typography>
        <Box className={classes.contentSection}>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section1.paragraph1")}
          </Typography>
          <ul>
            <li>{t("refundPolicy.section1.listItems.item1")}</li>
            <li>{t("refundPolicy.section1.listItems.item2")}</li>
            <li>{t("refundPolicy.section1.listItems.item3")}</li>
          </ul>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section1.paragraph2")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section1.paragraph3")}
          </Typography>
          <table className={classes.tableContainer}>
            <thead>
              <tr>
                <th>{t("refundPolicy.section1.tableData.tHead.head1")}</th>
                <th>{t("refundPolicy.section1.tableData.tHead.head2")}</th>
                <th>{t("refundPolicy.section1.tableData.tHead.head3")}</th>
                <th>{t("refundPolicy.section1.tableData.tHead.head4")}</th>
              </tr>
            </thead>
            <tbody>
              {policyTableData.map((element, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{element.td2}</td>
                  <td>{element.td3}</td>
                  <td>{element.td4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box className={classes.contentSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("refundPolicy.section2.title")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section2.paragraph1")}
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section2.contactForm.emailIdLabel")}: <strong>chaitanya@heliosadvisory.com</strong>
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section2.contactForm.contactNumberLabel")}: <strong>9944902899</strong>
          </Typography>
          <Typography className={classes.sectionPara}>
            {t("refundPolicy.section2.contactForm.postalAddressLabel")}: <strong>Commercial Complex, 301, Third Floor, 2, Parsik Hill Marg, Income Tax Colony, Sector 22, CBD Belapur, Navi Mumbai, Maharashtra 400614</strong>
          </Typography>
        </Box>
      </Box>
    </FormCard>
  );
};

export default RefundPolicy;

