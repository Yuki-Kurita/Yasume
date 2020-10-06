import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Step from "../Step/Step";
import Footer from "../Footer/Footer";
import "./Join.css";
import Grid from "@material-ui/core/Grid";
import workingIcon from "../../icons/working.svg";
import timerIcon from "../../icons/timer.svg";
import dashboardIcon from "../../icons/dashboard.svg";

const Join = () => {
  return (
    <>
      <Header />
      <h2 className="howToUse">Yasumeの使い方</h2>
      <Grid container>
        <div className="stepContainer">
          <Grid item xs={12} sm={12} md={4}>
            <Step
              className="step"
              image={workingIcon}
              no={1}
              explain="作業時間を決めて作業を開始してください。作業終了後、休憩時間を設定して休憩に入ってください!"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Step
              className="step"
              image={timerIcon}
              no={2}
              explain="ログインすることで作業時間・休憩時間を記録することができます。"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Step
              className="step"
              image={dashboardIcon}
              no={3}
              explain="ダッシュボード機能を活用して、ご自身の時間の使い方を振り返ってください(仮)"
            />
          </Grid>
        </div>
      </Grid>
      <Link to="/singleRoom">
        <button className="singleJoinButton">Go to App</button>
      </Link>
      <Footer />
    </>
  );
};

export default Join;
