import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk';

/**
 * タグの型定義
 */
export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

/**
 * ライターの型定義
 */
export type Writer = {
  name: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

/**
 * 記事の型定義
 */
export type Blog = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  tags?: Tag[];
  writer?: Writer;
  tocVisible: boolean;
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

/**
 * Initialize Client SDK.
 * @see https://github.com/microcmsio/microcms-js-sdk
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

/**
 * ブログ一覧を取得
 * @param queries
 * @returns
 */
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: 'blog',
    queries,
  });

  return listData;
};

/**
 * ブログの詳細を取得
 * @param contentId
 * @param queries
 * @returns
 */
export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Blog>({
    endpoint: 'blog',
    contentId,
    queries,
  });

  return detailData;
};

/**
 * タグの一覧を取得
 * @param queries
 * @returns
 */
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Tag>({
    endpoint: 'tags',
    queries,
  });

  return listData;
};

/**
 * タグの詳細を取得
 * @param contentId
 * @param queries
 * @returns
 */
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Tag>({
    endpoint: 'tags',
    contentId,
    queries,
  });

  return detailData;
};
