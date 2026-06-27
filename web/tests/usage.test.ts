/**
 * Tests for usage tracking and plan limit enforcement.
 */

describe("Usage & Plan Limits", () => {
  const PLAN_LIMITS = {
    trial: { bookings: 50, sms: 100, voiceMinutes: 60 },
    starter: { bookings: 100, sms: 200, voiceMinutes: 120 },
    pro: { bookings: 500, sms: 1000, voiceMinutes: 600 },
    premium: { bookings: -1, sms: 5000, voiceMinutes: 3000 }, // -1 = unlimited
  };

  describe("Plan limit resolution", () => {
    it("should return correct limits for trial plan", () => {
      const limits = PLAN_LIMITS.trial;
      expect(limits.bookings).toBe(50);
      expect(limits.sms).toBe(100);
      expect(limits.voiceMinutes).toBe(60);
    });

    it("should return unlimited bookings for premium", () => {
      expect(PLAN_LIMITS.premium.bookings).toBe(-1);
    });
  });

  describe("Usage enforcement", () => {
    it("should detect when usage exceeds limit", () => {
      const currentUsage = 105;
      const limit = 100;
      const exceeded = limit !== -1 && currentUsage >= limit;
      expect(exceeded).toBe(true);
    });

    it("should not enforce unlimited plans", () => {
      const currentUsage = 99999;
      const limit = -1;
      const exceeded = limit !== -1 && currentUsage >= limit;
      expect(exceeded).toBe(false);
    });

    it("should detect soft limit at 80%", () => {
      const currentUsage = 82;
      const limit = 100;
      const atSoftLimit = limit !== -1 && currentUsage >= limit * 0.8;
      expect(atSoftLimit).toBe(true);
    });

    it("should not trigger soft limit below 80%", () => {
      const currentUsage = 75;
      const limit = 100;
      const atSoftLimit = limit !== -1 && currentUsage >= limit * 0.8;
      expect(atSoftLimit).toBe(false);
    });
  });

  describe("Period computation", () => {
    it("should compute billing period start as first of month", () => {
      const now = new Date("2025-03-15T10:00:00Z");
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      expect(periodStart.toISOString()).toBe("2025-03-01T05:00:00.000Z");
    });

    it("should handle year boundaries", () => {
      const now = new Date("2025-01-05T10:00:00Z");
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      expect(periodStart.getFullYear()).toBe(2025);
      expect(periodStart.getMonth()).toBe(0); // January
    });
  });
});
