import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(dateString: string) {
  if (!dateString) return ""
  const inputDate = new Date(dateString);
  const relativeTime = formatDistanceToNow(inputDate, { addSuffix: true });

  // Format the date as "3rd Dec"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short'
  }).format(inputDate);

  return `${relativeTime} (${formattedDate})`;
}
