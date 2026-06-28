/**
 * .ics (iCalendar) file generation for universal calendar compatibility.
 * Works with Google Calendar, Outlook, Apple Calendar, and any CalDAV client.
 */

export type IcsEventInput = {
  uid: string; // Unique ID (use appointment ID)
  summary: string; // Event title
  description?: string;
  location?: string;
  startsAt: Date;
  endsAt: Date;
  organizerEmail?: string;
  organizerName?: string;
  attendeeName?: string;
  attendeeEmail?: string;
  attendeePhone?: string;
  status?: "CONFIRMED" | "CANCELLED" | "TENTATIVE";
  sequence?: number; // Increment on updates
};

function formatIcsDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Generate a single .ics event string.
 */
export function generateIcsEvent(event: IcsEventInput): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JustBookMe//AI-Assistant//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${event.uid}@justbookme.ca`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(event.startsAt)}`,
    `DTEND:${formatIcsDate(event.endsAt)}`,
    `SUMMARY:${escapeIcsText(event.summary)}`,
    `STATUS:${event.status ?? "CONFIRMED"}`,
    `SEQUENCE:${event.sequence ?? 0}`,
  ];

  if (event.description) {
    lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
  }

  if (event.location) {
    lines.push(`LOCATION:${escapeIcsText(event.location)}`);
  }

  if (event.organizerEmail) {
    const cn = event.organizerName
      ? `;CN=${escapeIcsText(event.organizerName)}`
      : "";
    lines.push(`ORGANIZER${cn}:mailto:${event.organizerEmail}`);
  }

  if (event.attendeeEmail) {
    const cn = event.attendeeName
      ? `;CN=${escapeIcsText(event.attendeeName)}`
      : "";
    lines.push(
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED${cn}:mailto:${event.attendeeEmail}`
    );
  }

  // Add alarm (reminder 30 minutes before)
  lines.push(
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Appointment reminder",
    "END:VALARM"
  );

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join("\r\n") + "\r\n";
}

/**
 * Generate a cancellation .ics event.
 */
export function generateIcsCancellation(event: IcsEventInput): string {
  return generateIcsEvent({
    ...event,
    status: "CANCELLED",
    sequence: (event.sequence ?? 0) + 1,
  }).replace("METHOD:REQUEST", "METHOD:CANCEL");
}

/**
 * Generate a .ics feed (multiple events) for CalDAV subscription.
 */
export function generateIcsFeed(
  events: IcsEventInput[],
  calendarName: string = "JustBookMe Appointments"
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JustBookMe//AI-Assistant//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
    "METHOD:PUBLISH",
  ];

  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.uid}@justbookme.ca`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(event.startsAt)}`,
      `DTEND:${formatIcsDate(event.endsAt)}`,
      `SUMMARY:${escapeIcsText(event.summary)}`,
      `STATUS:${event.status ?? "CONFIRMED"}`
    );

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
    }
    if (event.location) {
      lines.push(`LOCATION:${escapeIcsText(event.location)}`);
    }

    lines.push(
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Appointment reminder",
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
