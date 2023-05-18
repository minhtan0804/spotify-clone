import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import PlayPause from './PlayPause'

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-[275px] group'>
        <div
          className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex  bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <img src={song.images?.coverart} alt='song_img' />

        <div className='mt-2 flex flex-col'>
          <p className='font-semibold text-white text-lg truncate'>
            <Link to={`/songs/${song?.key}`}>{song.title}</Link>
          </p>
          <p className='text-sm truncate text-gray-300 mt-1 '>
            <Link
              to={
                song.artists
                  ? `/artists/${song?.artists[0].adamid}`
                  : '/top-artists'
              }
            >
              {song.subtitle}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default SongCard
