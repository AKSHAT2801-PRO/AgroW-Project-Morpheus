/**
 * formatRelativeTime — converts an ISO date string to a human-readable relative time.
 * Falls back to an absolute date if the input is already plain text (legacy).
 *
 * @param {string} dateInput - ISO 8601 string (e.g. "2026-02-27T20:00:00Z") or plain text
 * @returns {{ relative: string, absolute: string }}
 *   - relative: "2 mins ago", "3 days ago", etc.
 *   - absolute: "Feb 27, 2026, 8:00 PM" — for the title tooltip
 */
export const formatRelativeTime = (dateInput) => {
    // If not a recognizable ISO date, return as-is
    const parsed = new Date(dateInput);
    if (isNaN(parsed.getTime())) {
        return { relative: dateInput, absolute: dateInput };
    }

    const now = new Date();
    const diffMs = now - parsed;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    let relative;
    if (diffSecs < 60) relative = 'just now';
    else if (diffMins < 60) relative = `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    else if (diffHours < 24) relative = `${diffHours} hr${diffHours !== 1 ? 's' : ''} ago`;
    else if (diffDays < 7) relative = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    else if (diffWeeks < 5) relative = `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    else if (diffMonths < 12) relative = `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    else relative = `${diffYears} yr${diffYears !== 1 ? 's' : ''} ago`;

    const absolute = parsed.toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    return { relative, absolute };
};
