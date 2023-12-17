import React from 'react';
import { useMusicPlayer } from '@hooks/useMusicPlayer.tsx';
import styles from '@styles/components/music-player.module.css';

const GlobalMusicPlayer = () => {
    const { isPlaying, togglePlay } = useMusicPlayer();

    return (
        <>
            <audio id="music" loop>
                このブラウザはaudio要素に対応していません。
            </audio>
            <button className={styles.button} onClick={() => togglePlay()}>
                {isPlaying ? (
                    <span className={styles.playing}>
                        <span className="sr-only">音楽を再生する</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                            <path
                                fill="#282c34"
                                fillRule="evenodd"
                                d="M20.707 1.293A1 1 0 0 0 19 2v4.17A3 3 0 1 0 21 9V4.414l.293.293a1 1 0 1 0 1.414-1.414zM12 4a8 8 0 1 0 7.72 10.105a1 1 0 1 1 1.93.524C20.497 18.876 16.615 22 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c1.3 0 2.545.249 3.687.702a1 1 0 0 1-.738 1.859A7.976 7.976 0 0 0 12 4m0 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-3 1a3 3 0 1 1 6 0a3 3 0 0 1-6 0"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                ) : (
                    <span>
                        <span className="sr-only">音楽を停止する</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                            <path
                                fill="#282c34"
                                d="M19.8 22.6L1.4 4.2l1.4-1.4l18.4 18.4zM14 11.15l-2-2V3h6v4h-4zM10 21q-1.65 0-2.825-1.175T6 17q0-1.65 1.175-2.825T10 13q.575 0 1.063.138t.937.412V12l2 2v3q0 1.65-1.175 2.825T10 21"
                            />
                        </svg>
                    </span>
                )}
            </button>
        </>
    );
};

export default GlobalMusicPlayer;
