import { Card } from "../../../shared/ui/card";
import { Badge } from "../../../shared/ui/badge";
import { Button } from "../../../shared/ui/button";
import { Progress } from "../../../shared/ui/progress";

import {
  Users,
  BookOpen,
  FolderOpen,
  Upload,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Eye,
  Activity,
} from "lucide-react";


export function DashboardOverview() {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      icon: Users,
      change: "+12%",
      changeType: "positive",
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Active Courses",
      value: "24",
      icon: BookOpen,
      change: "+3",
      changeType: "positive",
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "Projects",
      value: "156",
      icon: FolderOpen,
      change: "+8",
      changeType: "positive",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Pending Reviews",
      value: "43",
      icon: CheckCircle,
      change: "-5",
      changeType: "negative",
      color: "from-orange-500 to-pink-600"
    }
  ];

  const performanceMetrics = [
    {
      title: "Course Completion Rate",
      value: 87,
      description: "Students completing courses",
      color: "text-purple-600"
    },
    {
      title: "Average Grade",
      value: 92,
      description: "Overall student performance",
      color: "text-emerald-600"
    },
    {
      title: "Student Satisfaction",
      value: 95,
      description: "Based on feedback surveys",
      color: "text-cyan-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New course created",
      details: "Advanced JavaScript Programming",
      time: "2 hours ago",
      type: "course",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      id: 2,
      action: "Project submitted",
      details: "React Portfolio by Sarah Johnson",
      time: "4 hours ago",
      type: "submission",
      icon: Upload,
      color: "text-emerald-600"
    },
    {
      id: 3,
      action: "Student enrolled",
      details: "Mike Chen joined Python Basics",
      time: "6 hours ago",
      type: "enrollment",
      icon: Users,
      color: "text-indigo-600"
    },
    {
      id: 4,
      action: "Content uploaded",
      details: "HTML & CSS Tutorial Videos",
      time: "1 day ago",
      type: "content",
      icon: FolderOpen,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with
            <span className="font-semibold text-slate-800"> Smarter</span><span className="font-semibold text-yellow-500">Teens</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="colorful-button">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button variant="outline" className="colorful-button-outline">
            <Eye className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="professional-card p-6 transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mb-3">{stat.value}</p>
                  <Badge
                    variant={stat.changeType === 'positive' ? 'default' : 'secondary'}
                    className={`text-xs font-semibold ${stat.changeType === 'positive'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        : 'bg-red-100 text-red-700 border-red-200'
                      }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title} className="professional-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-800">{metric.title}</h4>
              <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-3 mb-3" />
            <p className="text-sm text-slate-600">{metric.description}</p>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="professional-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Recent Activity
            </h3>
            <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`p-2 rounded-lg bg-slate-100 ${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{activity.action}</p>
                    <p className="text-sm text-slate-600 mt-1">{activity.details}</p>
                    <p className="text-xs text-slate-500 mt-2">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="professional-card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Create New Course</p>
                  <p className="text-sm text-slate-600">Add a new course to the platform</p>
                </div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Manage Students</p>
                  <p className="text-sm text-slate-600">View and assign students</p>
                </div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Review Submissions</p>
                  <p className="text-sm text-slate-600">Grade pending assignments</p>
                </div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}