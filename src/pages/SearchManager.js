import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

import SongCard from "../components/SongCard"

function UserProfile() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch ID data
        const searchResponse = await fetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/full/search/full?query=${query}&app_name=MOODS-TM`);
        if (!searchResponse.ok) {
          console.error(`Error fetching ID data: ${searchResponse.status} ${searchResponse.statusText}`);
          throw new Error(`Network response was not ok ${query}`);
        }
        const searchResult = await searchResponse.json();
        console.log(searchResult);
        setSearchData(searchResult);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (loading) return <div><div className='flex justify-center pt-10'><span className="loading loading-infinity w-64"></span></div><p className="text-center text-xl lg:text-2xl">Chargement...</p></div>;
  if (error) return <div><div className='flex justify-center pt-10'><Icon icon="ph:seal-warning-fill" className='text-6xl md:text-[14rem] pb-2 text-error'/></div><p className="text-center text-xl lg:text-2xl">Erreur : {error}</p></div>;

  return (
    <div>
      <h1 className='text-center text-3xl md:text-4xl font-black py-4'>Résultats pour {query}</h1>
      {searchData.data.tracks.map((item, index) => (
        <React.Fragment key={index}>
           <SongCard trackParsedData={item}/>
        </React.Fragment>
      ))}
    </div>
  );
}

export default UserProfile;