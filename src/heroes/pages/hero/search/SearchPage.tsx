import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
// import { useSearchHeroes } from "@/heroes/hooks/useSearchHeroes";
import { searchHeroesActions } from "@/heroes/actions/search-heroes.action";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";


export const SearchPage = () => {

    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;

    // const { data: heroes } = useSearchHeroes(name, strength);

    const { data: heroes = [] } = useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesActions({ name, strength }),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <>
            <CustomJumbotron
                title='Búsqueda de SuperHéroes'
                description="Descubre, explora y administra superhéroes y villanos"
            />

            <CustomBreadcrumbs currentPage="Buscador de Héroes"
            // breadcrumbs={[
            //     { label: 'Home1', to: '/' },
            //     { label: 'Home2', to: '/' },
            //     { label: 'Home3', to: '/' },
            // ]}
            />

            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            {/* */}
            <HeroGrid heroes={heroes ?? []} />
        </>
    )
}

export default SearchPage;

