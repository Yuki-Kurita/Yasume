import React from "react";
import Timer from "../Timer/Container/Timer";
import Today from "../Today/Container/Today";
import Navbar from "../Navbar/Navbar";
import "./SingleRoom.css";
import Grid from "@material-ui/core/Grid";

const SingleRoom = () => {
  return (
    <>
      <Navbar isTimer={true} />
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <div className="leftContainer">
            <Timer />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Today />
        </Grid>
      </Grid>
    </>
  );
};

export default SingleRoom;
