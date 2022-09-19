import styles from '../../styles/VerseGame.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import arrow from '../../assets/arrow.png';
import { GetVerseIds, GetVerseData } from '../../db_access/pageData';

export default function VerseGame({ verseData }) {
    const [cursorPosition, setCursorPosition] = useState(0);
    const router = useRouter();

    let key = null;
    const text = verseData.text;

    let onChange = (e) => {
        // Check that the keystroke is correct for that word
        // Highlight the word red or black depending on if it's correct
        // Move to the next word
        console.log(`onchange`);

        let textarea = e.target;

        if (textarea) {
            const input = key;
            const cursor = e.target.selectionStart;

            if (input && cursor && text) {
                let end = textarea.selectionEnd;
                let wordLength = 5;
                
                // Get letter at cursor, determine right vs wrong
                if (text[cursor-1].toLowerCase() == input.toLowerCase()) {
                    console.log('correct answer!');
                }
                else {
                    console.log('incorrect answer!');
                }

                // Determine length of word selected
                let remainingString = text.substring(cursor, text.indexOf(' ', cursor));
                wordLength = remainingString.length + 1;

                // Remove user changes and move cursor forward
                textarea.value = text;
                textarea.selectionEnd = end + wordLength;
                textarea.selectionStart = end + wordLength;
            }
        }
    };

    let onKeyDown = (e) => {
        key = e.key;
    }

    return (
        <>
            <Head>
                <title>Bible Recall</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.topSection}>
                    <div className={styles.title}>
                        <h1>Bible</h1>
                        <img className={styles.bible}/> 
                        <h1>Recall</h1>          
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    {
                        (router.isFallback)
                        ?
                        (<div>Loading...</div>)
                        :
                        (
                        <>
                            <div className={styles.title}>
                                <h1>{verseData.book} {verseData.chapter}:{verseData.verse}</h1>
                            </div>
                            <div className={styles.cardContainer}>
                                <div className={styles.card}>
                                    <textarea name="text" 
                                            placeholder='Verse Text'
                                            onKeyDown={(e) => onKeyDown(e)}
                                            onChange={(e) => onChange(e)}
                                            spellCheck="false"
                                            className={styles.verseText}
                                            defaultValue={verseData.text}
                                            autoFocus>
                                    </textarea>
                                </div>
                                <div className={styles.steps}>
                                    <div className={styles.step}>
                                        Step 1
                                    </div>
                                    <div className={styles.step}>
                                        Step 2
                                    </div>
                                    <div className={styles.step}>
                                        Step 3
                                    </div>
                                </div>
                                <div className={styles.leftContainer}>
                                    <Link href={"/"}>
                                        <Image 
                                            src={arrow}
                                            width="50px"
                                            height="50px"    
                                        />
                                    </Link>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
            </main>
        </>
	);
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    let paths = GetVerseIds().then((paths) => {
        return {
            paths,
            fallback: true,
        };
    });

    return paths;
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the verse game using params.id
    let propsList = GetVerseData(params.id).then((verseData) => {

        console.log(`verse data: ${verseData}`);

        return {
            props: {
                verseData
            }
        };
    });

    return propsList;
}