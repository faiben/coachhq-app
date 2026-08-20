const STORAGE_KEY = 'coachhq_courses';

const MOCK_COURSES = [
  {
    id: 'demo-1',
    title: 'Startup Growth Masterclass',
    titles: { ar: '', fr: 'Startup Growth Masterclass', en: '' },
    descriptions: { ar: '', fr: 'Apprenez à faire croître votre startup.', en: '' },
    category: 'business',
    status: 'published',
    students: 89,
    pricing: { basePriceMAD: 299, vat: 59.8, totalWithVat: 358.8, type: 'one-time' },
    videoUrl: null,
    privacy: 'unlisted',
    createdAt: '2024-01-15',
    videoStatus: 'available',
  },
  {
    id: 'demo-2',
    title: 'Leadership for Entrepreneurs',
    titles: { ar: '', fr: 'Leadership for Entrepreneurs', en: '' },
    descriptions: { ar: '', fr: 'Développez vos compétences en leadership.', en: '' },
    category: 'business',
    status: 'draft',
    students: 0,
    pricing: { basePriceMAD: 199, vat: 39.8, totalWithVat: 238.8, type: 'subscription', subscriptionInterval: 'monthly' },
    videoUrl: null,
    privacy: 'unlisted',
    createdAt: '2024-02-10',
    videoStatus: 'transcoding',
  },
  {
    id: 'demo-3',
    title: 'Work-Life Balance',
    titles: { ar: '', fr: 'Work-Life Balance', en: '' },
    descriptions: { ar: '', fr: 'Trouvez l\u2019équilibre entre vie pro et perso.', en: '' },
    category: 'life',
    status: 'published',
    students: 34,
    pricing: { basePriceMAD: 149, vat: 29.8, totalWithVat: 178.8, type: 'one-time' },
    videoUrl: null,
    privacy: 'unlisted',
    createdAt: '2024-03-05',
    videoStatus: 'available',
  },
];

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...MOCK_COURSES];
    const saved = JSON.parse(raw);
    const demoIds = MOCK_COURSES.map((c) => c.id);
    const userCourses = saved.filter((c) => !demoIds.includes(c.id));
    return [...MOCK_COURSES, ...userCourses];
  } catch {
    return [...MOCK_COURSES];
  }
}

function saveUserCourses(courses) {
  const demoIds = MOCK_COURSES.map((c) => c.id);
  const userOnly = courses.filter((c) => !demoIds.includes(c.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly));
}

export function getCourses() {
  return loadAll();
}

export function getCourseById(id) {
  return loadAll().find((c) => c.id === id) || null;
}

export function createCourse(data) {
  const courses = loadAll();
  const course = {
    id: `course-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: data.title || data.titleFr || data.titleEn || 'Untitled',
    titles: data.titles || { ar: '', fr: '', en: '' },
    descriptions: data.descriptions || { ar: '', fr: '', en: '' },
    category: data.category || 'business',
    status: data.status || 'published',
    students: 0,
    pricing: data.pricing || { basePriceMAD: 0, vat: 0, totalWithVat: 0, type: 'one-time' },
    videoUrl: data.videoUrl || null,
    privacy: data.privacy || 'unlisted',
    createdAt: new Date().toISOString().split('T')[0],
    videoStatus: data.videoUrl ? 'available' : 'none',
  };
  courses.push(course);
  saveUserCourses(courses);
  return course;
}

export function updateCourse(id, updates) {
  const courses = loadAll();
  const idx = courses.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...updates };
  if (updates.title) courses[idx].title = updates.title;
  if (updates.titles) courses[idx].titles = updates.titles;
  if (updates.pricing) {
    const price = Number(updates.pricing.basePriceMAD) || 0;
    const vat = Math.round(price * 0.2);
    courses[idx].pricing = {
      ...updates.pricing,
      basePriceMAD: price,
      vat,
      totalWithVat: price + vat,
    };
  }
  saveUserCourses(courses);
  return courses[idx];
}

export function deleteCourse(id) {
  const courses = loadAll();
  const filtered = courses.filter((c) => c.id !== id);
  saveUserCourses(filtered);
  return filtered;
}
