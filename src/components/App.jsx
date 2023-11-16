import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './ApiService/ApiService';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { GlobalStyle } from 'GlobalStyle';
import { Layout } from './App.styled';
import { LoaderContainer } from './Loader/LoaderWrapper.styled';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = searchQuery => {
    setQuery(`${Date.now()}/${searchQuery}`);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function componentDidUpdate() {
      try {
        setIsLoading(true);
        setLoadMore(false);
        await fetchImages(query.slice(14, query.length), page).then(
          response => {
            if (response.total === 0) {
              return;
            }
            setImages(prevImages => [...prevImages, ...response.hits]);
            setLoadMore(true);
            if (page > Math.round(response.totalHits / 12)) {
              setLoadMore(false);
            }
          }
        );
      } catch (error) {
        toast.error('Sorry, no pictures were found for this request');
      } finally {
        setIsLoading(false);
      }
    }

    componentDidUpdate();
  }, [page, query]);

  const nextPage = () => setPage(prevPage => prevPage + 1);

  return (
    <Layout>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery imagesArray={images} />}
      {isLoading && (
        <LoaderContainer>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </LoaderContainer>
      )}
      {loadMore && <LoadMoreButton nextPage={nextPage} />}
      <GlobalStyle />
      <ToastContainer autoClose={3000} position="top-right" />
    </Layout>
  );
};
