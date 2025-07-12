// import React, { useRef, useState, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import ReactDOM from "react-dom"
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './Map.css'; // Import your CSS for styling the map and tooltips
// import pinImg from '../../../../assets/image_mapping/pinPng.png';
// // import { geoJson } from './geoJson';
// import { useTranslation } from 'react-i18next';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { useDispatch } from 'react-redux';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import { SelectProjectMapStyles } from './ProjectMap.styles';
// import { Box, Button, CardMedia, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Snackbar, Tooltip, Typography, Zoom, withStyles } from '@material-ui/core';
// import SetFlatPerferenceDialogBox from '../../../molecules/DialogBoxes/SetFlatPreferenceDialogBox/SeltFlatPreferenceDialogBox';
// import ImageMapper from 'react-img-mapper';
// import { Alert } from '@material-ui/lab';
// import { mapbox_token } from '../../../../utils/Common';
// import ProjectMapCard from './ProjectMapCard/ProjectMapCard';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
// import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

// mapboxgl.accessToken = mapbox_token;

// const CustomTooltip = withStyles({
//     tooltip: {
//         backgroundColor: "#FFFFFF",
//         color: "rgba(0, 0, 0, 0.87)",
//         fontSize: 11,
//         boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
//         borderRadius: "8px",
//         border: "1px solid rgba(0, 56, 192, 1)",
//     },
//     arrow: {
//         "&:before": {
//             border: "1px solid rgba(0, 56, 192, 1)",
//         },
//         color: "#FFFFFF",
//     },
// })(Tooltip);


// //Project on hover tooltip
// const ProjectTooltip = (props) => {
//     const { area } = props;
//     console.log(area);
//     const classes = SelectProjectMapStyles();
//     const { t } = useTranslation("ProjectDetailsPageTrans");
//     return (
//         <>
//             {area.length > 0 &&
//                 <span>
//                     <Typography style={{ fontWeight: "700", padding: 5, color: "#00437E", textAlign: "start" }}>{area[0].ProjectName}</Typography>
//                     <CardMedia className={classes.imgContainer}
//                         style={{ borderRadius: "5px", maxWidth: 400 }}
//                         component="img"
//                         image={area[0]?.images[0] || ""}
//                         alt={"taloja"}
//                     />
//                     <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly">
//                         <Typography className={classes.dataTitle}>
//                             {t("projectMap.totalUnitsTxt")}
//                             <br />
//                             <span className={classes.dataValue}>
//                                 {area[0].No_Of_Units}
//                             </span>
//                         </Typography>
//                         <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
//                         <Typography className={classes.dataTitle}>
//                             {t("projectCard.legends.available")}
//                             <br />
//                             <span className={classes.dataValue} style={{ color: "#0DC143", fontWeight: "900", textShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)" }}>
//                                 {area[0].No_Of_Units_Available}
//                             </span>
//                         </Typography>
//                     </Grid>

//                     <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly" >
//                         <Typography className={classes.dataTitle}>
//                             {t("projectCard.numberOfFloors")}
//                             <br />
//                             <span className={classes.dataValue}>
//                                 {area[0].No_Of_Floors}
//                             </span>
//                         </Typography>
//                         <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
//                         <Typography className={classes.dataTitle}>
//                             {t("projectCard.numberOfTower")}
//                             <br />
//                             <span className={classes.dataValue}>
//                                 {area[0].No_Of_Towers}
//                             </span>
//                         </Typography>
//                         <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
//                         <Typography className={classes.dataTitle}>
//                             {t("projectCard.typeLabel")}
//                             <br />
//                             <span className={classes.dataValue}>
//                                 {area[0].Flat_Type?.map(
//                                     (type, index) => (
//                                         <>
//                                             {`${type} ` || "--"}
//                                             {(index != area[0].Flat_Type.length - 1) && <span>, </span>}

//                                         </>
//                                     )
//                                 )}
//                             </span>
//                         </Typography>
//                     </Grid>
//                 </span>}
//         </>
//     );
// };

