import { AppBar, Dialog, DialogContent, Grid, IconButton, ImageList, ImageListItem, Slide, Tab, Tabs, Toolbar, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import ImageMagnifyContainer from "../../../../atoms/ImageMagnifyContainer/ImageMagnifyContainer";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    imageBoxHover: {
        visibility: "hidden",
        "& .MuiImageListItemBar-title": {
            fontSize: "0.8rem"
        },
    },
    imgContainer: {
        cursor: "pointer",
        "&:hover $imageBoxHover": {
            visibility: "visible"
        }
    },

}))

const FlatImagesViewBox = (props) => {
    const { showPlanImage, setshowPlanImage, setCurImg, imgCarouselPos, selectedFlatImg, setValue, curImg, setImgCarouselPos, value, selectedFloor, selectedUnit, imgCarouselType, PlanImageType, commonPlanImg } = props;
    const classes = useStyles();
    const { t } = useTranslation("ProjectDetailsPageTrans");

    const handleTabs = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                if (selectedFloor?.FrId == undefined && selectedUnit?.FrdId == undefined) {
                    selectedFlatImg(commonPlanImg || commonPlanImg, 0, "commonImg");
                    setCurImg(commonPlanImg)
                }
                if (selectedFloor?.FrId || selectedUnit?.FrdId) {
                    selectedFlatImg(selectedFloor?.unitplan || selectedUnit?.unitplan, 1, "unitPlanArray");
                    setCurImg(selectedFloor?.unitplan[1] || selectedUnit?.unitplan[1])
                }
                break;
            case 1:
                selectedFlatImg(selectedFloor?.keyplan || selectedUnit?.keyplan, 0, "keyPlanImg");
                setCurImg(selectedFloor?.keyplan || selectedUnit?.keyplan)
                break;
            // case 2:
            //     viewPlanImage('unitPlan', 0);
            //     setCurImg((projectDetails['unitPlan'][0]))
            //     break;
            // case 3:
            //     viewPlanImage('connectivity', 0);
            //     setCurImg((projectDetails['connectivity']))
            //     break;
            default:
                selectedFlatImg(commonPlanImg || commonPlanImg, 0, "commonImg");
                setCurImg(commonPlanImg)
        }
    };

    return (
        <Dialog open={showPlanImage} fullScreen TransitionComponent={Transition} PaperProps={{
            style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
            },
        }}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => { setshowPlanImage(false); setCurImg("") }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Tabs value={value} onChange={handleTabs} aria-label="basic tabs example">
                        <Tab label={(selectedFloor?.FrId == undefined && selectedUnit?.FrdId == undefined) ? t('selectFlatDialog.floorTab') : t('selectFlatDialog.unitTab')} />
                        {/* <Tab label="Unit Plan" /> */}
                        <Tab label={t('selectFlatDialog.keyTab')} style={{ display: (selectedFloor?.FrId == undefined && selectedUnit?.FrdId == undefined) ? "none" : "" }} />
                        {/* <Tab label="Connectivity" />
                    <Tab label="gallery" /> */}
                    </Tabs>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {imgCarouselType == 'gallery' && (selectedFloor?.FlatNo || selectedUnit?.FlatNo) && <Typography style={{ padding: "8px", fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>Key Plan for Unit No. <span >{selectedFloor?.FlatNo || selectedUnit?.FlatNo}</span></Typography>}
                    </Typography>
                    {/* <Button autoFocus color="inherit" onClick={handleClose}>
                         save
                     </Button> */}
                </Toolbar>
            </AppBar>
            <DialogContent style={{ marginTop: "65px", overflow: "hidden" }}>
                <Grid container xs={12} style={{ width: "100%", height: "100%" }}>
                    <Grid container xs={1} direction="row" justifyContent="flex-start">
                        <Grid item>
                            <ImageList sx={{ width: 80, height: 80 }} cols={1} rowHeight={80} >
                                {((selectedFloor?.FrId || selectedUnit?.FrdId) && imgCarouselType == 'unitPlanArray') && PlanImageType.map((item, index) => (
                                    <ImageListItem key={item} className={classes.imgContainer} style={{ cursor: "default" }} >
                                        <img
                                            onMouseOver={() => { setCurImg(item); setImgCarouselPos(index) }}
                                            style={{
                                                border: imgCarouselPos == index ? "3px solid #f27807" : "1px solid rgba(101, 112, 125, 0.4)",
                                                borderRadius: "10px", width: "80px", height: "80px", cursor: "pointer"
                                            }}
                                            src={item}
                                            srcSet={item}
                                            alt={"img"}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                                {((selectedFloor?.FrId || selectedUnit?.FrdId) && imgCarouselType == 'keyPlanImg') &&
                                    <>
                                        <ImageListItem className={classes.imgContainer} style={{ cursor: "default" }} >
                                            <img
                                                onMouseOver={() => { setCurImg(selectedFloor?.keyplan || selectedUnit?.keyplan); setImgCarouselPos(0) }}
                                                style={{
                                                    border: imgCarouselPos == 0 ? "3px solid #f27807" : "1px solid rgba(101, 112, 125, 0.4)",
                                                    borderRadius: "10px", width: "80px", height: "80px", cursor: "pointer",
                                                }}
                                                src={selectedFloor?.keyplan || selectedUnit?.keyplan}
                                                srcSet={selectedFloor?.keyplan || selectedUnit?.keyplan}
                                                alt={"img"}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                        <ImageListItem className={classes.imgContainer} style={{ cursor: "default" }} >
                                            <img
                                                onMouseOver={() => { setCurImg(selectedFloor?.floorplan || selectedUnit?.floorplan); setImgCarouselPos(1) }}
                                                style={{
                                                    border: imgCarouselPos == 1 ? "3px solid #f27807" : "1px solid rgba(101, 112, 125, 0.4)",
                                                    borderRadius: "10px", width: "80px", height: "80px", cursor: "pointer",
                                                }}
                                                src={selectedFloor?.floorplan || selectedUnit?.floorplan}
                                                srcSet={selectedFloor?.floorplan || selectedUnit?.floorplan}
                                                alt={"img"}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    </>
                                }
                                {(selectedFloor?.FrId == undefined && selectedUnit?.FrdId == undefined) &&
                                    <ImageListItem className={classes.imgContainer} style={{ cursor: "default" }} >
                                        <img
                                            onMouseOver={() => { setCurImg(commonPlanImg); setImgCarouselPos(0) }}
                                            style={{
                                                border: imgCarouselPos == 0 ? "3px solid #f27807" : "1px solid rgba(101, 112, 125, 0.4)",
                                                borderRadius: "10px", width: "80px", height: "80px", cursor: "pointer"
                                            }}
                                            src={commonPlanImg}
                                            srcSet={commonPlanImg}
                                            alt={"img"}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                }
                            </ImageList>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} >
                        <ImageMagnifyContainer img={curImg} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default FlatImagesViewBox;