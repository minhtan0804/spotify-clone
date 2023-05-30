import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetSongByCountryQuery } from '../redux/services/shazamCore'
import { Error, Loader, SongCard } from '../components'
import configs from '../configs'

const AroundYou = () => {
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(true)
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${configs.GEO_API_KEY}`)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [country])

  const { data, isFetching, error } = useGetSongByCountryQuery(country)
  if (isFetching && loading) return <Loader title='Loading songs around you' />

  if (error) return <Error />

  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Around You <span className='font-black'>{country}</span>
      </h2>

      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default AroundYou
