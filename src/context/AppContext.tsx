import React, { createContext, useContext, useState } from 'react';
import type { Case, Contact } from '../types';

interface AppContextType {
  cases: Case[];
  contacts: Contact[];
  addCase: (newCase: Case) => void;
  addContact: (newContact: Contact) => void;
  updateCase: (updatedCase: Case) => void;
  updateContact: (updatedContact: Contact) => void;
  deleteCase: (id: string) => void;
  deleteContact: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addCase = (newCase: Case) => {
    setCases(prev => [...prev, newCase]);
  };

  const addContact = (newContact: Contact) => {
    setContacts(prev => [...prev, newContact]);
  };

  const updateCase = (updatedCase: Case) => {
    setCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const deleteCase = (id: string) => {
    setCases(prev => prev.filter(c => c.id !== id));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AppContext.Provider value={{
      cases,
      contacts,
      addCase,
      addContact,
      updateCase,
      updateContact,
      deleteCase,
      deleteContact
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};