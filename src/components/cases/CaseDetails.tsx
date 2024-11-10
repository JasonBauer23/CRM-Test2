import React, { useState } from 'react';
import { Calendar, DollarSign, FileText, MessageSquare, Clock, Paperclip } from 'lucide-react';

const CaseDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'communications', label: 'Communications' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'documents', label: 'Documents' },
    { id: 'medical', label: 'Medical Records' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Case Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Case #CAS-2024001</h2>
            <p className="mt-1 text-sm text-gray-500">John Smith vs. ABC Corporation</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            Active
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-5 w-5 mr-2 text-gray-400" />
            Date of Loss: Jan 15, 2024
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-5 w-5 mr-2 text-gray-400" />
            SOL Date: Jan 15, 2026
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
            Value: $75,000
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FileText className="h-5 w-5 mr-2 text-gray-400" />
            Type: Auto Accident
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Case Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Auto accident occurred at the intersection of Main St. and 5th Ave. Client was struck by defendant's vehicle while making a left turn. Sustained injuries to neck and back.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Client's Insurance</h4>
                  <p className="text-sm text-gray-600">State Farm Insurance</p>
                  <p className="text-sm text-gray-600">Policy #: SF123456789</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Defendant's Insurance</h4>
                  <p className="text-sm text-gray-600">Geico Insurance</p>
                  <p className="text-sm text-gray-600">Policy #: GC987654321</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Communications Log</h3>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                New Entry
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone Call with Client</p>
                      <p className="text-sm text-gray-500">March {10 - index}, 2024 at 2:00 PM</p>
                    </div>
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Discussed case progress and upcoming medical appointments.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Add Deadline
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Medical Records Request Due</p>
                    <p className="text-sm text-gray-500">March {15 + index}, 2024</p>
                  </div>
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Case Documents</h3>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Upload Document
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Paperclip className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Police Report.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded March {5 + index}, 2024</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Medical Records</h3>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Add Record
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">City Hospital - Initial Evaluation</p>
                      <p className="text-sm text-gray-500">Date of Visit: March {1 + index}, 2024</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Initial emergency room visit following the accident. X-rays and CT scan performed.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetails;