/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import Pagination, { Sensationalist } from './UI/pagination/pagination';

interface RenderPaginationProps extends PaginationTypes, Sensationalist {}

export interface PaginationTypes {
  IsArtLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  filteredImages: {
    id: number;
    locationId: number;
    authorId: number;
    created: string;
    imageUrl: string;
    name: string;
  }[];
  artError: string;
  locationList: {
    id: number;
    location: string;
  }[];
  authorsList: {
    id: number;
    name: string;
  }[];
}
function RenderPagination({
  IsArtLoading,
  setPage,
  filteredImages = [],
  page,
  totalPages,
  changePage,
}: RenderPaginationProps) {
  const IfPagination = !IsArtLoading && filteredImages.length > 0;
  if (IfPagination) {
    return (
      <Pagination
        changePage={changePage}
        page={page}
        totalPages={totalPages}
        firstPage={() => setPage(1)}
        decrementPage={() => setPage(page - 1)}
        incrementPage={() => setPage(page + 1)}
        lastPage={() => setPage(totalPages)}
      />
    );
  }
  return null;
}

export default RenderPagination;
