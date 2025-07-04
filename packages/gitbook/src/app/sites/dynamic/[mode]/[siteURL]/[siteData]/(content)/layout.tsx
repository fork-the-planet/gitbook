import { type RouteLayoutParams, getDynamicSiteContext } from '@/app/utils';
import { CustomizationRootLayout } from '@/components/RootLayout';
import {
    SiteLayout,
    generateSiteLayoutMetadata,
    generateSiteLayoutViewport,
} from '@/components/SiteLayout';
import { GITBOOK_DISABLE_TRACKING } from '@/lib/env';
import { getThemeFromMiddleware } from '@/lib/middleware';

interface SiteDynamicLayoutProps {
    params: Promise<RouteLayoutParams>;
}

export default async function SiteDynamicLayout({
    params,
    children,
}: React.PropsWithChildren<SiteDynamicLayoutProps>) {
    const { context, visitorAuthClaims } = await getDynamicSiteContext(await params);
    const forcedTheme = await getThemeFromMiddleware();

    return (
        <CustomizationRootLayout forcedTheme={forcedTheme} customization={context.customization}>
            <SiteLayout
                context={context}
                forcedTheme={forcedTheme}
                withTracking={!GITBOOK_DISABLE_TRACKING}
                visitorAuthClaims={visitorAuthClaims}
            >
                {children}
            </SiteLayout>
        </CustomizationRootLayout>
    );
}

export async function generateViewport({ params }: SiteDynamicLayoutProps) {
    const { context } = await getDynamicSiteContext(await params);
    return generateSiteLayoutViewport(context);
}

export async function generateMetadata({ params }: SiteDynamicLayoutProps) {
    const { context } = await getDynamicSiteContext(await params);
    return generateSiteLayoutMetadata(context);
}
