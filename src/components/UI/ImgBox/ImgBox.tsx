/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectImages, imageLoaded, imageError } from '../../../store/art-load/ArtApi.slise';
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
  const baseUrl = 'https://test-front.framework.team';
  const { loadedImages } = useSelector(selectImages);
  const { loadingAttempts } = useSelector(selectImages);
  const dispatch = useDispatch();

  const handleImageLoad = (value: number) => {
    dispatch(imageLoaded(value));
  };

  const handleImageError = (value: any) => {
    dispatch(imageError(value));
  };

  useEffect(() => {
    const loadImages = async () => {
      await Promise.all(
        Object.keys(loadingAttempts).map(async (value) => {
          const intValue = Number(value);
          if (loadingAttempts[intValue] < 3 && !loadedImages.includes(intValue)) {
            const imgElement = document.querySelector(`img[data-value="${intValue}"]`) as HTMLImageElement | null;

            if (imgElement) {
              try {
                await fetch(baseUrl + images.find((img: {
                  value: number;
                }) => img.value === intValue)?.imageUrl);
                imgElement.src = baseUrl + images.find((img: {
                  value: number;
                }) => img.value === intValue)?.imageUrl;
                handleImageLoad(intValue);
              } catch (error) {
                // Обработка ошибки
              }
            }
          }
        }),
      );
    };

    loadImages();
  }, [dispatch, loadingAttempts, baseUrl, images, loadedImages]);

  return (
    <div className={cl.ArtSection}>
      {images.map((imag) => (
        <div className={cl.ImgBoxed} key={imag.value}>
          <img
            src={baseUrl + imag.imageUrl}
            alt={imag.name}
            onLoad={() => handleImageLoad(imag.value)}
            onError={() => handleImageError(imag.value)}
            data-value={imag.value}
          />
          {loadedImages.includes(imag.value) ? (
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
          ) : (
            <div className={cl.loadingBar} />
          )}

        </div>
      ))}
    </div>
  );
}

export default ImgBox;