// const ProjectMap = (props) => {
//     const {
//         afterSelectedCatEvent,
//         selectedFlat,
//         afterSelectingFlat,
//         allProject,
//         geoJson
//     } = props;

//     const classes = SelectProjectMapStyles();
//     const { t } = useTranslation("ProjectDetailsPageTrans");
//     const history = useHistory();
//     const [openPrefrenceDialog, setOpenPrefrenceDialog] = useState(false);
//     const [projectDetailsObjct, setProjectDetailsObjct] = useState(null);
//     const [towerSelected, setTowerSelected] = useState(1);
//     const [showToasterMsg, setShowToasterMsg] = React.useState(false);
//     const [toasterMsg, setToasterMsg] = useState("")
//     const [showTowerImage, setShowTowerImage] = useState(false);
//     const [towerHoverArea, setTowerHoverArea] = useState("");
//     const [dynamicTowerMap, setDynamicTowerMap] = useState()
//     const [tooltip, setTooltip] = useState(null);
//     const [towerTooltip, setTowerTooltip] = useState(null)
//     const dispatch = useDispatch();
//     const mapContainerRef = useRef(null);
//     const towerContainerRef = useRef();
//     const [map, setMap] = useState(null);
//     const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15, anchor: 'right', closeOnMove: true, closeButton: false, closeOnClick: true }));
//     const [selectedStyle, setSelectedStyle] = useState('streets-v9');
//     const [isMenuHidden, setIsMenuHidden] = useState(false);

//     //toggle left project list menu
//     const toggleMenu = () => {
//         setIsMenuHidden(!isMenuHidden);
//     }

//     //change map style
//     const handleStyleChange = (event) => {
//         setSelectedStyle(event.target.value);
//         // map.setStyle(`mapbox://styles/mapbox/${event.target.value}`);
//     };

//     // Tower hover tooltip
//     const handleMouseEnterTower = (area) => {
//         const tooltipContent = (
//             <span style={{ minWidth: "20vw" }}>
//                 <Typography style={{ fontWeight: "700", padding: 5, color: "#00437E", textAlign: "start" }}>{area.name}</Typography>
//                 {area.href != 'NONE' &&
//                     <CardMedia className={classes.imgContainer}
//                         style={{ borderRadius: "5px", maxWidth: 400, maxHeight: 150, width: "100%" }}
//                         component="img"
//                         image={area.TowerImage || ""}
//                         alt={"taloja"}
//                     />}
//                 <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly">
//                     {area.href != 'NONE' &&
//                         <>
//                             <Typography className={classes.dataTitle}>
//                                 {t("projectMap.totalUnitsTxt")}
//                                 <br />
//                                 <span className={classes.dataValue}>
//                                     {area.totalFlat}
//                                 </span>
//                             </Typography>
//                             <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
//                         </>}
//                     <Typography className={classes.dataTitle}>
//                         {t("projectCard.legends.available")}
//                         <br />
//                         <span className={classes.dataValue} style={{ color: "#0DC143", fontWeight: "900", textShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)" }}>
//                             {area.AvlFlats}
//                         </span>
//                     </Typography>
//                 </Grid>
//                 {area.href != 'NONE' && <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly" >
//                     <Typography className={classes.dataTitle}>
//                         {t("projectCard.numberOfFloors")}
//                         <br />
//                         <span className={classes.dataValue}>
//                             {area.totalFloors}
//                         </span>
//                     </Typography>
//                     <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
//                     <Typography className={classes.dataTitle}>
//                         {t("projectCard.typeLabel")}
//                         <br />
//                         <span className={classes.dataValue}>
//                             {area.FlatTypes?.map(
//                                 (type, index) => (
//                                     <>
//                                         {`${type} ` || "--"}
//                                         {(index != projectDetailsObjct.Flat_Type.length - 1) && <span>, </span>}

