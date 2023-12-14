import axios from 'axios';
import React, { SetStateAction } from 'react';

type AuthorsListType = { id: number; name: string }[];
type LocationsListType = { id: number; location: string }[];
type PaintingsType = {
  id: number;
  locationId: number;
  authorId: number;
  created: string;
  imageUrl: string;
  name: string;
}[];

export default class ArtFetch {
  static async getAll(
    setAuthorsList: React.Dispatch<SetStateAction<AuthorsListType>>,
    relocationList: React.Dispatch<SetStateAction<LocationsListType>>,
    setPaintings: React.Dispatch<SetStateAction<PaintingsType>>,
    options: {
      limit: number;
      page: number;
      searchQuery?: string;
      selectedAuthorId?: number | null;
      selectedLocationId?: number | null;
      createdFrom?: string;
      createdBefore?: string;
    },
  ): Promise<string> {
    const [authorsResponse, locationsResponse, paintingsResponse] = await Promise.all([
      axios.get('https://test-front.framework.team/authors'),
      axios.get('https://test-front.framework.team/locations'),
      axios.get('https://test-front.framework.team/paintings', {
        params: {
          _limit: options.limit,
          _page: options.page,
          name_like: options.searchQuery,
          authorId: options.selectedAuthorId,
          locationId: options.selectedLocationId,
          created_from: options.createdFrom,
          created_before: options.createdBefore,
        },
      }),
    ]);

    setAuthorsList(authorsResponse.data);
    relocationList(locationsResponse.data);
    setPaintings(paintingsResponse.data);
    return paintingsResponse.headers['x-total-count'];
  }
}
