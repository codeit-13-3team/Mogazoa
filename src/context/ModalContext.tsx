import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  openModal: (content: ReactNode, payloadData?: unknown, isSmall?: boolean) => void;
  closeModal: () => void;
  payload?: unknown;
  content: ReactNode | null;
  isOpen: boolean;
  isSmall?: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<unknown>(undefined);
  const [isSmall, setIsSmall] = useState<boolean>(false);

  const openModal = (content: ReactNode, payloadData?: unknown, isSmall?: boolean) => {
    setContent(content);
    setIsOpen(true);
    setPayload(payloadData);
    if (isSmall !== undefined) {
      setIsSmall(isSmall);
    }
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
    setPayload(undefined);
    setIsSmall(false);
  };

  return (
    <ModalContext.Provider value={{ content, isOpen, openModal, closeModal, payload, isSmall }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
