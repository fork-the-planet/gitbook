/**
 * Join path parts and normalize the result.
 */
export function joinPath(...parts: string[]): string {
    return parts.join('/').replace(/\/+/g, '/');
}

/**
 * Remove the trailing slash from a path.
 */
export function removeTrailingSlash(path: string): string {
    return path.replace(/\/+$/, '');
}

/**
 * Remove the leading slash from a path.
 */
export function removeLeadingSlash(path: string): string {
    return path.replace(/^\/+/, '');
}

/**
 * Normalize a pathname to make it start with a slash
 */
export function withLeadingSlash(pathname: string): string {
    if (!pathname.startsWith('/')) {
        pathname = `/${pathname}`;
    }

    return pathname;
}

/**
 * Normalize a pathname to make it end with a slash
 */
export function withTrailingSlash(pathname: string): string {
    if (!pathname.endsWith('/')) {
        pathname = `${pathname}/`;
    }

    return pathname;
}
