export function formatTimestamp(milliseconds: number) {
  return new Date(milliseconds).toLocaleDateString('ru');
}
