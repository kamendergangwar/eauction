import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
        border: '2px solid #0151CA',
        boxShadow: '0px 0px 20px rgba(1, 81, 202, 0.1)',
        overflow: 'initial',
        marginBottom: '16px'
    },
    dataValueView: {
        background: "#EEEEEE",
        padding: "4px",
        margin: "4px 4px 4px 0",
        borderRadius: " 5px"
    },
    dataTitle: {
        textAlign: "center",
        color: "#65707D",
        fontWeight: 600,
        fontSize: "0.7rem",
    },
    dataValue: {
        textAlign: "center",
        color: "#00437E",
        fontWeight: "bold",
        fontSize: "0.7rem",
    },
});

export default function ProjectMapCard(props) {
    const { project, flyToProject } = props;
    const classes = useStyles();
    const { t } = useTranslation("ProjectDetailsPageTrans");
    console.log(project);
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => flyToProject(JSON.parse(project.mainCordinates))}>
                <CardMedia
                    component="img"
                    alt="Project Cover image"
                    height="80"
                    image={project.images[0]}
                    title="Project Cover Image"
                />
                <CardContent style={{ padding: '4px 8px' }}>
                    <Typography gutterBottom style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        {project.ProjectName}
                    </Typography>
                    <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly">
                        <Typography className={classes.dataTitle}>
                            {t("projectMap.totalUnitsTxt")}
                            <br />
                            <span className={classes.dataValue}>
                                {project.No_Of_Units}
                            </span>
                        </Typography>
                        <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
                        <Typography className={classes.dataTitle}>
                            {t("projectCard.legends.available")}
                            <br />
                            <span className={classes.dataValue} style={{ color: "#0DC143", fontWeight: "900", textShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)" }}>
                                {project.No_Of_Units_Available}
                            </span>
                        </Typography>
                    </Grid>

                    <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly" >
                        <Typography className={classes.dataTitle}>
                            {t("projectCard.numberOfFloors")}
                            <br />
                            <span className={classes.dataValue}>
                                {project.No_Of_Floors}
                            </span>
                        </Typography>
                        <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
                        <Typography className={classes.dataTitle}>
                            {t("projectCard.numberOfTower")}
                            <br />
                            <span className={classes.dataValue}>
                                {project.No_Of_Towers}
                            </span>
                        </Typography>
                        <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
                        <Typography className={classes.dataTitle}>
                            {t("projectCard.typeLabel")}
                            <br />
                            <span className={classes.dataValue}>
                                {project.Flat_Type?.map(
                                    (type, index) => (
                                        <>
                                            {`${type} ` || "--"}
                                            {(index != project.Flat_Type.length - 1) && <span>, </span>}

                                        </>
                                    )
                                )}
                            </span>
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>
            </CardActions> */}
        </Card>
    );
}