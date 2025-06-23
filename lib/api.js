import { enhanceUserData } from './enhanceUserData';

export async function fetchEmployees() {
  const res = await fetch("https://dummyjson.com/users?limit=20");
  const data = await res.json();
  return enhanceUserData(data.users);
}
