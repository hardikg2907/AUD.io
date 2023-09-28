import { useContext, createContext, useState, useEffect } from "react";

const MusicContext = createContext()

const MusicProvider = ({ children }) => {

    const [activeSong, setActiveSong] = useState(null)
    const [currentSongs, setCurrentSongs] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isNotificationClicked, setIsNotificationClicked] = useState(true)

    const handleSetSong = (submission, allSongs, event) => {
        event.stopPropagation()
        setActiveSong(submission)
        setIsPlaying(true)
        setCurrentSongs(allSongs)
        const index = allSongs.findIndex((song) => song === submission);
        setCurrentIndex(index)
    }

    const handleShuffle = (allSongs) => {
        const index = Math.floor(Math.random() * allSongs.length)
        console.log(index);
        setCurrentIndex(index)
        setActiveSong(allSongs[index])
        setIsPlaying(true)
    }

    return (
        <MusicContext.Provider value={{ isPlaying, setIsPlaying, activeSong, setActiveSong, handleSetSong, currentSongs, setCurrentSongs, currentIndex, setCurrentIndex, handleShuffle, isNotificationClicked, setIsNotificationClicked }}>
            {children}
        </MusicContext.Provider>
    )

}

export const useMusicContext = () => {
    return useContext(MusicContext)
}

export { MusicContext, MusicProvider }