import { WatchedMediaCard } from "components/media/WatchedMediaCard";
import { SearchBarInput } from "components/SearchBar";
import { MWMedia, MWMediaType, SearchProviders } from "scrapers";
import { useState } from "react";
import { ThinContainer } from "components/layout/ThinContainer";
import { SectionHeading } from "components/layout/SectionHeading";
import { Icons } from "components/Icon";
import { Loading } from "components/layout/Loading";
import { Tagline } from "components/Text/Tagline";
import { Title } from "components/Text/Title";

export function SearchView() {
  const [results, setResults] = useState<MWMedia[]>([]);
  const [search, setSearch] = useState("");

  async function runSearch() {
    const results = await SearchProviders({
      type: MWMediaType.MOVIE,
      searchQuery: search,
    });
    setResults(results);
  }

  return (
    <ThinContainer>
      <div className="mt-36 text-center space-y-16">
        <div className="space-y-4">
          <Tagline>Because watching legally is boring</Tagline>
          <Title>What movie do you want to watch?</Title>
        </div>
        <SearchBarInput
          onChange={setSearch}
          value={search}
          onClick={runSearch}
          placeholder="What movie do you want to watch?"
        />
      </div>
      <SectionHeading title="Yoink" icon={Icons.SEARCH}>
        {results.map((v) => (
          <WatchedMediaCard media={v} />
        ))}
      </SectionHeading>
      <Loading />
    </ThinContainer>
  );
}
