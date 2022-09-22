export function GetGroups() {
    return fetch('/api/groups').then((res) => res.json());
} 

export function GetBooks() {
    return fetch(`/api/books`).then((res) => res.json());
}

export function GetChapters(bookId) {
    return fetch(`/api/chapters?bookId=${bookId}`).then((res) => res.json());
}

export function GetVerses(bookId, chapterId) {
    return fetch(`/api/verses?bookId=${bookId}&chapterId=${chapterId}`).then((res) => res.json());
}

export function GetVerseText(bookId, chapterId, verseId) {
    return fetch(`/api/retrieve_verseText?bookId=${bookId}&chapterId=${chapterId}&verseId=${verseId}`).then((res) => res.json());
}

export function AddNewVerse(verse) {
    const { book, chapterId, verseId, text, group } = verse;
    return fetch(`/api/add_verse?book=${book}&chapter=${chapterId}&verseNumber=${verseId}&text=${text}&group=${group}`).then((res) => res.json());
}

export function UpdateVerse(verse) {
    // TODO 
    const { book, chapterId, verseId, text, group } = verse;
    return fetch(`/api/update_verse?`);
}