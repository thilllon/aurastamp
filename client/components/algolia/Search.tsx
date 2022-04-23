// import algoliasearch and InstantSearch
import algoliasearch from 'algoliasearch/lite';
import {
  connectSearchBox,
  connectStateResults,
  Hits,
  InstantSearch,
  SearchBox,
} from 'react-instantsearch-dom';

export const Search = () => {
  // Initialize the Algolia client
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  return (
    <>
      <InstantSearch
        searchClient={searchClient} // this is the Algolia client
        indexName='dev_coffeeclass.io' // this is your index name
      >
        <SearchBox />
        <Hits />
      </InstantSearch>
    </>
  );
};

const CustomSearchBox = connectSearchBox(({ refine }: any) => {
  return (
    <>
      <input
        id='algolia_search'
        type='search'
        placeholder='Search for articles!'
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </>
  );
});

export const CustomHits = connectStateResults(({ searchState, searchResults }) => {
  // 3 is the minimum query length
  const validQuery = searchState?.query ? searchState.query.length >= 3 : false;

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && <p>No results found!</p>}

      {searchResults?.hits.length > 0 && validQuery && (
        <>
          {/* {searchResults.hits.map((hit, index) => (
                        <div tabIndex={index} key={hit.objectID}>
                            <p>{hit.title}</p>
                        </div>
                    ))} */}
        </>
      )}
    </>
  );
});
