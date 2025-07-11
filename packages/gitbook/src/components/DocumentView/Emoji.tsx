import type { DocumentInlineEmoji } from '@gitbook/api';

import { Emoji as EmojiPrimitive } from '@/components/primitives';

import type { InlineProps } from './Inline';

export function Emoji(props: InlineProps<DocumentInlineEmoji>) {
    const { inline } = props;

    return <EmojiPrimitive code={inline.data.code} />;
}
