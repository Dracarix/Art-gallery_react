import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './styles/App.scss';
import './styles/Variables.scss';
import ArtFetch from './API/ArtFetch';
import useFetching from './hooks/useFeching';
import { getPagesCount } from './utils/pages';
import './styles/index.module.scss';
import RenderPagination from './components/renderPagination';
import RenderImages from './components/renderImages';
import FilteredForm from './components/UI/form/FilteredForm';
import MainHeader from './components/Header';

function App() {
  const [createdFrom, setCreatedFrom] = useState<string>('');
  const [createdBefore, setCreatedBefore] = useState<string>('');
  const [authorsList, setAuthorsList] = useState<
  { id: number; name: string }[]
  >([]);
  const [locationList, relocationList] = useState<
  { id: number; location: string }[]
  >([]);
  const [paintings, setPaintings] = useState<
  {
    id: number;
    locationId: number;
    authorId: number;
    created: string;
    imageUrl: string;
    name: string;
  }[]
  >([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null,
  );
  const [searchInp, setSearchInp] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(12);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [fetchData, IsArtLoading, artError] = useFetching(async () => {
    const totalCountHeader = await ArtFetch.getAll(
      setAuthorsList,
      relocationList,
      setPaintings,
      {
        limit,
        page,
        searchQuery: searchInp,
        selectedAuthorId,
        selectedLocationId,
        createdFrom,
        createdBefore,
      },
    );
    const totalCount = parseInt(totalCountHeader, 10);
    setTotalPages(getPagesCount({ totalCount, limit }));
  });

  useEffect(() => {
    fetchData();
  }, [page, searchInp, selectedAuthorId, selectedLocationId]);

  const handleAuthorChange = useCallback(
    (authorId: number) => {
      setSelectedAuthorId(authorId);
      setPage(1);
    },
    [setSelectedAuthorId],
  );
  const handleLocationChange = useCallback(
    (locationId: number) => {
      setSelectedLocationId(locationId);
      setPage(1);
    },
    [setSelectedLocationId],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInp(e.target.value);
      setPage(1);
    },
    [],
  );

  const filteredImages = useMemo(
    () => paintings.filter(
      (paints) => (!selectedAuthorId || paints.authorId === selectedAuthorId)
          && (!selectedLocationId || paints.locationId === selectedLocationId)
          && paints.name.toLowerCase().includes(searchInp.toLowerCase())
          && (!createdFrom || +paints.created >= +createdFrom)
          && (!createdBefore || +paints.created <= +createdBefore),
    ),
    [
      paintings,
      page,
      limit,
      selectedAuthorId,
      selectedLocationId,
      searchInp,
      createdFrom,
      createdBefore,
    ],
  );
  const handleFromInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    const fromValue = event.target.value;
    setCreatedFrom(fromValue);
  };

  const handleBeforeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    const beforeValue = event.target.value;
    setCreatedBefore(beforeValue);
  };
  return (
    <div className="App">
      <MainHeader />
      <FilteredForm
        handleFromInputChange={handleFromInputChange}
        searchInp={searchInp}
        selectedAuthorId={selectedAuthorId}
        handleAuthorChange={handleAuthorChange}
        authorsList={authorsList}
        selectedLocationId={selectedLocationId}
        handleLocationChange={handleLocationChange}
        locationList={locationList}
        neededInput
        handleBeforeInputChange={handleBeforeInputChange}
        handleInputChange={handleInputChange}
      />
      <RenderImages
        IsArtLoading={IsArtLoading}
        filteredImages={filteredImages}
        authorsList={authorsList}
        locationList={locationList}
        artError={artError}
        setPage={setPage}
      />
      <RenderPagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        filteredImages={filteredImages}
        IsArtLoading={IsArtLoading}
        firstPage={() => setPage(1)}
        decrementPage={() => setPage(page - 1)}
        incrementPage={() => setPage(page + 1)}
        lastPage={() => setPage(totalPages)}
        changePage={(p: number) => setPage(p)}
        artError=""
        locationList={[]}
        authorsList={[]}
      />
    </div>
  );
}

export default App;
