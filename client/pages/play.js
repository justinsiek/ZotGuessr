import React from 'react'
import { useState, useEffect } from 'react'

const play = () => {
  const [isExpanded, setExpanded] = useState("False")
  const [time, setTime] = useState(20)
  const [isActive, setActive] = useState(true)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [submitMarker, setSubmitMarker]= useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0})
  const [markerSet, setMarkerSet] = useState(false)
  const [score, setScore] = useState(0)
  const [locationImage, setLocationImage] = useState("")
  const [locationPosition, setLocationPosition] = useState({ x: 0, y: 0 })
  const [submitted, setSubmitted]= useState(false)

  useEffect(() => {
    if (!submitted)  {
      fetch('http://localhost:8080/api/play')
      .then(response => response.json())
      .then(data => {
        setLocationImage(data.locationFileName);
        setLocationPosition(data.locationPosition)}
    )}
  }, [submitted])
  
  // Decrement timer by 1.
  useEffect(() => {
    if(!submitted){
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => {setTime(time - 1);}, 1000);
    }
    return () => clearInterval(timer);
  }
  }, [isActive, time]);
  
  // Records position of the mouse.
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event.nativeEvent;
    const { left, top } = event.currentTarget.getBoundingClientRect();
    setMapPosition({
      x: left,
      y: top
    })
    setMousePosition({
      x: clientX - left,
      y: clientY - top
    });
  };
  
  // Sets the Marker position after the user clicks 
  const handleMarkerClick = () => {
    if (!submitted) {
      setMarkerPosition({
        x: mousePosition.x,
        y: mousePosition.y
      });
    }
      
      setMarkerSet(true)
  }
  
  
  const handleSubmitClick = () => {
    fetch(`http://localhost:8080/api/submit?loc=${markerPosition.x}, ${markerPosition.y}`)
    .then(response => response.json())
    .then(data => setScore(data.score))
    setSubmitted(true)

  }
  
  const handleContinueClick = () =>{
    setSubmitted(false)
  }
  
  return (
    <div className="flex justify-center items-center h-screen w-screen relative overflow-hidden">
    <img src={locationImage}/>
      <div className="flex-row border-2 border-solid border-black bg-white justify-center items-center rounded-full 
       top-8 text-2xl font-bold absolute px-8 text-black">
        <h1>{time}</h1>
       </div>

       
      <div className='group z-50'>
          {/*UCI MAP */}
        <img onMouseMove={handleMouseMove} onClick={handleMarkerClick} src="/assets/ucimap.jpg"
        className={`border-2 border-solid border-black absolute h-1/4 z-10 right-5 bottom-5 
        rounded-md group-hover:h-3/4 hover:rounded-lg
        transition-all duration-300 cursor-pointer ${submitted ? 'h-3/4' : 'h-1/4'}`} onMouseEnter={() => setExpanded("True")} onMouseLeave={() => setExpanded("False")}/>
          
        {/*Submit Button with a market placed */}  
        {isExpanded === "True" && markerSet && !submitted &&
        <button className='text-xl font-bold absolute bottom-8 right-8 z-10
        text-white bg-green-500 px-8 rounded-xl hover:bg-green-600'
        onMouseEnter={() => setExpanded("True")} onClick={handleSubmitClick} disabled={!markerSet}>SUBMIT</button>} 
        
        {/*Submit Button without a market placed */}  
        {isExpanded === "True" && !markerSet && !submitted &&
        <div className='text-xl font-bold absolute bottom-8 right-8 z-10
        text-white bg-gray-500 px-8 rounded-xl cursor-not-allowed'
        onMouseEnter={() => setExpanded("True")} onClick={()=>alert("Please pick a location first!")}>SUBMIT</div>} 

        {/*Continue Button*/}
        { submitted && <button className='text-xl font-bold absolute bottom-8 right-8 z-10
        text-white bg-green-500 px-8 rounded-xl hover:bg-green-600'
        onMouseEnter={() => setExpanded("True")} onClick={handleContinueClick} disabled={!markerSet}>CONTINUE</button>} 

        
        {/*Puts the marker on the position of the map*/}
        {( (markerSet && isExpanded==="True") || submitted) && (
          <div className='bg-black w-4 h-4 rounded-full z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer'
          onMouseEnter={() => setExpanded("True")}
            style={{
              position: 'absolute',
              top: markerPosition.y + mapPosition.y,
              left: markerPosition.x + mapPosition.x,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default play