//                                     </>
//                                 )
//                             )}
//                         </span>
//                     </Typography>
//                 </Grid>
//                 }
//             </span>
//         );
//         setTowerTooltip({ tooltipContent, coords: area.coords });
//     }

//     //Determine and set tooltip for tower on hover
//     useEffect(() => {
//         if (towerHoverArea && dynamicTowerMap && projectDetailsObjct) {
//             handleMouseEnterTower(towerHoverArea)
//         }
//     }, [dynamicTowerMap, towerHoverArea])

//     //caluclate center for polygon by giving coordinates
//     function calculateCentroid(coordinates) {
//         let x = 0;
//         let y = 0;
//         const numPoints = coordinates.length;

//         for (let i = 0; i < numPoints; i++) {
//             const point = coordinates[i];
//             x += point[0];
//             y += point[1];
//         }

//         x /= numPoints;
//         y /= numPoints;

//         return [x, y]; // Returns the [longitude, latitude] of the centroid
//     }

//     //Intialize map, layers, popups
//     const initializeMap = () => {
//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: `mapbox://styles/mapbox/${selectedStyle}`,
//             center: [73.046415, 19.062474], //map center on mount
//             zoom: 12,
//             attributionControl: false, // Disable Mapbox logo
//         });

//         const logo = document.createElement('div');
//         logo.style.position = 'absolute';
//         logo.style.bottom = '10px';
//         logo.style.right = '50px';
//         logo.style.fontWeight = 600;
//         logo.innerHTML = '<div>&#169; CIDCO</div>'; // Replace 'path_to_your_logo' with the actual path to your logo

//         mapContainerRef.current.appendChild(logo);
//         const bounds = [
//             [72.894408, 18.931413], // Southwest corner (longitude, latitude)
//             [73.180020, 19.114059], // Northeast corner (longitude, latitude)
//         ];

//         map.setMaxBounds(bounds);
//         map.addControl(new mapboxgl.FullscreenControl());
//         const navigationControl = new mapboxgl.NavigationControl();
//         map.addControl(navigationControl, 'bottom-right');
//         map.on('load', () => {
//             //polygon data and layers here
//             map.addSource('polygon-source', {
//                 type: 'geojson',
//                 data: {
//                     type: 'FeatureCollection',
//                     features: geoJson.features, //GeoJSON data
//                 },
//             });

//             map.addLayer({
//                 id: 'polygon-layer',
//                 type: 'fill',
//                 source: 'polygon-source',
//                 paint: {
//                     'fill-color': '#ff0000',
//                     'fill-opacity': 0.5,
//                 },
//             });

//             map.on('mouseenter', 'polygon-layer', () => {
//                 // cursor style when over the polygon
//                 map.getCanvas().style.cursor = 'pointer';
//             });

//             map.on('mouseleave', 'polygon-layer', () => {
//                 // Reset cursor style when leaving the polygon
//                 map.getCanvas().style.cursor = '';
//             });

//             map.on('click', 'polygon-layer', (e) => {
//                 const feature = e.features[0];
//                 // Trigger a function with the clicked feature's properties
//                 handlePolygonClick(feature.properties);
//             });

//             // Add tooltip when users mouse move over a point
//             map.on('mousemove', (e) => {
//                 const features = map.queryRenderedFeatures(e.point, {
//                     layers: ['polygon-layer'], // Only consider the 'polygon-layer'
//                 });

//                 if (features.length > 0) {
//                     const feature = features[0];
//                     const temp_project_objt = allProject.filter((project) => project.projectId == feature.properties.projectId);
//                     setProjectDetailsObjct(temp_project_objt[0])
//                     // const tooltipContent = handleMouseEnter(temp_project_objt);
//                     // // Create a tooltip element
//                     // const tooltip = document.createElement('div');
//                     // tooltip.className = 'custom-tooltip';
//                     // tooltip.innerHTML = tooltipContent;


