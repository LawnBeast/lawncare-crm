import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Calendar, DollarSign, TrendingUp, Leaf } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType, gradient }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${gradient}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center mt-1">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className={`text-sm font-medium ${getChangeColor()}`}>{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Clients',
      value: '247',
      icon: <Users className="w-5 h-5 text-white" />,
      change: '+12% from last month',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Active Jobs',
      value: '89',
      icon: <Briefcase className="w-5 h-5 text-white" />,
      change: '+5% from last month',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'Jobs Today',
      value: '12',
      icon: <Calendar className="w-5 h-5 text-white" />,
      change: '3 pending',
      changeType: 'neutral' as const,
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Revenue (MTD)',
      value: '$45,230',
      icon: <DollarSign className="w-5 h-5 text-white" />,
      change: '+18% from last month',
      changeType: 'positive' as const,
      gradient: 'bg-gradient-to-r from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;