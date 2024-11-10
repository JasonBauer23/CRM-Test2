import React, { useState } from 'react';
import { Calendar, DollarSign, FileText, Shield, User, Clock, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Contact } from '../../types';

interface CaseFormProps {
  onCancel: () => void;
}

const CaseForm: React.FC<CaseFormProps> = ({ onCancel }) => {
  const { contacts, addCase } = useApp();
  const [dateOfLoss, setDateOfLoss] = useState('');
  const [showClientSearch, setShowClientSearch] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    caseValue: '',
    clientInsurance: '',
    defendantInsurance: '',
    assignedAttorney: ''
  });

  const calculateSOL = (date: string) => {
    if (!date) return '';
    const solDate = new Date(date);
    solDate.setFullYear(solDate.getFullYear() + 2);
    return solDate.toISOString().split('T')[0];
  };

  const filteredClients = contacts.filter(
    contact => 
      contact.type === 'client' && 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectClient = (client: Contact) => {
    setSelectedClient(client);
    setShowClientSearch(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !dateOfLoss || !formData.type || !formData.caseValue || !formData.assignedAttorney) {
      alert('Please fill in all required fields');
      return;
    }

    const newCase = {
      id: `CAS-${Date.now()}`,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      dateOfLoss,
      solDate: calculateSOL(dateOfLoss),
      caseValue: parseFloat(formData.caseValue),
      status: 'active' as const,
      type: formData.type,
      description: formData.description,
      insuranceInfo: {
        clientInsurance: formData.clientInsurance || '',
        defendantInsurance: formData.defendantInsurance || ''
      }
    };

    addCase(newCase);
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">New Case</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Client Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information <span className="text-red-500">*</span></h3>
          <div className="mb-4 relative">
            <button
              type="button"
              onClick={() => setShowClientSearch(true)}
              className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedClient ? (
                <div className="flex justify-between items-center">
                  <span>{selectedClient.name}</span>
                  <span className="text-sm text-gray-500">Change</span>
                </div>
              ) : (
                <span className="text-gray-500">Select client (required)</span>
              )}
            </button>

            {showClientSearch && (
              <div className="absolute mt-2 w-96 bg-white rounded-lg shadow-lg border p-4 z-10">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredClients.length === 0 ? (
                    <p className="text-center text-gray-500 py-2">No clients found</p>
                  ) : (
                    filteredClients.map((client) => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => selectClient(client)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Case Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Case Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Case Type <span className="text-red-500">*</span></label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Auto Accident">Auto Accident</option>
                <option value="Slip and Fall">Slip and Fall</option>
                <option value="Medical Malpractice">Medical Malpractice</option>
                <option value="Workers Compensation">Workers Compensation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Loss <span className="text-red-500">*</span></label>
              <div className="mt-1 relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={dateOfLoss}
                  onChange={(e) => setDateOfLoss(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Case Value <span className="text-red-500">*</span></label>
              <div className="mt-1 relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="caseValue"
                  value={formData.caseValue}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned Attorney <span className="text-red-500">*</span></label>
              <select
                name="assignedAttorney"
                value={formData.assignedAttorney}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Attorney</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Case Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Insurance Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Client's Insurance</label>
              <div className="mt-1 relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="clientInsurance"
                  value={formData.clientInsurance}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Defendant's Insurance</label>
              <div className="mt-1 relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="defendantInsurance"
                  value={formData.defendantInsurance}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Case
          </button>
        </div>
      </div>
    </form>
  );
};

export default CaseForm;