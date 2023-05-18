import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  useGetRelativeSongQuery,
  useGetSongDetailsQuery
} from '../redux/services/shazamCore'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songId, id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songId })

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error
  } = useGetRelativeSongQuery({
    songId
  })

  if (isFetchingRelatedSongs || isFetchingSongDetails)
    return <Loader title='Searching song details' />

  if (error) return <Error />

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics: </h2>

        <div className='mt-5'>
          {songData && songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line, i) => (
              <p className='text-gray-400 text-base my-1' key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className='text-gray-400 text-base my-1'>
              Sorry, no lyrics founded!
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  )
}

export default SongDetails