//                     const popupNode = document.createElement("div")
//                     popupNode.style.width = "300px";
//                     ReactDOM.render(
//                         <ProjectTooltip
//                             area={temp_project_objt}
//                         />,
//                         popupNode
//                     )

//                     // Set tooltip on map
//                     tooltipRef.current
//                         .setLngLat(e.lngLat)
//                         .setMaxWidth("350px")
//                         .setDOMContent(popupNode)
//                         .addTo(map);
//                 } else {
//                     // // Check if the cursor is over a marker
//                     // const markers = document.getElementsByClassName('mapboxgl-marker');
//                     // for (const marker of markers) {
//                     //     const rect = marker.getBoundingClientRect();
//                     //     if (
//                     //         e.point.x >= rect.left &&
//                     //         e.point.x <= rect.right &&
//                     //         e.point.y >= rect.top &&
//                     //         e.point.y <= rect.bottom
//                     //     ) {
//                     //         // Create a tooltip element
//                     //         const tooltip = document.createElement('div');
//                     //         tooltip.className = 'custom-tooltip';
//                     //         tooltip.innerHTML = marker.getAttribute('data-name'); // Get the marker's name attribute

//                     //         // Set tooltip on map
//                     //         tooltipRef.current
//                     //             .setLngLat(marker.getAttribute('data-lnglat').split(',').map(parseFloat)) // Get the marker's lnglat attribute
//                     //             .setDOMContent(tooltip)
//                     //             .addTo(map);

//                     //         return; // Exit the loop once a marker is found
//                     //     }
//                     // }

//                     // // Remove the tooltip if the cursor is not over a polygon or marker
//                     tooltipRef.current.remove();
//                 }
//             });
//         });



//         function breakTextAtSecondSpace(text) {
//             const parts = text.split(' ');

//             if (parts.length > 2) {
//                 // If there are more than two parts, combine the first two with a space,
//                 // and the rest with a line break.
//                 return `${parts[0]} ${parts[1]}<br>${parts.slice(2).join(' ')}`;
//             }

//             // If there are two or fewer parts, return the original text.
//             return text;
//         }

//         // Iterate through the GeoJSON features and create markers
//         geoJson.features.forEach((feature) => {
//             const centroid = calculateCentroid(feature.geometry.coordinates[0]);

//             // Create a custom marker element
//             const displayName = breakTextAtSecondSpace(feature.properties.name);
//             const markerElement = document.createElement('div');
//             markerElement.setAttribute('data-lnglat', centroid.join(',')); // Set the lnglat attribute
//             markerElement.setAttribute('data-name', feature.properties.name); // Set the name attribute
//             markerElement.innerHTML = `<img src=${pinImg} class="pinAnimation" alt="Marker">
//                       <div class ='custom-marker'>${displayName}</div>`;

//             // Create a marker with the custom element
//             new mapboxgl.Marker(markerElement)
//                 .setLngLat(centroid)
//                 .setPopup(new mapboxgl.Popup().setHTML(feature.properties.name))
//                 .addTo(map);

//             markerElement.addEventListener('click', () => {
//                 // Handle the click event here
//                 map.flyTo({
//                     center: centroid,
//                     zoom: 15, // adjust the zoom level as needed
//                     essential: true // This ensures a smooth flyTo animation
//                 });
//                 // handlePolygonClick(feature.properties);
//             });
//             markerElement.addEventListener('mouseenter', () => {
//                 const temp_project_objt = allProject.filter((project) => project.projectId == feature.properties.projectId);
//                 setProjectDetailsObjct(temp_project_objt[0])
//             });
//             markerElement.addEventListener('mouseleave', () => {
//                 // Handle the click event here
//                 setProjectDetailsObjct(null)
//                 tooltipRef.current.remove();
//             });
//         });


//         setMap(map);
//     };

