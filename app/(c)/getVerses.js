import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function getVerses (userId) {
    const { data, mutate, error } = useSWR(`/api/retrieve_verses?userId=${userId}`, fetcher);

    return {
        verses: data,
        isLoading: !data && !error,
        refresh: mutate,
        path: `/api/retrieve_verses?userId=${userId}`,
        error: error
    }
}