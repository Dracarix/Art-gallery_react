import React from 'react';
import Loader from './UI/Loader/Loader';
import ImgBox from './UI/ImgBox/ImgBox';
import { PaginationTypes } from './renderPagination';

function RenderImages({
  IsArtLoading,
  filteredImages,
  authorsList,
  locationList,
  artError,
}: PaginationTypes) {
  if (IsArtLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '96px',
        }}
      >
        <Loader />
      </div>
    );
  }
  if (filteredImages.length) {
    return (
      <ImgBox
        images={filteredImages.map((paints) => {
          const author = authorsList.find((a) => a.id === paints.authorId);
          const location = locationList.find((l) => l.id === paints.locationId);

          const value = paints.id;
          const { name } = paints;
          const locationID = location ? location.location : '';
          const authors = author ? author.name : '';
          const { imageUrl, created } = paints;

          return {
            value,
            name,
            locationID,
            authors,
            imageUrl,
            created,
          };
        })}
      />
    );
  }
  if (artError) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '96px',
          fontSize: 20,
        }}
      >
        Ошибка
        {' '}
        {artError}
      </div>
    );
  }

  return (
    <h1
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
        margin: '48px 0 0',
      }}
    >
      No more paintings found
    </h1>
  );
}

export default RenderImages;