//     //Initalize map on mount if having geojson
//     useEffect(() => {
//         if (geoJson) {
//             initializeMap();
//             return () => {
//                 if (map) {
//                     map.remove();
//                 }
//                 geoJson.features.forEach((feature) => {
//                     const markerElement = document.querySelector(`[data-name="${feature.properties.name}"]`);
//                     if (markerElement) {
//                         markerElement.removeEventListener('click', handlePolygonClick);
//                         // markerElement.removeEventListener('mouseenter');
//                         // markerElement.removeEventListener('mouseleave');
//                     }
//                 });
//             };
//         }
//     }, [geoJson]);

//     //Re intialize map on changing style to contain layers
//     useEffect(() => {
//         if (map) {
//             // Update the map style without removing the map
//             map.setStyle(`mapbox://styles/mapbox/${selectedStyle}`);
//             initializeMap();
//         }
//     }, [selectedStyle]);


//     //Zoom to project on click project from list
//     const flyToProject = (coordinates) => {
//         const centroid = calculateCentroid(coordinates[0])
//         if (map) {
//             map.flyTo({
//                 center: centroid, // longitude and latitude of the project
//                 zoom: 15, // zoom level 
//                 essential: true, // smooth flyTo animation
//             });
//         }
//     };

//     // Reset zoom to default center of map
//     const resetZomm = () => {
//         if (map) {
//             map.flyTo({
//                 center: [73.046415, 19.062474], // default map center coordinates
//                 zoom: 12, // zoom level 
//                 essential: true, // smooth flyTo animation
//             });
//         }
//     };



//     const handlePolygonClick = (properties) => {
//         setShowTowerImage(true);
//     };

//     const towerClicked = (area, value) => {
//         if (area.href != "NONE") {
//             setTowerSelected(area?.name);
//             projectSelection(value);
//         }
//         else if (area.href == "NONE") {
//             setToasterMsg(t("projectMap.noFlatTxt"))
//             setShowToasterMsg(true)
//         }
//     };

//     const towerEnterArea = (area) => {
//         setTowerHoverArea(area);
//     }

//     const towerLeaveArea = (area) => {
//         setTowerHoverArea(null);
//         setTowerTooltip(null)
//     }

//     const getTipPosition = (area, x, y) => {
//         let x1 = area.coords[0]
//         let y1 = area.coords[1]
//         let x2 = area.coords[2]
//         let y2 = area.coords[3]
//         const centerX = (x1 + x2) / 2
//         const centerY = (y1 + y2) / 2
//         const center = [centerX, centerY]
//         if (center) {
//             return { top: `${center[1] - x}px`, left: `${center[0] - y}px` };
//         }
//     };


//     const backToLocationsMap = () => {
//         setShowTowerImage(false);
//     };
//     // useEffect(() => {
//     //     if (showTowerImage === false) {
//     //         setSelectedStyle('streets-v9');
//     //     }
//     // }, [showTowerImage])

//     const handleClose = (newValue) => {
//         setOpenPrefrenceDialog(false);
//         afterSelectingFlat();
//         if (newValue) {
//             afterSelectedCatEvent(projectDetailsObjct, newValue);
//         }
//     };

//     const projectSelection = (value) => {
//         setOpenPrefrenceDialog(true);
//     };

