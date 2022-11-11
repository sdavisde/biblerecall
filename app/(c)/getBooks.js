import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function getBooks () {
    const { data, error } = useSWR(`/api/books`, fetcher);

    return {
        books: data,
        isLoading: !error && !data,
        isError: error
    }
}