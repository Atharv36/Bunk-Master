import "./Bunk.css";
import React, { useState } from "react";
import { TextField, FormHelperText } from "@mui/material";

import Popper from "@mui/material/Popper";


function Bunk() {
    let [percent, setPercent] = useState(75);
    let [attendedClass, setAttendedClass] = useState();
    let [totalClass, setTotalClass] = useState();
    let [showTooltip, setShowTooltip] = useState(false);

    let handlePercent = (e) => setPercent(Number(e.target.value));
    let handleAttended = (e) => setAttendedClass(Number(e.target.value));
    let handleTotal = (e) => {
        setTotalClass(Number(e.target.value));
        setShowTooltip(Number(e.target.value)<attendedClass);
    }
    const canBunk = (percentage, attendedClasses, totalClasses) => {
        let maxBunkable = Math.floor((attendedClasses * 100) / percentage - totalClasses);
        return maxBunkable > 0 ? maxBunkable : 0;
    };
    
    const attendMore = (percentage, attendedClasses, totalClasses) => {
        if (totalClasses === 0) return 0;

        let requiredClasses = Math.ceil(
            (percentage * totalClasses - 100 * attendedClasses) / (100 - percentage)
        );

        return requiredClasses > 0 ? requiredClasses : 0;
    };

    return (
        <>
            <div className="container">
                <h1>BunkMaster</h1>


                <label htmlFor="percent">Percentage Required</label>
                <TextField min={65}
                sx={{marginBottom : "16px"}}
                size="small"
                color="warning"
                margin="dense" 
                    max={100} type="number" 
                    onChange={handlePercent} id="percent" 
                    label="Percentage" variant="outlined" />
                {/* <input
                    onChange={handlePercent}
                    type="number"
                    id="percent"
                    min={65}
                    max={100}
                    value={percent}
                /> */}

                <label htmlFor="attended">Enter Classes Attended</label>
                <TextField min={0}
                sx={{marginBottom : "16px"}}

                size="small"
                color="warning"
                margin="dense" 
                    max={500} type="number" 
                    onChange={handleAttended} id="attended" 
                    label="Classes Attended" variant="outlined" />
                
                
                {/* <input
                    onChange={handleAttended}
                    type="number"
                    id="attended"
                    min={0}
                    max={500}
                    value={attendedClass}
                /> */}

<Popper 
open={showTooltip} anchorEl={document.getElementById("total")} placement="top">
    <div style={{ background: "white", padding: "8px", border: "1px solid black", borderRadius: "4px" }}>
        Total classes must be greater than attended classes
    </div>
</Popper>

    <label htmlFor="total">Enter Total Classes</label>
        <TextField
            sx={{marginBottom : "16px"}}
            min={0}
            size="small"
            color="warning"
            margin="dense"
            max={500} 
            type="number" 
            onChange={handleTotal} 
            id="total" 
            label="Total Classes" 
            variant="outlined"
            error={showTooltip}
        />
    

                {/* <input
                    onChange={handleTotal}
                    type="number"
                    id="total"
                    min={0}
                    max={500}
                    value={totalClass}
                /> */}

                <br />
                {((attendedClass/totalClass)*100) > percent 
                    ? <p>You can bunk: <strong>{canBunk(percent, attendedClass, totalClass)}</strong>&nbsp;classes<div className="emoji">😉</div></p>
                    : <p> Attend <strong>{attendMore(percent, attendedClass, totalClass)}</strong> more classes to attain {percent}%. <div className="emoji">😢</div></p>
                    }
                
                Your Current Percentage: <strong>{totalClass > 0 ? ((attendedClass / totalClass) * 100).toFixed(2) : 0}%</strong>
                
            
            </div>
        </>
    );
}

export default Bunk;
