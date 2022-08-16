/** @typedef {import('./types').IntlMessageProps} IntlMessageProps */
/**
 * @see https://formatjs.io/docs/core-concepts/icu-syntax
 * @param {IntlMessageProps} props
 * @returns {string|null}
 */
export function Message(props: IntlMessageProps): string | null;
export type IntlMessageProps = import('./types').IntlMessageProps;
