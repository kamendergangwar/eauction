import { CardMedia, Container, Grid, ImageListItem, Typography, makeStyles } from '@material-ui/core';
import ReactImageMagnify from 'react-image-magnify';
import DataTableBox from '../DataTableBox/DataTableBox';
import { numberWithCommas } from '../../../utils/util';

const useStyles = makeStyles((theme) => ({
    smallImg: {
        width: "auto",
        height: "auto",
        maxHeight: "500px",
        maxWidth: "100%",
        objectFit: "contain",
        borderRadius: "10px",
        border: "2px solid #f27807",
    },
    largeImg: {
        border: "2px solid #f27807",
        borderRadius: "10px"
    },

    videoContainer: {
        marginTop: "20px",
    },
    video: {
        width: "100%",
        borderRadius: "10px",
    },
    tutorialVideoFrame: {
        height: '100%',
        width: "100%",
        borderRadius: "10px",
    }
}));





const ImageMagnifyContainer = (props) => {
    const { img, shopDetail } = props;
    const classes = useStyles();
    const isVideoLink = (img) => {
        return img && (img.startsWith("http://") || img.startsWith("https://")) && (img.includes("youtube.com") || img.includes("youtu.be")) || img.includes("my.matterport.com");
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                {isVideoLink(img) ? (
                    <CardMedia
                        // onMouseOver={() => setCurImg(null)}
                        component="iframe"
                        src={img}
                        title="Video"
                        autoPlay
                        loop
                        controls
                        className={classes.tutorialVideoFrame}
                    />
                ) : (
                    <CardMedia
                        component="img"
                        image={img}
                        alt="unit/key Plan image"
                        className={classes.smallImg}
                    />
                )}
            </Grid>
            <Grid item xs={5} area-aria-label='shop details'>
                <div className={classes.detailContainer}>
                    <Grid
                        container
                        justifyContent="flex-start"
                        style={{ borderBottom: "1px solid #fff" }}
                    >
                        <Typography variant='h6' style={{ color: '#fff' }}>
                            Shop Details for {shopDetail.name}
                        </Typography>
                    </Grid>
                    <DataTableBox label={"Tender No."} value={shopDetail.tenderNo} color='#fff' fontWeight='600' fontSize='1.1rem' />
                    <DataTableBox label={"Tower No."} value={shopDetail.shop_tower} color='#fff' fontWeight='600' fontSize='1.1rem' />
                    <DataTableBox label={"SHOP No."} value={shopDetail.shopNo} color='#fff' fontWeight='600' fontSize='1.1rem' />
                    <DataTableBox label={"Area"} value={` (${shopDetail.shop_area})`} color='#fff' fontWeight='600' fontSize='1.1rem' />
                    <DataTableBox
                        label={"Base Price"}
                        value={`₹ ${numberWithCommas(shopDetail.base_price)}`}
                        color='#fff' fontWeight='600' fontSize='1.1rem'
                    />
                    <DataTableBox
                        label={"EMD"}
                        value={`₹ ${numberWithCommas(shopDetail.emd)}`}
                        color='#fff' fontWeight='600' fontSize='1.1rem'
                    />
                    <DataTableBox
                        label={"Auction Increment Factor"}
                        value={`₹ ${numberWithCommas(shopDetail.auctionIncrementValue)}`}
                        color='#fff' fontWeight='600' fontSize='1.1rem'
                    />
                </div>
            </Grid>
        </Grid >
    )
}

export default ImageMagnifyContainer;