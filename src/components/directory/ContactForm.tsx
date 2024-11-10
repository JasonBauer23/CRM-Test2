import React, { useState } from 'react';
import { User, Building, Phone, Mail, MapPin, Calendar, Stethoscope, Shield } from 'lucide-react';
import type { Contact } from '../../types';

interface ContactFormProps {
  onSubmit: (contact: Partial<Contact>) => void;
  onCancel: () => void;
  initialData?: Contact;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'client',
    firstName: initialData?.name?.split(' ')[0] || '',
    lastName: initialData?.name?.split(' ')[1] || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    organization: initialData?.organization || '',
    address: initialData?.address || '',
    notes: initialData?.notes || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    specialty: initialData?.specialty || '',
    contactPerson: initialData?.contactPerson || '',
    insuranceType: initialData?.insuranceType || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      alert('First name and last name are required');
      return;
    }

    const contact: Partial<Contact> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      type: formData.type as Contact['type'],
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization || undefined,
      address: formData.address || undefined,
      notes: formData.notes || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      specialty: formData.specialty || undefined,
      contactPerson: formData.contactPerson || undefined,
      insuranceType: formData.insuranceType || undefined
    };

    onSubmit(contact);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Contact Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Contact Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="client">Client</option>
            <option value="provider">Medical Provider</option>
            <option value="insurance">Insurance Company</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="mt-1 relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Organization</label>
          <div className="mt-1 relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <div className="mt-1 relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Type-specific fields */}
        {formData.type === 'client' && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {formData.type === 'provider' && (
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialty</label>
              <div className="mt-1 relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {formData.type === 'insurance' && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Insurance Type</label>
            <div className="mt-1 relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="auto">Auto Insurance</option>
                <option value="health">Health Insurance</option>
                <option value="liability">Liability Insurance</option>
              </select>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Form Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {initialData ? 'Update Contact' : 'Create Contact'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;