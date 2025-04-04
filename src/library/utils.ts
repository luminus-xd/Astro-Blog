import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

/**
 * Dateオブジェクトをフォーマットして返す
 * @param date Dateオブジェクト
 * @returns
 */
export function formatDate(date: string) {
    const utcDate = new Date(date);
    const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
    return format(jstDate, 'yyyy-MM-dd');
}

/**
 * リッチテキストをフォーマットして返す
 * シンタックスハイライトをhljsで行う
 * pre codeタグにtabindexを追加する
 * @param richText microCMSのリッチテキスト
 * @returns
 */
export function formatRichText(richText: string) {
    const $ = load(richText);
    const highlight = (text: string, lang?: string) => {
        if (!lang) return hljs.highlightAuto(text);
        try {
            return hljs.highlight(text, { language: lang?.replace(/^language-/, '') || '' });
        } catch (e) {
            return hljs.highlightAuto(text);
        }
    };
    $('pre code').each((_, elm) => {
        const lang = $(elm).attr('class');
        const res = highlight($(elm).text(), lang);
        $(elm).html(res.value);
        $(elm).attr('tabindex', '0');
    });
    return $.html();
}

/**
 * 目次のオブジェクト型
 */
export type TocEntry = {
    name?: string;
    text?: string;
    id?: string;
};

/**
 * 目次のオブジェクトを返す
 * @param body リッチテキスト
 * @returns
 */
export const renderToc = (body: string): TocEntry[] => {
    const $ = load(body);
    const headings = $('h2, h3, h4').toArray();
    const toc: TocEntry[] = headings.map((data) => {
        const element = $(data);
        const name = data.name;
        const id = data.attribs?.id;
        const text = element.text();
        return { name, text, id };
    });

    return toc;
};
