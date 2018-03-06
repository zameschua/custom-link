import React from 'react';
import LinkSubmissionArea from './LinkSubmissionArea';

const Banner = (props) => {
  return (
    <div style={{height: "92.1vh",
      background: "linear-gradient(to top, #fd7e14, #F9BF3B)",
      textAlign: "center"
    }}>
      <p style={{
        color: "white",
        paddingTop: "15vh",
        fontSize: "4em",
        fontWeight: "400",
        fontFamily: "Segoe UI"
      }}>
        Customise your links now
      </p>
      <br />
      <br />
      <br />
      <LinkSubmissionArea />
    </div>
  );
};

export default Banner;
