import React from 'react';
import { Search, Phone, Mail, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Contact } from '../../types';

interface ContactListProps {
  onContactSelect?: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onContactSelect }) => {
  const { contacts } = useApp();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'client':
        return 'bg-blue-100 text-blue-800';
      case 'provider':
        return 'bg-green-100 text-green-800';
      case 'insurance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <li 
              key={contact.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onContactSelect?.(contact)}
            >
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </h3>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 text-xs font-semibold ${getTypeColor(
                        contact.type
                      )}`}
                    >
                      {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {contact.organization && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="mr-1.5 h-4 w-4" />
                        {contact.organization}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="mr-1.5 h-4 w-4" />
                      {contact.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="mr-1.5 h-4 w-4" />
                      {contact.email}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;