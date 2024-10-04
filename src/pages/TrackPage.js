import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

import SongCard from "../components/SongCard"

function UserProfile() {
  const { trackId } = useParams();
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch ID data
        const trackResponse = await fetch(`https://discovery-au-02.audius.openplayer.org/v1/tracks/${trackId}?app_name=MOODS-TM`);
        if (!trackResponse.ok) {
          console.error(`Error fetching ID data: ${trackResponse.status} ${trackResponse.statusText}`);
          throw new Error(`Network response was not ok ${trackId}`);
        }
        const trackResult = await trackResponse.json();
        console.log(trackResult);
        setTrackData(trackResult);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (trackId) {
      fetchData();
    }
  }, [trackId]);

  if (loading) return <div><div className='flex justify-center pt-10'><span className="loading loading-infinity w-64"></span></div><p className="text-center text-xl lg:text-2xl">Chargement...</p></div>;
  if (error) return <div><div className='flex justify-center pt-10'><Icon icon="ph:seal-warning-fill" className='text-6xl md:text-[14rem] pb-2 text-error' /></div><p className="text-center text-xl lg:text-2xl">Erreur : {error}</p><div className="collapse bg-base-200 border border-base-300 w-auto mt-8"><input type="checkbox" /><div className="collapse-title text-xl font-medium flex"><Icon icon="ph:file-code-fill" />Developer request response</div><div className="collapse-content m-2"><pre>{JSON.stringify(trackData, null, 2)}</pre></div></div></div>;

  return (
    <div>
      <h1 className='text-center text-3xl md:text-4xl font-black py-4'>Résultats pour {trackId}</h1>
      <SongCard trackParsedData={trackData.data} />
    </div>
  );
}

export default UserProfile;