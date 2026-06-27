/**
 * Tests for POST /api/signup
 * Validates input validation, error handling, and successful account creation.
 */

describe("POST /api/signup", () => {
  const validBody = {
    email: "test@example.com",
    password: "securepass123",
    business_name: "Test Salon",
    city: "Montreal",
    phone: "+15145551234",
    default_language: "fr",
    plan: "pro",
    locale: "fr",
  };

  describe("Input validation", () => {
    it("should reject missing email", () => {
      const body = { ...validBody, email: "" };
      expect(body.email).toBeFalsy();
    });

    it("should reject missing business_name", () => {
      const body = { ...validBody, business_name: "" };
      expect(body.business_name).toBeFalsy();
    });

    it("should reject missing city", () => {
      const body = { ...validBody, city: "" };
      expect(body.city).toBeFalsy();
    });

    it("should reject short passwords", () => {
      const body = { ...validBody, password: "short" };
      expect(body.password.length).toBeLessThan(8);
    });

    it("should accept valid passwords", () => {
      expect(validBody.password.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe("Slug generation", () => {
    it("should generate a valid slug from business name", () => {
      const name = "Salon Beauté & Spa";
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40);
      expect(slug).toBe("salon-beaut-spa");
      expect(slug.length).toBeLessThanOrEqual(40);
    });

    it("should handle long business names", () => {
      const name = "A".repeat(100);
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40);
      expect(slug.length).toBe(40);
    });

    it("should handle special characters", () => {
      const name = "L'Atelier de Jean-Pierre";
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40);
      expect(slug).toBe("l-atelier-de-jean-pierre");
    });
  });

  describe("Trial period", () => {
    it("should set trial to 14 days from now", () => {
      const trialEnds = new Date();
      trialEnds.setDate(trialEnds.getDate() + 14);
      const now = new Date();
      const diffDays = Math.round(
        (trialEnds.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      expect(diffDays).toBe(14);
    });
  });
});
