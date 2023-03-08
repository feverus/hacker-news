import { NewsItem } from '~/interfaces'

export type NewsList = (newsItems: NewsItem[]) => [
    state: {
        newsItems: NewsItem[],
    },
    api: {
        updateIds: () => void,
    }
];