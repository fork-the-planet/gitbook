import { type NextRequest, NextResponse } from 'next/server';

import { getLogger } from '@/lib/logger';
import { withVerifySignature } from '@/lib/routes';
import { revalidateTag } from 'next/cache';

interface JsonBody {
    tags: string[];
}

/**
 * Revalidate cached data based on tags.
 * The body should be a JSON with { tags: string[] }
 */
export async function POST(req: NextRequest) {
    const logger = getLogger().subLogger('revalidate');
    return withVerifySignature<JsonBody>(req, async (body) => {
        if (!body.tags || !Array.isArray(body.tags)) {
            return NextResponse.json(
                {
                    error: 'tags must be an array',
                },
                { status: 400 }
            );
        }

        body.tags.forEach((tag) => {
            logger.log(`Revalidating tag: ${tag}`);
            revalidateTag(tag);
        });

        return NextResponse.json({
            success: true,
        });
    });
}
