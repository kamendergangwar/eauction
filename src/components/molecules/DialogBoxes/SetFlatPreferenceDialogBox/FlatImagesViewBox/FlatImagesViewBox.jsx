import { AppBar, CardMedia, Dialog, DialogContent, Grid, IconButton, ImageList, ImageListItem, Slide, Tab, Tabs, Toolbar, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import ImageMagnifyContainer from "../../../../atoms/ImageMagnifyContainer/ImageMagnifyContainer";
import { useTranslation } from "react-i18next";
import { TabContext, TabPanel } from "@material-ui/lab";
import playButton from '../../../../../assets/playButton.jpg'
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
    imageList: {

    },
    tutorialVideoFrame: {
        borderRadius: 8
    }
}))

const FlatImagesViewBox = (props) => {
    const { showDetails, onCloseShowDetail, data, startTab = 0 } = props;
    const [value, setValue] = useState(startTab);
    const [curImg, setCurImg] = useState(data?.areas[startTab]?.other_images[0]);
    const classes = useStyles();
    const { t } = useTranslation("ProjectDetailsPageTrans");

    const handleTabs = (event, newValue) => {
        setValue(newValue);
        setCurImg(data.areas[newValue].other_images[0]);
    };

    const handleImageHover = (image) => {
        setCurImg(image);
    };

    return (
        <Dialog open={showDetails} fullScreen TransitionComponent={Transition} PaperProps={{
            style: {
                backdropFilter: 'blur(3px)', backgroundColor: 'rgb(50 56 62 / 25%)'
            },
        }}>
            <TabContext value={value.toString()}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onCloseShowDetail}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        {/* <Tabs value={value} onChange={handleTabs}>
                            {data?.areas?.map((item, index) =>
                                <Tab label={item.name} id={index} />
                            )}
                        </Tabs> */}
                        <Tabs value={0} aria-label="basic tabs example">
                            <Tab label={"Shop View"} />
                        </Tabs>
                        {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {imgCarouselType == 'gallery' && (selectedFloor?.FlatNo || selectedUnit?.FlatNo) && <Typography style={{ padding: "8px", fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>Key Plan for Unit No. <span >{selectedFloor?.FlatNo || selectedUnit?.FlatNo}</span></Typography>}
                    </Typography> */}
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                         save
                     </Button> */}
                    </Toolbar>
                </AppBar>
                <DialogContent style={{ marginTop: "65px", overflow: "hidden" }}>
                    {data?.areas.map((shop, index) =>
                        <TabPanel value={index.toString()} index={index}>
                            <Grid container xs={12} style={{ width: "100%", height: "100%" }}>
                                <Grid container xs={1} direction="row" justifyContent="flex-start">
                                    <Grid item>
                                        <ImageList sx={{ width: 80, height: 80 }} cols={1} rowHeight={80} >
                                            {shop.other_images.map((item, imageIndex) => (
                                                <ImageListItem onMouseOver={() => handleImageHover(item)} key={index} className={classes.imgContainer} style={{ cursor: "default" }} >
                                                    {/* <img
                                                        onMouseOver={() => setCurImg(item)}
                                                        className={classes.imageList}
                                                        style={{
                                                            border: curImg == item ? "3px solid #f27807" : "1px solid rgba(101, 112, 125, 0.4)",
                                                            borderRadius: "10px", width: "80px", height: "80px", cursor: "pointer"
                                                        }}
                                                        src={item}
                                                        alt={`img-${index}-${imageIndex}`}
                                                        loading="lazy"
                                                    /> */}


                                                    {item.endsWith(".jpg") || item.endsWith(".png") || item.endsWith(".jpeg") ? (
                                                        <img
                                                            onMouseOver={() => setCurImg(item)}
                                                            className={classes.imageList}
                                                            style={{
                                                                border: curImg === item ? "3px solid #f27807" : "1px solid rgba(101, 112, 125, 0.4)",
                                                                borderRadius: "10px",
                                                                width: "80px",
                                                                height: "80px",
                                                                cursor: "pointer"
                                                            }}
                                                            src={item}
                                                            alt={`img-${index}-${imageIndex}`}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <img
                                                            className={classes.imageList}
                                                            style={{
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                width: "80px",
                                                                height: "80px",
                                                                cursor: "pointer"
                                                            }}
                                                            src={playButton}
                                                            alt={`play-button-${index}-${imageIndex}`}
                                                           
                                                        />
                                                    )}
                                                </ImageListItem>
                                            ))}
                                        </ImageList>


                                    </Grid>
                                </Grid>
                                <Grid item xs={11} >
                                    <ImageMagnifyContainer img={curImg} shopDetail={data?.areas[value]} />

                                </Grid>
                        
                            </Grid>
                        </TabPanel>)}
                </DialogContent>
            </TabContext>
        </Dialog>
    )
}

export default FlatImagesViewBox;


