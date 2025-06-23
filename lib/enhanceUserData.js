const departments = ["HR", "Engineering", "Design", "Marketing"];
const bios = [
  "A highly motivated team player with a passion for innovation and quality work.",
  "Always seeking ways to improve and deliver exceptional results.",
  "Creative thinker and problem solver with strong interpersonal skills.",
  "Focused on building scalable and maintainable systems with empathy.",
  "Driven professional with strong leadership and collaboration skills.",
];

const projectNames = [
  "Apollo CRM Revamp",
  "NextGen UI Overhaul",
  "Onboarding Automation",
  "Mobile App Optimization",
  "Internal Tools Migration",
];

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMockProjects() {
  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }).map((_, i) => {
    const start = new Date(2023, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28));
    const end = new Date(start);
    end.setMonth(start.getMonth() + Math.floor(Math.random() * 4) + 1);
    return {
      id: `proj-${Date.now()}-${i}`,
      name: randomFromArray(projectNames),
      description: "Project focused on delivering key business objectives with cross-functional teams.",
      status: randomFromArray(["active", "completed", "on-hold"]),
      startDate: start.toISOString(),
      endDate: Math.random() > 0.5 ? end.toISOString() : null,
    };
  });
}

function generateMockFeedback() {
  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }).map((_, i) => ({
    id: `fb-${Date.now()}-${i}`,
    author: randomFromArray(["Manager A", "Lead B", "Director C"]),
    comment: "Consistently delivers above expectations and maintains a great attitude.",
    rating: Math.floor(Math.random() * 3) + 3, // 3 to 5
    date: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ).toISOString(),
  }));
}

export function enhanceUserData(users) {
  return users.map((user) => ({
    id: String(user.id),
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    age: user.age,
    picture: user.image,
    address: `${user.address.address}, ${user.address.city}`,
    phone: user.phone,
    department: randomFromArray(departments),
    rating: Math.floor(Math.random() * 5) + 1,
    bio: randomFromArray(bios),
    projects: generateMockProjects(),
    feedback: generateMockFeedback(),
  }));
}
