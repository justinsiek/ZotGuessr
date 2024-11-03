import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const play = () => {
  const [isExpanded, setExpanded] = useState("False")
  const [time, setTime] = useState(30)
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
  const [rounds, setRounds] = useState(1)
  const [leaderboardinfo, setLeaderboardinfo] = useState([])
  const [name, setName ]= useState("")
  const [nameSet, setNameSet] = useState(false)

  const SETROUNDS = 5

  const orderedNames = leaderboardinfo.map(pair => <div className="font-bold text-xl"> {pair['name']}</div>)
  const orderedScores = leaderboardinfo.map(pair => <div className='text-xl'>{pair['score']}</div>)

  useEffect(() => {
    if (!submitted && rounds <= SETROUNDS) {
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
      .then(data => {
        setScore(prevScore => prevScore + data.score);
        setSubmitted(true);
      });
  };

  useEffect(()=>{
     if(time <= 0 && !markerSet){
       setSubmitted(true);
     }
  }, [time]);

  
  
  useEffect(() => {
    if (submitted && rounds === SETROUNDS && nameSet) {
      fetch('http://localhost:8080/api/sendscore?score=' + score + '&name=' + name)
        .then(response => response.json())
        .then(data => setLeaderboardinfo(data.leaderboard))
        .then(console.log(leaderboardinfo));
    }
  }, [submitted, rounds, score, nameSet]);
  
  const handleContinueClick = () =>{
    setSubmitted(false)
    setTime(30)
    setMarkerSet(false)
    if (rounds < SETROUNDS) {
      setRounds(rounds + 1)
    }
    //set timer back to 0
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen relative overflow-hidden">
    <img src={locationImage}/>
      <div className="flex-row border-2 border-solid border-black bg-white justify-center items-center rounded-full 
       top-4 text-2xl font-bold absolute px-8 text-black">
        <h1>{time}</h1>
        
       </div>
       <div className ="flex absolute left-4 top-4 px-8 text-black bg-white rounded-full text-2xl font-bold border-black 
       border-2 border-solid">Score: {score}</div>
       <div className ="flex absolute right-4 top-4 px-8 text-black bg-white rounded-full text-2xl font-bold border-black 
       border-2 border-solid">Rounds: {rounds}/{SETROUNDS} </div>

       
      <div className='group z-40'>
          {/*UCI MAP if time is greater than 0 and !submitted*/}
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
            }} />
        )}

        {submitted && (
          <div className='bg-green-500 w-4 h-4 rounded-full z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer'
            style={{
              position: 'absolute',
              top: mapPosition.y+ locationPosition[1],
              left: mapPosition.x + locationPosition[0],
            }}
          />
        )}
      </div>
      {rounds === SETROUNDS && submitted && !nameSet && 
      <><div className="flex flex-col top-50 bg-white h-1/4 w-1/4 z-50 absolute rounded-xl justify-center items-center space-y-6">
        <h1 className='text-2xl font-bold'>Enter your name:</h1>

        <input className="border-solid border-black border-2 px-4 py-2 rounded-lg" maxLength="5" placeholder="Enter your name..." onChange={(e) => setName(e.target.value)} />
        
        <button className="border-solid border-black border-2 px-4 py-2 bg-black text-white rounded-lg" onClick={() => setNameSet(true)}>Submit</button>
        
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-40"/></>}

      {rounds === SETROUNDS && submitted && nameSet && <><div className="flex flex-col bg-white h-1/2 w-1/5 z-50 absolute rounded-xl justify-center items-center">
        <h1 className="text-2xl font-bold top-6 absolute">Your Score: {score}</h1>
        {/*Leaderboard*/}
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col"> 
            <div className="flex flex-col justify-center items-center text-3xl font-bold mb-4">High Scores</div> 
              <div className="flex flex-row justify-between px-4 py-2 rounded-lg border-solid border-2 border-black space-x-8">     
                <div className="flex flex-col space-y-2">{orderedNames}</div>
                <div className="flex flex-col space-y-2">{orderedScores}</div>
              </div>
          </div>
        </div>
        
      <div className='flex flex-row w-full space-x-4 bottom-4 absolute items-center justify-center'>
        <Link href="/">
          <button className="border-solid border-black border-2 px-6 py-2 rounded-lg">Home</button>
        </Link>
        
        <button className="border-solid border-black border-2 px-4 py-2 bg-black text-white rounded-lg"
        onClick={() => window.location.reload()}>Retry</button> 
      </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div></>
      }
    </div>
  ) 
}

export default play
