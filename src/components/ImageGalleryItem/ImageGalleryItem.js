import { Component, useState } from 'react';
import { ImageModal } from 'components/Modal/Modal';
import { GalleryListItem, ImageListItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  data: { webformatURL, type, index, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <GalleryListItem className="gallery-item" key={index} onClick={openModal}>
        <ImageListItem src={webformatURL} alt={type} />
      </GalleryListItem>
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        largeImageURL={largeImageURL}
      />
    </div>
  );
};
