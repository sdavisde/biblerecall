import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function getVerses (userId) {
    const { data, mutate, error } = useSWR(`/api/settings?userId=${userId}`, fetcher);

    return {
        user_settings: data,
        settings_loading: !data && !error,
        refresh: mutate,
        path: `/api/settings?userId=${userId}`,
        settings_error: error
    }
}