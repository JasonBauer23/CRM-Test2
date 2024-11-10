import React from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { Briefcase, Calendar, DollarSign, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Cases',
      value: 124,
      icon: Briefcase,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'SOL Deadlines',
      value: 8,
      icon: Calendar,
      trend: { value: 2, isPositive: false },
    },
    {
      title: 'Total Clients',
      value: 312,
      icon: Users,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Case Value',
      value: '$2.4M',
      icon: DollarSign,
      trend: { value: 8, isPositive: true },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Cases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Case ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Client</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">SOL Date</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">CAS-{2024001 + index}</td>
                  <td className="px-4 py-3 text-sm">John Doe</td>
                  <td className="px-4 py-3 text-sm">Personal Injury</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">Mar 15, 2025</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;