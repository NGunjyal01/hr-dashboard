export const fetchEmployees = async () => {
  const res = await fetch("https://dummyjson.com/users?limit=20");
  const json = await res.json();
  return json.users.map((user) => ({
    ...user,
    name: `${user.firstName} ${user.lastName}`,
    department: ["HR", "Engineering", "Design", "Marketing"][
      Math.floor(Math.random() * 4)
    ],
    rating: +(Math.random() * 2 + 3).toFixed(1), // random between 3.0 - 5.0
    projects: [
      {
        id: 1,
        name: "Website Redesign",
        description: "Improve UI/UX for company site.",
        status: "active",
        startDate: "2024-10-01",
      },
      {
        id: 2,
        name: "Mobile App Launch",
        description: "Release version 2.0 on App Store.",
        status: "completed",
        startDate: "2024-01-01",
        endDate: "2024-05-01",
      },
    ],
    feedback: [
      {
        id: 1,
        author: "Manager",
        comment: "Great team player.",
        rating: 5,
        date: "2025-04-15",
      },
    ],
  }));
};
