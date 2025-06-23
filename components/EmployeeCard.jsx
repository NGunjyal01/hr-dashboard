"use client";

import Link from "next/link";
import { BookmarkIcon, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useBookmarkStore } from "@/store/bookmarkStore";

const EmployeeCard = ({ employee }) => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = bookmarks.includes(employee.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(employee.id);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Employee bookmarked",
      description: `${employee.name} ${isBookmarked ? "removed from" : "added to"} bookmarks`,
    });
  };

  const handlePromote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Promotion initiated",
      description: `${employee.name} has been flagged for promotion review`,
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={employee.picture}
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {employee.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{employee.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`cursor-pointer ${
              isBookmarked
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Age:</span>
            <span className="text-gray-900 dark:text-white">{employee.age}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Department:</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {employee.department}
            </span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-600 dark:text-gray-400">Rating:</span>
            <div className="flex items-center space-x-1">
              {renderStars(employee.rating)}
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                {employee.rating}/5
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/employee/${employee.id}`}>
              View Details
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handlePromote}
            className="cursor-pointer text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20"
          >
            <TrendingUp className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;