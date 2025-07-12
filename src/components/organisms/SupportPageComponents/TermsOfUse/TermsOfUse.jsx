import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SupportPagesStyles } from "../SupportPages.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";

const TermsOfUse = (props) => {
  const { width } = props;
  const classes = SupportPagesStyles();
  const { t } = useTranslation("SupportPageTrans");
  const history = useHistory();

  return (
    <FormCard>
      <Box className={classes.rootContainer}>
        <Typography variant="h2" className={classes.pageTitle}>
          {t("termsOfUse.title")}
        </Typography>
        <Box className={classes.contentSection}>
          <Typography variant="h2" className={classes.pageSubTitle}>
            {t("termsOfUse.section1.title")}
          </Typography>
          <ol>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner1.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner1.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner1.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner1.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner1.paragraph4")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner2.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={`${classes.sectionPara} bold`}>
                    {t("termsOfUse.section1.secInner2.paragraph1")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para1List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para1List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para1List.item3")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para1List.item4")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para1List.item5")}
                      </Typography>
                    </li>
                  </ol>
                  <Typography className={`${classes.sectionPara} note`}>
                    {t("termsOfUse.section1.secInner2.para1NoteTxt")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner2.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner2.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner2.paragraph4")}
                  </Typography>
                </li>
                <li>
                  <Typography className={`${classes.sectionPara} bold`}>
                    {t("termsOfUse.section1.secInner2.paragraph5")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para5List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para5List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para5List.item3")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para5List.item4")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner2.para5List.item5")}
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner2.paragraph6")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner3.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={`${classes.sectionPara} bold`}>
                    {t("termsOfUse.section1.secInner3.paragraph1")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item3")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item4")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item5")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item6")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner3.para1List.item7")}
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner3.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner3.paragraph3")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner4.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner4.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner4.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner4.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner4.paragraph4")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner5.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner5.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner5.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner5.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner5.paragraph4")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner5.paragraph5")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner6.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={`${classes.sectionPara} bold`}>
                    {t("termsOfUse.section1.secInner6.paragraph1")}
                  </Typography>
                </li>
                <ol type="a" className={classes.alphabeticalOrderList}>
                  <li>
                    <Typography className={classes.sectionPara}>
                      {t("termsOfUse.section1.secInner6.para1List.item1")}
                    </Typography>
                  </li>
                  <li>
                    <Typography className={classes.sectionPara}>
                      {t("termsOfUse.section1.secInner6.para1List.item2")}
                    </Typography>
                  </li>
                  <li>
                    <Typography className={classes.sectionPara}>
                      {t("termsOfUse.section1.secInner6.para1List.item3")}
                    </Typography>
                  </li>
                </ol>
                <Typography className={`${classes.sectionPara} note`}>
                  {t("termsOfUse.section1.secInner6.para1NoteTxt")}
                </Typography>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner7.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner7.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner7.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner7.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner7.paragraph4")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner7.paragraph5")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner8.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner8.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner8.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={`${classes.sectionPara} bold`}>
                    {t("termsOfUse.section1.secInner8.paragraph3")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item3")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item4")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item5")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item6")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item7")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item8")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item9")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item10")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item11")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item12")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item13")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item14")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item15")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item16")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item17")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner8.para3List.item18")}
                      </Typography>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner9.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={`${classes.sectionPara} bold`}>
                    {t("termsOfUse.section1.secInner9.paragraph1")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner9.para1List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner9.para1List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner9.para1List.item3")}
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner9.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner9.paragraph3")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner10.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner10.paragraph1")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner10.para1List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner10.para1List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner10.para1List.item3")}
                      </Typography>
                    </li>
                  </ol>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner10.paragraph2")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner11.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner11.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner11.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner11.paragraph3")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner12.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner12.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner12.paragraph2")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner13.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner13.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner13.paragraph2")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner14.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner14.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner14.paragraph2")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner15.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner15.paragraph1")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner16.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner16.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner16.paragraph2")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner17.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner17.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner17.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner17.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner17.paragraph4")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner17.paragraph5")}
                  </Typography>
                </li>
              </ol>
            </li>
            <li className={classes.contentSection}>
              <Typography className={classes.sectionTitle}>{t("termsOfUse.section1.secInner18.title")}</Typography>
              <ol className={classes.innerContSec}>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner18.paragraph1")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner18.paragraph2")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner18.paragraph3")}
                  </Typography>
                </li>
                <li>
                  <Typography className={classes.sectionPara}>
                    {t("termsOfUse.section1.secInner18.paragraph4")}
                  </Typography>
                  <ol type="a" className={classes.alphabeticalOrderList}>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner18.para4List.item1")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner18.para4List.item2")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner18.para4List.item3")}
                      </Typography>
                    </li>
                    <li>
                      <Typography className={classes.sectionPara}>
                        {t("termsOfUse.section1.secInner18.para4List.item4")}
                      </Typography>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </Box>
      </Box>
    </FormCard>
  );
};

export default TermsOfUse;

