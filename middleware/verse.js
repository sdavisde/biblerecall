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

export function AddNewVerse(verse) {
    const { book, chapterId, verseId, text, group } = verse;
    return fetch(`/api/add_verse?book=${book}&chapter=${chapterId}&verseNumber=${verseId}&text=${text}&group=${group}`).then((res) => res.json());
}