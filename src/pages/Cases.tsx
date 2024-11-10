import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CaseList from '../components/cases/CaseList';
import CaseForm from '../components/cases/CaseForm';
import CaseDetails from '../components/cases/CaseDetails';

const Cases = () => {
  const [view, setView] = useState<'list' | 'new' | 'details'>('list');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleNewCase = () => {
    setView('new');
    setSelectedCaseId(null);
  };

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
    setView('details');
  };

  const handleCancel = () => {
    setView('list');
    setSelectedCaseId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cases</h1>
        {view === 'list' && (
          <button
            onClick={handleNewCase}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Case
          </button>
        )}
      </div>

      {view === 'list' && <CaseList onCaseSelect={handleCaseSelect} />}
      {view === 'new' && <CaseForm onCancel={handleCancel} />}
      {view === 'details' && selectedCaseId && (
        <CaseDetails caseId={selectedCaseId} onBack={handleCancel} />
      )}
    </div>
  );
};

export default Cases;