import { useMemo } from 'react';

export function useSelectors(reducer, mapStateToSelectors) {
    const [state] = reducer;
    const selectors = useMemo(() => mapStateToSelectors(state), [state, mapStateToSelectors]);
    return selectors;
}

export default useSelectors;