//     useEffect(() => {
//         if (projectDetailsObjct) {
//             const towerImgArray = JSON.parse(projectDetailsObjct.towerImgCordinate);
//             const TEMP_TOWER_AREAS_MAP = {
//                 name: 'Tower_Image',
//                 areas: towerImgArray.map((tower, index) => ({
//                     id: tower.id,
//                     name: tower.name,
//                     shape: tower.shape,
//                     coords: JSON.parse(tower.coords),
//                     preFillColor: tower.preFillColor,
//                     href: "#"
//                 }))
//             };
//             let TEMP_AREAS = [];
//             TEMP_TOWER_AREAS_MAP.areas.map((area) => {
//                 let foundMatch = false;
//                 Object.keys(projectDetailsObjct.TowerWiseFlatCount).map((key) => {
//                     if (area.name == key) {
//                         let tempOBj = {
//                             id: area.id,
//                             name: area.name,
//                             shape: area.shape,
//                             coords: area.coords,
//                             preFillColor: area.preFillColor,
//                             href: "#",
//                             AvlFlats: projectDetailsObjct.TowerWiseFlatCount[key].AvailableFlat,
//                             totalFlat: projectDetailsObjct.TowerWiseFlatCount[key].TotalFlats,
//                             totalFloors: projectDetailsObjct.TowerWiseFlatCount[key].TotalFloors,
//                             FlatTypes: projectDetailsObjct.TowerWiseFlatCount[key].FlatTypes,
//                             TowerImage: projectDetailsObjct.TowerWiseFlatCount[key].TowerImage
//                         }
//                         TEMP_AREAS.push(tempOBj)
//                         foundMatch = true;
//                     }
//                 });
//                 if (!foundMatch) {
//                     let tempObj = {
//                         id: area.id,
//                         name: area.name,
//                         shape: area.shape,
//                         coords: area.coords,
//                         preFillColor: "rgb(238, 10, 10, 48%)",
//                         href: "NONE",
//                         AvlFlats: 0
//                     };
//                     TEMP_AREAS.push(tempObj);
//                 }
//             });
//             let FINAL_TOWER_AREA = {
//                 name: 'Tower_Image',
//                 areas: TEMP_AREAS
//             }
//             setDynamicTowerMap(FINAL_TOWER_AREA);
//         }
//     }, [projectDetailsObjct]);

//     return (
//         <>
//             <Snackbar open={showToasterMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={() => setShowToasterMsg(false)}>
//                 <Alert onClose={() => setShowToasterMsg(false)} severity="warning" sx={{ width: '100%' }}>
//                     {toasterMsg}
//                 </Alert>
//             </Snackbar>
//             {allProject && (
//                 <div id="imageMap" className={classes.mapContainer}>
//                     {!showTowerImage && <div ref={mapContainerRef} className="map-container"></div>}
//                     {/* {
//                         !showTowerImage && <div style={{ position: 'fixed', top: '15.5%', zIndex: '1000', left: '10.6vw', background: "yellow", padding: 5, borderRadius: 5, border: "2px solid black" }}>
//                             <Typography style={{ fontWeight: "700" }} >{t("projectMap.clickLocationTxt")}</Typography>
//                         </div>
//                     } */}
//                     {!showTowerImage &&
//                         <>
//                             <div id="menu" className={`${classes.leftListContainer} ${isMenuHidden ? classes.hidden : ''}`}>
//                                 <Typography gutterBottom align='center' variant='h6' style={{ borderBottom: '1px solid' }}>Available Projects</Typography>
//                                 <Box className={classes.projectList}>
//                                     {allProject.map((item) =>
//                                         <ProjectMapCard project={item} flyToProject={flyToProject} />
//                                     )}
//                                 </Box>
//                                 <div id="menu" className={classes.mapStyleBox}>
//                                     {/* <SettingsApplicationsIcon /> */}
//                                     <FormControl>
//                                         {/* <FormLabel id="demo-radio-buttons-group-label">Map Type</FormLabel> */}
//                                         <RadioGroup
//                                             aria-labelledby="style-group-label"
//                                             defaultValue="streets-v9"
//                                             name="radio-buttons-group"
//                                             value={selectedStyle}
//                                             onChange={handleStyleChange}
//                                             color='primary'
//                                             row
//                                             title='Select Map type'
//                                         >
//                                             <FormControlLabel value="streets-v9" control={<Radio size='small' />} label="Default" />
//                                             <FormControlLabel value="satellite-streets-v12" control={<Radio size='small' />} label="Satellite" />
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <IconButton size='small' color='primary' onClick={resetZomm} title='Reset Zoom'>
//                                         <SettingsOverscanIcon />
//                                     </IconButton>
//                                 </div>
//                             </div>
//                             <Box className={`${classes.collapseBtnContainer} ${isMenuHidden ? classes.moveLeft : ''}`} onClick={toggleMenu}>
//                                 <button className={classes.collapseBtn}>{isMenuHidden ? <ArrowForwardIosIcon style={{ fontSize: '1rem' }} /> : <ArrowBackIosIcon style={{ fontSize: '1rem' }} />}</button>
//                             </Box>
//                         </>
//                     }
//                     {showTowerImage && projectDetailsObjct && (
//                         <ImageMapper id="imageMapTower" containerRef={towerContainerRef} lineWidth={2} strokeColor={"blue"} src={projectDetailsObjct.towerImg} map={dynamicTowerMap} natural={true} responsive={false} parentWidth={1052} fillColor="rgba(0, 0, 0, 0.1)" onClick={area => towerClicked(area, projectDetailsObjct)} width={1000} onMouseEnter={area => towerEnterArea(area)} onMouseLeave={area => towerLeaveArea(area)} />
//                     )}

