import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

let sound: Howl | null = null;

/**
 * オーディオプレーヤーのカスタムフック
 * @returns {object} 再生状態と再生/一時停止のトグル関数
 */
export const useAudioPlayer = () => {
    // 再生状態
    const [isPlaying, setIsPlaying] = useState(() => {
        // ローカルストレージから再生状態を読み込む
        const storedState = localStorage.getItem('isPlaying');
        return storedState === 'true';
    });

    /**
     * 最大音量 - あまり大きくしすぎないように
     */
    const maxVolume = 0.3;

    // サウンドオブジェクトの初期化とイベントハンドラの設定
    useEffect(() => {
        if (!sound) {
            sound = new Howl({
                src: ['/music/night-walk.mp3'],
                html5: true,
                volume: maxVolume,
                loop: true,
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

    // 再生/一時停止のトグル関数
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
