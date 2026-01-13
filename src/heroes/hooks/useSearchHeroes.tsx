import { useQuery } from "@tanstack/react-query";
import { searchHeroesActions } from "../actions/search-heroes.action";

// interface Options {
//     name?: string;
//     team?: string;
//     category?: string;
//     universe?: string;
//     status?: string;
//     strength?: string;
// }

export const useSearchHeroes = (name: string | undefined, strength: string | undefined) => {

    return useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesActions({ name, strength }),
        staleTime: 1000 * 60 * 5,
    });
}
