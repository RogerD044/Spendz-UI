import React from 'react'
  
const ProgressBar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: height,
        width: '60%',
        backgroundColor: '#7A8E8E',
        borderRadius: 40,
        marginLeft: 23,
        marginRight:30,
        border: 0,
      }
      
      const Childdiv = {
        height: '100%',
        height: height,
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right',
        border: 0,
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 600
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        {/* <span style={progresstext}>{`${progress}%`}</span> */}
      </div>
    </div>
    )
}
  
export default ProgressBar;