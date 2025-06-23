"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Users, Star, Award } from "lucide-react";
import { employeeStore } from "@/store/employeeStore";
import { useBookmarkStore } from "@/store/bookmarkStore";

const Analytics = () => {
  const { allEmployees } = employeeStore();
  const { bookmarks } = useBookmarkStore();

  const departments = ["HR", "Engineering", "Design", "Marketing"];

  const departmentData = useMemo(() => {
    return departments.map((dept) => {
      const deptEmployees = allEmployees.filter(
        (emp) => emp.department === dept
      );
      const avgRating =
        deptEmployees.length > 0
          ? deptEmployees.reduce((sum, emp) => sum + emp.rating, 0) /
            deptEmployees.length
          : 0;
      return {
        department: dept,
        averageRating: Number(avgRating.toFixed(1)),
        employeeCount: deptEmployees.length,
      };
    });
  }, [allEmployees]);

  const bookmarkTrends = [
    { month: "Jan", bookmarks: 4 },
    { month: "Feb", bookmarks: 5 },
    { month: "Mar", bookmarks: 6 },
    { month: "Apr", bookmarks: 8 },
    { month: "May", bookmarks: 10 },
    { month: "Jun", bookmarks: bookmarks.length },
  ];

  const totalEmployees = allEmployees.length;
  const averageRating =
    totalEmployees > 0
      ? allEmployees.reduce((sum, emp) => sum + emp.rating, 0) / totalEmployees
      : 0;
  const topPerformers = allEmployees.filter((emp) => emp.rating >= 4.5).length;
  const highestRatedDept = departmentData.reduce((prev, current) =>
    prev.averageRating > current.averageRating ? prev : current
  );

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Performance insights and trends across the organization
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Employees
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totalEmployees}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Average Rating
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {averageRating.toFixed(1)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Top Performers
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {topPerformers}
                  </p>
                </div>
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Best Department
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {highestRatedDept.department}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {highestRatedDept.averageRating}/5
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="averageRating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Bookmark Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={bookmarkTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="bookmarks"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Department Details */}
        <Card className="mt-8 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Department Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Department
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Employees
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Average Rating
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departmentData.map((dept) => (
                    <tr key={dept.department} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                        {dept.department}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {dept.employeeCount}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-900 dark:text-white">
                            {dept.averageRating}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(dept.averageRating / 5) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default Analytics;
