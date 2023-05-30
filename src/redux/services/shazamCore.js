import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import configs from '../../configs'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', configs.API_KEY)

      return headers
    }
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),

    getSongByGenre: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`
    }),

    getSongDetails: builder.query({
      query: ({ songId }) => `v1/tracks/details?track_id=${songId}`
    }),

    getRelativeSong: builder.query({
      query: ({ songId }) => `v1/tracks/related?track_id=${songId}`
    }),

    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`
    }),

    getSongByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`
    }),

    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
    })
  })
})

export const {
  useGetTopChartsQuery,
  useGetSongByGenreQuery,
  useGetSongDetailsQuery,
  useGetRelativeSongQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongsBySearchQuery
} = shazamCoreApi
