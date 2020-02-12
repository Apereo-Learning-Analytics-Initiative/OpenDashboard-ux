import React from 'react';
import truncate from 'lodash/truncate';

export const DEFAULT_TRUNCATE_LIMIT = 20;

export function useTruncated(text, limit) {
    return React.useMemo (() => truncate(text, limit ? limit : DEFAULT_TRUNCATE_LIMIT), [text, limit]);
}