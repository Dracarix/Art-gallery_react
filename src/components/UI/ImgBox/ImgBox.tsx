import React from 'react';
import cl from './ImgBox.module.scss';

interface SelectImg {
  images: Array<{
    value: number;
    name: string;
    imageUrl: string;
    authors: string;
    created: string;
    locationID: string;
  }>;
}
function ImgBox({ images }: SelectImg) {
  const baseUrl = 'https://test-front.framework.team/';
  return (
    <div className={cl.ArtSection}>
      {images.map((imag) => (
        <div className={cl.ImgBoxed} key={imag.value}>
          <img src={baseUrl + imag.imageUrl} alt={imag.name} />
          <div className={cl.cartInfo}>
            <h3>{imag.name}</h3>
            <span>
              Author:
              {' '}
              <p>{imag.authors}</p>
            </span>
            <span>
              Created:
              {' '}
              <p>{imag.created}</p>
            </span>
            <span>
              Location:
              {' '}
              <p>{imag.locationID}</p>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImgBox;
