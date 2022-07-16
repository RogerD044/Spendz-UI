import React from "react";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";

const CircularProgressBar = (props) => {
    return (
        <CircularProgressbar

                value={props.percentage}
                text={`${props.percentage}%`}
                // background
                // backgroundPadding={3}
                styles={buildStyles({
                backgroundColor: "#3e98c7",
                textColor: "#fff",
                pathColor: "#0099CC",
                trailColor: "#585858",
                strokeLinecap: "round"
                                    })}/>
    )
}

export default CircularProgressBar