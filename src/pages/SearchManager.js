import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

import SongCard from "../components/SongCard"

function UserProfile() {
  const [ params ] = useSearchParams();
  const [ query ] = params.get("query")
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ID data
        const idResponse = await fetch(`https://discovery-au-02.audius.openplayer.org/v1/users/handle/${query}?app_name=MOODS-TM`);
        if (!idResponse.ok) {
          console.error(`Error fetching ID data: ${idResponse.status} ${idResponse.statusText}`);
          throw new Error(`Network response was not ok ${query}`);
        }
        const idResult = await idResponse.json();
        setSearchData(idResult);

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

  if (loading) return <div><span className="loading loading-infinity loading-lg"></span></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {query}
    </div>
  );
}

export default UserProfile;