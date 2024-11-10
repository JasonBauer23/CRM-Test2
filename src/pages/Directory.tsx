import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ContactCard from '../components/directory/ContactCard';
import ContactForm from '../components/directory/ContactForm';
import { useApp } from '../context/AppContext';
import type { Contact } from '../types';

const Directory = () => {
  const { contacts, addContact, deleteContact } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleSubmit = (contactData: Partial<Contact>) => {
    const newContact: Contact = {
      id: editingContact?.id || `CONT-${Date.now()}`,
      name: `${contactData.firstName} ${contactData.lastName}`.trim(),
      type: contactData.type as Contact['type'],
      email: contactData.email || '',
      phone: contactData.phone || '',
      organization: contactData.organization,
      address: contactData.address,
      notes: contactData.notes,
      dateOfBirth: contactData.dateOfBirth,
      specialty: contactData.specialty,
      contactPerson: contactData.contactPerson,
      insuranceType: contactData.insuranceType,
    };

    addContact(newContact);
    setShowForm(false);
    setEditingContact(null);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteContact(id);
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Directory</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Contact
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            {contacts.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No contacts found. Add a new contact to get started.
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {editingContact ? 'Edit Contact' : 'New Contact'}
            </h1>
          </div>
          <ContactForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingContact(null);
            }}
            initialData={editingContact || undefined}
          />
        </>
      )}
    </div>
  );
};

export default Directory;