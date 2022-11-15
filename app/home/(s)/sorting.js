var bookList = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", 
"Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", 
"2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", 
"Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", 
"Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", 
"Zechariah", "Malachi", "Tobit", "Judith", "Ecclesiasticus (Sirach)", "Matthew", "Mark", 
"Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", 
"Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", 
"2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", 
"2 John", "3 John", "Jude", "Revelation"];

/* Returns -1 if a is first, 1 if b is first, and 0 if same */
export function biblical (a, b) {
    const a_book_id = bookList.indexOf(a.book);
    const b_book_id = bookList.indexOf(b.book);

    if (a_book_id < b_book_id) {
        return -1;
    } else if (b_book_id < a_book_id) {
        return 1;
    } else if (a.chapter < b.chapter) {
        return -1;
    } else if (b.chapter < a.chapter) {
        return 1;
    } else if (a.verse.split(' - ')[0] < b.verse.split(' - ')[0]) {
        return -1;
    } else if (b.verse.split(' - ')[0] < a.verse.split(' - ')[0]) {
        return 1;
    } else {
        if (b.verse.includes('-') && !a.verse.includes('-')) {
            return -1;
        } else if (a.verse.includes('-') && !b.verse.includes('-')) {
            return 1;
        } 
        return 0;
    }
}