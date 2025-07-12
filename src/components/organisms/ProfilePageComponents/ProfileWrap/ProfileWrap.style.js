import { makeStyles } from "@material-ui/core/styles";

export const ProfileWrapStyles = makeStyles((theme) => ({
    leftSideNavContainer: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderRadius: 10,
        padding: theme.spacing(5, 0),
        minHeight: 500,
        minWidth: 250,
        [theme.breakpoints.down("sm")]: {

        },
    },
    profileNavList: {
        padding: 0,
        "& .MuiListItem-root": {
            borderLeft: "4px solid #fff",
            color: "#1D3D62",
            padding: theme.spacing(1.5, 4),
            "& .MuiListItemIcon-root": {
                minWidth: "auto",
                color: "#1D3D62",
                marginRight: theme.spacing(2.5),
                "& .MuiSvgIcon-root": {
                    fontSize: "1.2rem"
                }
            },
            "& .MuiTypography-body1": {
                fontSize: "0.9rem"
            },
            "&.active": {
                borderColor: "#0038C0",
                backgroundColor: "#EDF2FF",
                color: "#0038C0",
                "& .MuiListItemIcon-root": {
                    color: "#0038C0"
                },
                "& .MuiTypography-body1": {
                    fontWeight: 600
                },
            },
            '&.nested':{
                paddingLeft: theme.spacing(6)
              }
        }
    }
}));