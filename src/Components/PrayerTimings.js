import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import PrayerCard from './PrayerCard';

function PrayerTimings() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://alislam.org/adhan/api/timings/day');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setTimeout(() => setRetry((prev) => prev + 1), 3000); // retry after 3 seconds
      }
    };

    fetchData();
  }, [retry]); // This will retry when 'retry' state changes

   //interval to check current time against prayer times
   useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const prayersToday = data?.multiDayTimings?.[0]?.prayers || [];
      for (let prayer of prayersToday) {
        const prayerTime = prayer.time;
        if (Math.abs(now - prayerTime) < 60000 && prayer.audio) { // 60 seconds threshold
          audioRef.current.src = prayer.audio;
          audioRef.current.play();
          break;
        }
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [data]);

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

 // Checking if multiDayTimings and prayers exist
 if (!data.multiDayTimings || !data.multiDayTimings.length) return <div>No prayer timings available.</div>;

 return (
   <Container maxWidth="sm">
     <audio ref={audioRef} />
     {data.multiDayTimings[0].prayers.map((prayer, index) => (
       <PrayerCard key={index} prayer={prayer} />
     ))}
   </Container>
 );
}


export default PrayerTimings;
