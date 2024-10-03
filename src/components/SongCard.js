import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './PlayButton';
import { Icon } from '@iconify/react';

const SongCard = ({ trackParsedData }) => {
    return (
        <div
            className="card card-side border-primary-content border-2 mt-2"
        >
            {/* Artwork image */}
            <figure className="hidden lg:flex">
                <img
                    className="h-32 w-32 rounded-l-none hidden lg:flex"
                    src={trackParsedData.artwork['480x480']}
                    alt="Cover Image"
                />
            </figure>

            {/* Track details */}
            <div className="card-body col-span-2 p-2 lg:p-5">
                <Link to={`/track/${trackParsedData.id}`} className='flex'>
                    <h2 className="text-base lg:text-lg card-title">
                        <Icon icon="streamline:music-note-1-solid" />
                        {trackParsedData.title}
                    </h2>
                </Link>

                <p className="font-normal">
                    <Link to={`/user/${trackParsedData.user.handle}`}>
                        {trackParsedData.user.name}  {trackParsedData.genre}
                    </Link>

                    <p className='flex'>
                        <Icon icon="ph:clock-fill" />
                        {new Date(trackParsedData.duration * 1000).toISOString().substring(14, 19)}
                        <Icon icon="ph:play-fill" />
                        {trackParsedData.play_count} Listenings</p>
                </p>
            </div>

            {/* Play button */}
            <div className="mr-2 lg:mr-8 start-2 flex items-center">
                {/*<PlayButton trackId={trackParsedData.id} />*/}
            </div>
        </div>
    );
};

export default SongCard;
