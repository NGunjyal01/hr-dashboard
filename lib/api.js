export async function fetchEmployees() {
  const res = await fetch("https://dummyjson.com/users?limit=20");
  if (!res.ok) throw new Error("Failed to fetch employees");
  const { users } = await res.json();
  return users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    department: ["HR", "Engineering", "Design", "Marketing"][Math.floor(Math.random() * 4)],
    rating: Math.floor(Math.random() * 5) + 1,
    avatar: user.image,
    ...user,
  }));
}