//                     {
//                         dynamicTowerMap && showTowerImage && projectDetailsObjct.ProjectId != 52 &&
//                         dynamicTowerMap.areas.map((area) => {
//                             return <span className={classes.mapTooltip}
//                                 style={{ ...getTipPosition(area, 0, 0), background: area.href == "NONE" ? "rgb(120 31 31 / 91%)" : "" }}>
//                                 <span>{area && area.name}</span>
//                             </span>
//                         })
//                     }
//                     {
//                         dynamicTowerMap && showTowerImage && projectDetailsObjct.ProjectId == 52 &&
//                         dynamicTowerMap.areas.map((area) => {
//                             return <span className={`${classes.towerStatusTag} ${area.href == "NONE" ? 'red' : 'green'}`}
//                                 style={{ ...getTipPosition(area, 7, -3), background: area.href == "NONE" ? "rgb(120 31 31 / 91%)" : "" }}>
//                             </span>
//                         })
//                     }
//                     {
//                         (towerTooltip && dynamicTowerMap && showTowerImage && (
//                             <CustomTooltip
//                                 title={towerTooltip.tooltipContent}
//                                 TransitionComponent={Zoom}
//                                 open={Boolean(towerTooltip)}
//                                 leaveDelay={300}
//                                 arrow
//                                 placement={projectDetailsObjct.ProjectId == 26 ? "top" : "left"}
//                             >
//                                 <span
//                                     style={{
//                                         position: "absolute",
//                                         top: towerTooltip.coords[1],
//                                         left: towerTooltip.coords[0],
//                                         zIndex: 9999,
//                                     }}
//                                 />
//                             </CustomTooltip>
//                         ))
//                     }
//                     {
//                         showTowerImage && projectDetailsObjct && <span className={classes.btnHover}>
//                             <Button startIcon={<ArrowBackIcon />} onClick={() => { backToLocationsMap(); setProjectDetailsObjct(null); setTooltip(null) }} variant="contained" color="primary">{t("projectMap.backLocationBtn")}</Button>
//                             <Typography style={{ fontWeight: "700", fontSize: "1.2rem", background: "#0038C0", padding: 10, borderRadius: 5, color: "white" }} >{projectDetailsObjct.ProjectName}</Typography>
//                             <Typography style={{ fontWeight: "700", background: "yellow", padding: 3, borderRadius: 5, border: "2px solid black", marginRight: 25, height: 35 }} >{t("projectMap.clickTowerTxt")}</Typography>
//                         </span>
//                     }

//                     {
//                         openPrefrenceDialog && (
//                             <SetFlatPerferenceDialogBox
//                                 open={openPrefrenceDialog}
//                                 onClose={handleClose}
//                                 projectDetails={projectDetailsObjct}
//                                 selectedFlat={selectedFlat}
//                                 TowerSelected={towerSelected}
//                             />
//                         )
//                     }
//                 </div >)
//             }
//         </>
//     );
// };

// export default ProjectMap;





