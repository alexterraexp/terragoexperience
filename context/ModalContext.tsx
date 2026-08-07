'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import OrganiserSeminaireModal from '../components/OrganiserSeminaireModal';

type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

/**
 * Monte l'unique instance de la modale « Organiser votre séminaire ».
 * Placé dans le layout racine, il la rend accessible depuis n'importe quelle page.
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const value = useMemo(
    () => ({ isModalOpen, openModal, closeModal }),
    [isModalOpen, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <OrganiserSeminaireModal isOpen={isModalOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
