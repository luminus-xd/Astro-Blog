import React from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer.tsx';

const GlobalMusicPlayer = () => {
    const { isPlaying, togglePlay } = useAudioPlayer();

    return (
        <>
            <audio id="music" loop>
                <source src="/music/night-walk.mp3" type="audio/mpeg" />
                このブラウザはaudio要素に対応していません。
            </audio>
            <button onClick={() => togglePlay()}>{isPlaying ? '停止' : '再生'}</button>
        </>
    );
};

export default GlobalMusicPlayer;
