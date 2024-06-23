import React, { useState } from 'react';

function Index() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const doubleNumber = () => {
    fetch(`http://localhost:8080/api/double?number=${number}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setResult(`Result: ${data.result}`);
      });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <p className='mb-4'>{result}</p>
      <input
        className='border border-gray-400 p-2 w-1/4 rounded-lg mb-4'
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number..."
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded' 
        onClick={doubleNumber}>Double It!</button>
      
    </div>
  );
}

export default Index;