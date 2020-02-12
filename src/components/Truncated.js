import { useTruncated } from '../shared/hooks/useTruncated';

export function Truncated ({ text, limit }) {
    const renderText = useTruncated(text, limit);
    return (renderText);
}