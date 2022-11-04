'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Lightbox from './(c)/Lightbox';
import ProgressBar from '../../../../components/ProgressBar';
import loadingGif from '../../../../assets/loading.gif';
import retry from '../../../../assets/retry.png';
import forward from '../../../../assets/forward.png';
import $ from 'jquery';
import styles from './Game.module.scss';

export default function Game({ verseData }) {
    const [verseComplete, setVerseComplete] = useState(false);
    const [isTransition, setIsTransition] = useState(false);
    const [finished, setFinished] = useState(false);
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const [completed, setCompleted] = useState(0);
    const displayedText = verseData ? verseData.text.split(' ') : [];
    // Same in every game mode, used for coloring logic.
    const textRefs = verseData ? verseData.text.split(' ').map((word) => {
            return {
                word: word.toLowerCase(),
                length: word.length,
                processed: false
            };
        }) : null;
    const [difficulty, setDifficulty] = useState(1);
    const [parity, setParity] = useState('odd');
    const [key, setKey] = useState(null);
    const [wordsCorrect, setWordsCorrect] = useState(0);
    const input = useRef(null);
    const loading_time = 4000;

    let setGameMode = (diff, loadGif = true) => {
        // trigger a 1 second load gif to switch between difficulties
        if (loadGif)
            triggerLoad();

        // reset position in displayed text
        setIndex(0);
        input.current.focus();
        $('.verse_word').removeClass().addClass('verse_word').delay(800);

        // if diff 1, already reset.        
        // if diff 2, add "background_font" class to every other displayText 
        if (diff == 2) {
            // compare with previous difficulty
            if (difficulty == 2) {
                setParity((parity == 'odd') ? 'even' : 'odd');
            }

            // iterate through each word, and take 1200 / n seconds for each one.
            const delayTime = loading_time / displayedText.length;
            $(`.verse_words div :nth-child(${parity})`).each((i, elem) => {
                setTimeout(() => {
                    $( elem ).addClass('hidden');
                }, i*delayTime);
            });
        } 

        // if diff 3, add "background_font" class to every displayText
        else if (diff == 3) {
            const delayTime = loading_time / displayedText.length;
            $(`.verse_words div div`).each((i, elem) => {
                setTimeout(() => {
                    $( elem ).addClass('hidden');
                }, i*delayTime);
            });
        }

        setDifficulty(diff);
    }

    let onChange = (e) => {
        e.target.value = '';

        if (index < textRefs.length) {
            $(`.verse_words div`).removeClass('target');

            if ($(`.verse_word:nth-child(${index + 1})`))
                $(`.verse_word:nth-child(${index + 1})`).removeClass('hidden');

            if ($(`.verse_word:nth-child(${index + 2})`))
                $(`.verse_word:nth-child(${index + 2})`).addClass('target');

            const target = textRefs[index];
            let valid = target.word[0] == key.toLowerCase();

            if (valid)
                setWordsCorrect(prev => (prev + 1));

            $(`#verse_word_${index}`)[0].classList.add(valid ? 'right' : 'wrong');

            setIndex(prev => (prev + 1));

            const correctPercent = Math.round((wordsCorrect / textRefs.length) * 100);
            setCompleted(correctPercent);
            valid = (correctPercent >= 90);

            // Verse is complete! Evaluate player performance
            if (index >= textRefs.length - 1) {

                if (valid) {
                    switch (difficulty) {
                        case 1:
                            setIsTransition(true);
                            break;
                        case 2:
                            setIsTransition(true);
                            break;
                        case 3:
                            setFinished(true);
                            setTimeout(() => {
                                router.push('/');
                            }, 4000);
                            break;
                    }
                } else {
                    setFailed(true);
                    setTimeout(() => {
                        setFailed(false);
                        setVerseComplete(false);
                        setGameMode(difficulty, false);
                    }, 4000);
                }

                setWordsCorrect(0);
            }
        }
    };

    let onKeyDown = (e) => {
        setKey(e.key);
    }

    let triggerLoad = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVerseComplete(false);
        }, loading_time);
    }

    let moveForward = () => {
        setIsTransition(false);
        setVerseComplete(true);
        setCompleted(0);
        setGameMode(difficulty + 1);
    }

    let retryStep = () => {
        setIsTransition(false);
        setCompleted(0);
        setGameMode(difficulty);
    }

    return (
        <>
            <div className={styles.bottomSection}>
                <div className={styles.title}>
                    <h1>{verseData.book} {verseData.chapter}:{verseData.verse}</h1>
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.banner}>
                        {
                            (verseComplete)
                            ?
                            (<div className={styles.win}>
                                <em>Good job memorizing this verse. Moving to next step...</em>
                            </div>)
                            :
                            (<div className={styles.info}>
                                <em>Type the first letter of each word to memorize this verse!</em>
                            </div>)
                        }
                    </div>
                    <div className='verse_words'>
                        <div className={styles.verseDisplay}>
                            {displayedText.map((text, index) => 
                                <div id={'verse_word_'+index} 
                                    key={index} 
                                    className={`verse_word ${index == 0 ? 'target' : ''}`}>{text}</div>
                            )}
                        </div>
                    </div>
                    <div className={styles.answerBox}>
                        {
                            (loading)
                            &&
                            <div className={styles.gifContainer}>
                                <Image src={loadingGif} width={218} height={149} alt=''/>
                            </div>
                        }
                        <input placeholder='Answer Here!' 
                            onKeyDown={(e) => onKeyDown(e)}
                            onChange={(e) => onChange(e)}
                            className={styles.input}
                            ref={input}
                            autoFocus />
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step} onClick={() => setGameMode(1)}>
                            Step 1
                        </div>
                        <div className={styles.step} onClick={() => setGameMode(2)}>
                            Step 2
                        </div>
                        <div className={styles.step} onClick={() => setGameMode(3)}>
                            Step 3
                        </div>
                    </div>
                    <div className={styles.progressBarContainer}>
                        <ProgressBar bgcolor={'#3B5249'} completed={completed} key={completed}/>
                    </div>
                </div>
            </div>
            <Lightbox key={finished} control={finished} showClose={false} simpleLayout={true}>
                <h1>Great Job!</h1>
                <p>
                    You&apos;ve memorized this verse. Try memorizing another one!
                </p>
                <Image src={loadingGif} width={218} height={149} alt=''/>
            </Lightbox>
            <Lightbox key={isTransition} control={isTransition} showClose={false} simpleLayout={true}>
                <h1>Well Done!</h1>
                <p>
                    You&apos;ve completed this step. Would you like to re-do this step, or move forward?
                </p>
                <div className={styles.buttons}>
                    <div onClick={() => retryStep()} className={styles.retry}>
                        <Image src={retry} width={218} height={149} alt='Retry'/>
                    </div>
                    <div onClick={() => moveForward()} className={styles.forward}>
                        <Image src={forward} width={218} height={149} alt='Continue'/>
                    </div>
                </div>
            </Lightbox>
            <Lightbox key={failed} control={failed} showClose={false} simpleLayout={true}>
                <h1>Sorry!</h1>
                <p>
                    You got less than 90% of this verse correct. Try mastering this step before continuing!
                </p>
                <Image src={loadingGif} width={218} height={149} alt=''/>
                <div className={styles.progressBarContainer}>
                    <ProgressBar bgcolor={'#3B5249'} completed={completed} key={completed}/>
                </div>
            </Lightbox>
        </>
	);
}