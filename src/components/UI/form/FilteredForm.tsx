import React from 'react';
import Inputs from '../Inputs/Inputs';
import Selects from '../Selects/Selects';
import DropInput, { SelectsDownInput } from '../DropDownInput/DromDownInput';
import cl from './form.module.scss';

interface OnChangeProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInp: string;
  selectedAuthorId: number | null;
  handleAuthorChange: (authorId: number) => void;
  authorsList: {
    id: number;
    name: string;
  }[];
  selectedLocationId: number | null;
  handleLocationChange: (locationId: number) => void;
  locationList: {
    id: number;
    location: string;
  }[];
}
interface FilteredFormProps extends SelectsDownInput, OnChangeProps {}

function FilteredForm({
  handleFromInputChange,
  handleBeforeInputChange,
  locationList,
  handleLocationChange,
  selectedLocationId,
  authorsList,
  selectedAuthorId,
  searchInp,
  handleInputChange,
  handleAuthorChange,
}: FilteredFormProps) {
  return (
    <form className={cl.formSect}>
      <Inputs
        placeholder="Name"
        type="text"
        onChange={handleInputChange}
        value={searchInp}
      />
      <Selects
        value={selectedAuthorId ? String(selectedAuthorId) : ''}
        onChange={(value: string) => handleAuthorChange(Number(value))}
        options={authorsList.map((author) => ({
          value: author.id,
          name: author.name,
        }))}
        defaultValue="Authors"
      />
      <Selects
        value={selectedLocationId ? String(selectedLocationId) : ''}
        onChange={(value: string) => handleLocationChange(Number(value))}
        options={locationList.map((location) => ({
          value: location.id,
          name: location.location,
        }))}
        defaultValue="Locations"
      />
      <DropInput
        neededInput
        handleFromInputChange={handleFromInputChange}
        handleBeforeInputChange={handleBeforeInputChange}
      />
    </form>
  );
}

export default FilteredForm;
