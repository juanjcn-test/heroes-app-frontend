import { beforeEach, describe, expect, test, vi } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react";

import { useSearchHeroes } from "./useSearchHeroes";
// import { searchHeroesActions } from "../actions/search-heroes.action";

vi.mock('../actions/search-heroes.action', () => ({
    searchHeroesActions: vi.fn()
}));

// const mockSearchHeroesActions = vi.mocked(searchHeroesActions);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const tanStackCustomProvider = () => {
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
};

describe('useSearchHeroes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    })

    test('should return the initial state', () => {
        const { result } = renderHook(() => useSearchHeroes(undefined, undefined), {
            wrapper: tanStackCustomProvider(),
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();

    });

    // test('should return success state when API call succeeds', async () => {

    //     const mockSearchData = {
    //         name: 'superman',
    //         strength: 10,
    //     };

    //     mockSearchHeroesActions.mockResolvedValue(mockSearchData);

    //     const { result } = renderHook(() => useSearchHeroes(1, 6), {
    //         wrapper: tanStackCustomProvider(),
    //     });

    //     await waitFor(() => {
    //         expect(result.current.isSuccess).toBe(true);
    //     });

    //     expect(result.current.status).toBe('success');
    //     expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    //     expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');

    // });

    // test('should call searchHeroesActions with default values', () => {
    //     const { result } = renderHook(() => usePaginatedHero(undefined, undefined), {
    //         wrapper: tanStackCustomProvider(),
    //     });
    // });
});