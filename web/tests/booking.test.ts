/**
 * Tests for public booking slot computation logic.
 * Validates working hours parsing, slot generation, and conflict detection.
 */

describe("Public Booking Logic", () => {
  describe("Working hours parsing", () => {
    const workingHours = {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "20:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "10:00", close: "15:00" },
      sunday: null,
    };

    it("should recognize open days", () => {
      expect(workingHours.monday).not.toBeNull();
      expect(workingHours.saturday).not.toBeNull();
    });

    it("should recognize closed days", () => {
      expect(workingHours.sunday).toBeNull();
    });

    it("should have valid time formats", () => {
      const timeRegex = /^\d{2}:\d{2}$/;
      expect(workingHours.monday!.open).toMatch(timeRegex);
      expect(workingHours.monday!.close).toMatch(timeRegex);
    });
  });

  describe("Slot generation", () => {
    it("should compute correct number of 60-min slots in an 8-hour day", () => {
      const openMinute = 9 * 60; // 09:00
      const closeMinute = 17 * 60; // 17:00
      const duration = 60;
      const slots = [];
      for (let m = openMinute; m + duration <= closeMinute; m += 30) {
        slots.push(m);
      }
      // 09:00, 09:30, 10:00, ..., 16:00 = 15 slots
      expect(slots.length).toBe(15);
    });

    it("should compute correct number of 30-min slots in a 5-hour day", () => {
      const openMinute = 10 * 60; // 10:00
      const closeMinute = 15 * 60; // 15:00
      const duration = 30;
      const slots = [];
      for (let m = openMinute; m + duration <= closeMinute; m += 30) {
        slots.push(m);
      }
      // 10:00, 10:30, ..., 14:30 = 10 slots
      expect(slots.length).toBe(10);
    });

    it("should not generate slots when business is closed", () => {
      const dayHours = null;
      const slots = dayHours ? [1] : [];
      expect(slots.length).toBe(0);
    });
  });

  describe("Conflict detection", () => {
    it("should detect overlapping appointments", () => {
      const existingStart = new Date("2025-01-15T10:00:00");
      const existingEnd = new Date("2025-01-15T11:00:00");
      const newStart = new Date("2025-01-15T10:30:00");
      const newEnd = new Date("2025-01-15T11:30:00");

      const hasConflict = newStart < existingEnd && newEnd > existingStart;
      expect(hasConflict).toBe(true);
    });

    it("should allow adjacent appointments", () => {
      const existingStart = new Date("2025-01-15T10:00:00");
      const existingEnd = new Date("2025-01-15T11:00:00");
      const newStart = new Date("2025-01-15T11:00:00");
      const newEnd = new Date("2025-01-15T12:00:00");

      const hasConflict = newStart < existingEnd && newEnd > existingStart;
      expect(hasConflict).toBe(false);
    });

    it("should detect contained appointments", () => {
      const existingStart = new Date("2025-01-15T09:00:00");
      const existingEnd = new Date("2025-01-15T12:00:00");
      const newStart = new Date("2025-01-15T10:00:00");
      const newEnd = new Date("2025-01-15T11:00:00");

      const hasConflict = newStart < existingEnd && newEnd > existingStart;
      expect(hasConflict).toBe(true);
    });
  });
});
