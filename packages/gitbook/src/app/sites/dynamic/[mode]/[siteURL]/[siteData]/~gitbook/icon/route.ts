import type { NextRequest } from 'next/server';

import { type RouteLayoutParams, getDynamicSiteContext } from '@/app/utils';
import { serveIcon } from '@/routes/icon';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<RouteLayoutParams> }
) {
    const { context } = await getDynamicSiteContext(await params);
    return serveIcon(context, request);
}
