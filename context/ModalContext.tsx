'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import OrganiserSeminaireModal from '../components/OrganiserSeminaireModal';
import DevenirPartenaireModal from '../components/DevenirPartenaireModal';
import RecommanderProducteurModal from '../components/RecommanderProducteurModal';

export type AppModal = 'seminaire' | 'partenaire' | 'recommander' | null;

type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openPartenaireModal: () => void;
  openRecommanderModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  openPartenaireModal: () => {},
  openRecommanderModal: () => {},
});

/**
 * Monte les modales globales (séminaire, devenir partenaire, recommander).
 * Placé dans le layout racine, accessible depuis n'importe quelle page.
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<AppModal>(null);

  const openModal = useCallback(() => setActive('seminaire'), []);
  const openPartenaireModal = useCallback(() => setActive('partenaire'), []);
  const openRecommanderModal = useCallback(() => setActive('recommander'), []);
  const closeModal = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({
      isModalOpen: active === 'seminaire',
      openModal,
      closeModal,
      openPartenaireModal,
      openRecommanderModal,
    }),
    [active, openModal, closeModal, openPartenaireModal, openRecommanderModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <OrganiserSeminaireModal isOpen={active === 'seminaire'} onClose={closeModal} />
      <DevenirPartenaireModal isOpen={active === 'partenaire'} onClose={closeModal} />
      <RecommanderProducteurModal isOpen={active === 'recommander'} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
