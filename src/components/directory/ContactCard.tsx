import React from 'react';
import { Phone, Mail, Building, MapPin, Calendar, Link } from 'lucide-react';
import type { Contact } from '../../types';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  const getTypeColor = (type: string) => {
    const colors = {
      client: 'bg-blue-100 text-blue-800',
      provider: 'bg-green-100 text-green-800',
      insurance: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
          <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(contact.type)}`}>
            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(contact)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          {contact.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          {contact.phone}
        </div>
        {contact.organization && (
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            {contact.organization}
          </div>
        )}
      </div>

      {contact.type === 'client' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Associated Cases</span>
            <Link className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;