import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'

const ArtistDetails = () => {
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error
  } = useGetArtistDetailsQuery(artistId)

  if (isFetchingArtistDetails)
    return <Loader title='Loading artist details ...' />

  if (error) return <Error />

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={artistData.data[0].views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  )
}
export default ArtistDetails
