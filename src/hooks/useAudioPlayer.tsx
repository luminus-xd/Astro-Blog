import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

let sound: Howl | null = null;

export const useAudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(() => {
        // ローカルストレージから再生状態を読み込む
        const storedState = localStorage.getItem('isPlaying');
        return storedState === 'true';
    });

    const maxVolume = 0.36;

    useEffect(() => {
        if (!sound) {
            sound = new Howl({
                src: ['/music/night-walk.mp3'],
                html5: true,
                volume: maxVolume,
            });

            sound.on('play', () => {
                setIsPlaying(true);
                localStorage.setItem('isPlaying', 'true');
            });

            sound.on('pause', () => {
                setIsPlaying(false);
                localStorage.setItem('isPlaying', 'false');
            });

            sound.on('stop', () => {
                setIsPlaying(false);
                localStorage.setItem('isPlaying', 'false');
            });

            // 初回読み込み時に再生状態を確認して同期する
            if (sound && sound.playing()) {
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
    }, []);

    const togglePlay = useCallback(() => {
        if (sound) {
            if (!isPlaying) {
                sound.play();
            } else {
                sound.pause();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying, sound]);

    return { isPlaying, togglePlay };
};
