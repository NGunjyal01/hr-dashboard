"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";
import { employeeStore } from "@/store/employeeStore";
import { nanoid } from "nanoid";

const EmployeeDetails = () => {
    const params = useParams();
    const router = useRouter();
    const allEmployees = employeeStore((state) => state.allEmployees);
    const id = params?.id;
    const [newFeedback, setNewFeedback] = useState("");
    const [newRating, setNewRating] = useState(5);
    const updateEmployeeFeedback = employeeStore((state) => state.updateEmployeeFeedback);

    if (!allEmployees || allEmployees.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading employee details...</p>
            </div>
        );
    }

    const employee = allEmployees.find((emp) => String(emp.id) === String(id));
    if (!employee) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee not found</h1>
            <Button onClick={() => router.push("/")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
            </Button>
        </div>
    );
    }
    const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
        key={i}
        className={`w-4 h-4 cursor-pointer transition-colors ${
            i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600 hover:text-yellow-200"
        }`}
        onClick={interactive ? () => setNewRating(i + 1) : undefined}
        />
    ));
    };

  const handleSubmitFeedback = () => {
    if (!newFeedback.trim()) {
      toast.error("Please enter feedback before submitting", {
        description: "Feedback is required to submit.",
      });
      return;
    }

    const feedbackEntry = {
      id: nanoid(),
      author: "You",
      comment: newFeedback,
      rating: newRating,
      date: new Date().toISOString(),
    };

    updateEmployeeFeedback(employee.id, feedbackEntry);

    toast.success("Feedback submitted", {
      description: "Your feedback has been added successfully",
    });

    setNewFeedback("");
    setNewRating(5);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="cursor-pointer mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="mb-8 bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-200 dark:ring-gray-700"
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{employee.name}</h1>
                  <div className="flex items-center space-x-1">
                    {renderStars(employee.rating)}
                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {employee.rating}/5
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    {employee.email}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {employee.address?.address}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {employee.department}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview" className="cursor-pointer">
                Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="cursor-pointer">
                Projects
            </TabsTrigger>
            <TabsTrigger value="feedback" className="cursor-pointer">
                Feedback
            </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">About</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{employee.company?.title}</p>
                </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{employee.age}</div>
                    <div className="text-gray-600 dark:text-gray-400">Age</div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {(employee.projects || []).length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Active Projects</div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {(employee.feedback || []).length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Reviews</div>
                    </CardContent>
                </Card>
                </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
                {(employee.projects || []).map((project) => (
                <Card key={project.id} className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Started: {new Date(project.startDate).toLocaleDateString()}
                        {project.endDate && (
                        <span className="ml-4">
                            Completed: {new Date(project.endDate).toLocaleDateString()}
                        </span>
                        )}
                    </div>
                    </CardContent>
                </Card>
                ))}
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Add New Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                    <div className="flex items-center space-x-1">{renderStars(newRating, true)}</div>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Feedback</label>
                    <Textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        placeholder="Enter your feedback..."
                        rows={4}
                    />
                    </div>
                    <Button onClick={handleSubmitFeedback} className={'cursor-pointer'}>Submit Feedback</Button>
                </CardContent>
                </Card>

                <div className="space-y-4">
                {(employee.feedback || []).map((fb) => (
                    <Card key={fb.id} className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                        <div className="flex justify-between mb-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{fb.author}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                            {new Date(fb.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-1">{renderStars(fb.rating)}</div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{fb.comment}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </TabsContent>
        </Tabs>
      </div>
  );
};

export default EmployeeDetails;
