const STORAGE_KEY = "tutorial_progress";

export function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function markVisited(path) {
  const progress = getProgress();
  progress[path] = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isVisited(path) {
  return !!getProgress()[path];
}

export function getCompletedCount(paths) {
  const progress = getProgress();
  return paths.filter(p => progress[p]).length;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}