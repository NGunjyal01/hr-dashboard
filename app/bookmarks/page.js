"use client";
import EmployeeCard from "@/components/EmployeeCard";
import { employeeStore } from "@/store/employeeStore";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkIcon } from "lucide-react";
import { useBookmarkStore } from "@/store/bookmarkStore";

const Bookmarks = () => {
    const allEmployees = employeeStore((state) => state.allEmployees);
    const bookmarks = useBookmarkStore((state) => state.bookmarks);

    // Filter bookmarked employees from the global employee store
    const bookmarkedEmployees = allEmployees.filter((employee) =>
    bookmarks.includes(employee.id)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bookmarked Employees
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
            Your saved employees for quick access
            </p>
        </div>

        {bookmarkedEmployees.length > 0 ? (
            <>
            <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                    <BookmarkIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 fill-current" />
                    <div>
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {bookmarkedEmployees.length} Bookmarked Employee
                        {bookmarkedEmployees.length > 1 ? "s" : ""}
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300">
                        Keep track of high-performing team members
                    </p>
                    </div>
                </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </div>
            </>
        ) : (
            <div className="text-center py-16">
            <BookmarkIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookmarks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Start bookmarking employees from the dashboard to keep track of top performers and important team members.
            </p>
            </div>
        )}
        </div>
    );
};

export default Bookmarks;
