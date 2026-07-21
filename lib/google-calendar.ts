import { google } from "googleapis";

export const hasGoogleCalendar = Boolean(
  process.env.GOOGLE_CALENDAR_CLIENT_ID &&
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN
);

const REDIRECT_URI = "/api/google-calendar/callback";

export function getOAuthClient(origin?: string) {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    origin ? `${origin}${REDIRECT_URI}` : undefined
  );
}

function getCalendarClient() {
  const auth = getOAuthClient();
  auth.setCredentials({ refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN });
  return google.calendar({ version: "v3", auth });
}

const SESSION_DURATION_MINUTES = 60;

export async function createCalendarEvent(booking: {
  name: string;
  email: string;
  service: string;
  date: Date;
  notes?: string | null;
}) {
  if (!hasGoogleCalendar) return null;

  const calendar = getCalendarClient();
  const end = new Date(booking.date.getTime() + SESSION_DURATION_MINUTES * 60 * 1000);

  const { data } = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: `${booking.service} — ${booking.name}`,
      description: booking.notes ?? undefined,
      start: { dateTime: booking.date.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: [{ email: booking.email }],
    },
  });

  return data.id ?? null;
}

export async function deleteCalendarEvent(eventId: string) {
  if (!hasGoogleCalendar) return;

  const calendar = getCalendarClient();
  await calendar.events.delete({ calendarId: "primary", eventId }).catch((error) => {
    // Event may already be gone (e.g. deleted manually in Google Calendar) — not fatal.
    console.error("Failed to delete Google Calendar event", error);
  });
}
