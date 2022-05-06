import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

export default function CircularProgressWithLabel({ value, title, isShow, Exit }) {
  const CircularProgressWL = (props) => {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="#00ff00">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  };
  // backgroundImage: `url(https://www.bleepstatic.com/images/news/ransomware/b/blackcat-alphv/blackcat.gif)`
  return (
    <Backdrop
      sx={{
        color: "#00ff00",
        zIndex: 1,
      }}
      open={isShow}
    >
      <Box>
        <Grid container justifyContent="center">
          <CircularProgressWL value={value} />
        </Grid>
        <Grid container justifyContent="center">
          <Typography color="#00ff00">{title}</Typography>
        </Grid>
        <Grid container justifyContent="center">
          <Button  sx={{ color: "#00ff00"}} onClick = {() => {Exit()}}>Thoát</Button>
        </Grid>
      </Box>
    </Backdrop>
  );
}
