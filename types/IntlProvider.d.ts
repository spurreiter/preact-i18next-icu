/**
 * @param {object} props
 * @param {preact.AnyComponent} props.children
 * @param {preact.AnyComponent} props.fallback fallback component which is rendered while new language settings are loading
 * @param {import('i18next').Module[]} [props.backends]
 * @param {object} [props.options] i18next init options
 * @param {string[]} [props.lngs] load languages on start
 * @returns {preact.VNode}
 */
export function IntlProvider(props: {
    children: preact.AnyComponent;
    fallback: preact.AnyComponent;
    backends?: import("i18next").Module[] | undefined;
    options?: object;
    lngs?: string[] | undefined;
}): preact.VNode;
/**
 * @returns {IntlProviderContext}
 */
export function useTranslation(): IntlProviderContext;
/**
 * @param {any} [instance]
 * @param {string} [lng]
 * @returns {string[]}
 */
export function getLanguages(instance?: any, lng?: string | undefined): string[];
export type IntlProviderContext = import('./types').IntlProviderContext;
