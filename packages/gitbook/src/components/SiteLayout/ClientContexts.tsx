'use client';

import type { CustomizationThemeMode, SiteExternalLinksTarget } from '@gitbook/api';
import { ThemeProvider } from 'next-themes';
import type React from 'react';
import { LinkSettingsContext } from '../primitives';

export function ClientContexts(props: {
    nonce?: string;
    forcedTheme: CustomizationThemeMode | undefined;
    externalLinksTarget: SiteExternalLinksTarget;
    children: React.ReactNode;
}) {
    const { children, forcedTheme, externalLinksTarget } = props;

    /**
     * A bug in ThemeProvider is causing the nonce to be included incorrectly
     * on the client-side. Original issue: https://github.com/pacocoursey/next-themes/issues/218
     *
     * This is a workaround for it, until next-themes fixes it in their library. There is already
     * a PR: https://github.com/pacocoursey/next-themes/pull/223
     */
    const nonce = typeof window === 'undefined' || !props.nonce ? props.nonce : '';

    return (
        <ThemeProvider nonce={nonce} attribute="class" enableSystem forcedTheme={forcedTheme}>
            <LinkSettingsContext.Provider value={{ externalLinksTarget }}>
                {children}
            </LinkSettingsContext.Provider>
        </ThemeProvider>
    );
}
