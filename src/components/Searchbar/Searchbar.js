import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HeaderSearchbar,
  Form,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuerySubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('This field must not be empty ');
      return;
    }

    onSubmit(searchQuery);
  };

  const handleSearchQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  return (
    <HeaderSearchbar>
      <Form onSubmit={handleSearchQuerySubmit}>
        <SearchFormInput
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchQueryChange}
        />

        <SearchFormButton type="submit">
          <span>
            <BiSearchAlt2 style={{ width: 25, height: 25 }} />
          </span>
        </SearchFormButton>
      </Form>
    </HeaderSearchbar>
  );
};
