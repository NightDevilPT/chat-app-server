export function getChangedFields(
  previous: Record<string, any>,
  updated: Record<string, any>,
): { oldValue: Record<string, any>; newValue: Record<string, any> } {
  const oldValue: Record<string, any> = {};
  const newValue: Record<string, any> = {};

  for (const key of Object.keys(updated)) {
    if (previous[key] !== updated[key]) {
      oldValue[key] = previous[key];
      newValue[key] = updated[key];
    }
  }

  return { oldValue, newValue };
}
