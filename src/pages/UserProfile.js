import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

import SongCard from "../components/SongCard"

function UserProfile() {
  const { handle } = useParams(); // Get the 'handle' from the URL
  const [userData, setUserData] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ID data
        const idResponse = await fetch(`https://discovery-au-02.audius.openplayer.org/v1/users/handle/${handle}?app_name=MOODS-TM`);
        if (!idResponse.ok) {
          console.error(`Error fetching ID data: ${idResponse.status} ${idResponse.statusText}`);
          throw new Error('Network response was not ok');
        }
        const idResult = await idResponse.json();
        setUserData(idResult);

        // Fetch user data based on the ID from the first request
        const userResponse = await fetch(`https://discoveryprovider2.audius.co/v1/users/${idResult.data.id}/tracks?app_name=MOODS-TM&limit=30`);
        if (!userResponse.ok) {
          console.error(`Error fetching User data: ${userResponse.status} ${userResponse.statusText} for userId ${idResult.data.id}`);
          throw new Error('Network response was not ok');
        }
        const userResult = await userResponse.json();
        setTrackData(userResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchData();
    }
  }, [handle]);

  if (loading) return <div><span className="loading loading-infinity loading-lg"></span></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Cover Section */}
      <div
        className="w-full h-72 bg-center relative bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${userData.data.cover_photo['2000x']})` }}
      >
        <img
          className="absolute h-32 w-32 rounded-full bottom-0 left-10 translate-y-5"
          src={userData.data.profile_picture['480x480']}
          alt="Cover Image"
        />
        <h1 className="absolute bottom-12 left-44 font-bold text-xl lg:text-3xl">
          {userData.data.name}
          {userData.data.is_verified && (
            <div className="tooltip" data-tip="Verified Artist">
              <Icon icon="ri:verified-badge-fill" className="text-emerald-500" />
            </div>
          )}
          {userData.data.id === 'aY1Alz' && (
            <div className="tooltip" data-tip="MOOD™ Team">
              <Icon icon="ri:verified-badge-fill" className="text-cyan-300" />
            </div>
          )}
        </h1>
        <h2 className="absolute bottom-3 left-44 text-md lg:text-xl glass p-1 rounded-lg">
          {userData.data.follower_count} Followers - {userData.data.track_count} Tracks
        </h2>
        <h3 className="absolute bottom-64 lg:bottom-2 right-1 lg:right-2 text-sm lg:text-md bg-primary p-1 rounded-lg text-primary-content">
          <Icon icon="streamline:sign-hashtag-solid" /> {userData.data.id}
        </h3>
      </div>

      <div className="card my-8">
        <h2 className="card-title mx-12">Bio</h2>
        <p
          className="mx-12"
          style={{ whiteSpace: 'pre' }}
          dangerouslySetInnerHTML={{ __html: userData.data.bio }}
        />
      </div>

      <div className='mx-2 lg:mx-6'>
      {trackData.data.map((item, index) => (
        <React.Fragment key={index}>
           <SongCard trackParsedData={item}/>
        </React.Fragment>
      ))}
        {/*
          <React.Fragment key={index}>
            {item.item}
            {/* item.item_type === 'track' && <SongCard trackParsedData={item.item} /> /}
            {/* item.item_type === 'playlist' && <PlaylistCard trackParsedData={item.item} />/}
          </React.Fragment>
        ))*/}
      </div>

      <div className="collapse bg-base-200 border-base-300 m-4 w-auto mt-8">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
        <Icon icon="ph:file-code-fill" />Developer request response</div>
        <div className="collapse-content m-2">
          <h1>IdData for handle: {handle}</h1>
          <pre>{JSON.stringify(userData, null, 2)}</pre>

          <h1>UserData for handle: {handle}</h1>
          <pre>{JSON.stringify(trackData.data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;