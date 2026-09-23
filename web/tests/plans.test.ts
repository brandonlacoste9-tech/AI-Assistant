import { coercePlan, getPriceId, persistablePlan, SIGNUP_PLAN } from "../src/lib/stripe/plans";
import { getPlanLimits, isUsageEnforcementEnabled } from "../src/lib/usage/plan-limits";
import { outboundWebhookAuthorized } from "../src/lib/outbound-webhook";

describe("plan taxonomy", () => {
  const env = process.env;

  afterEach(() => {
    process.env = { ...env };
  });

  it("signs up on starter", () => {
    expect(SIGNUP_PLAN).toBe("starter");
  });

  it("maps the $149 tier to the white-glove price env vars", () => {
    process.env.STRIPE_PRICE_WHITE_GLOVE_MONTHLY = "price_pro_month";
    process.env.STRIPE_PRICE_STARTER_MONTHLY = "price_starter_month";
    expect(getPriceId("pro", "month")).toBe("price_pro_month");
    expect(getPriceId("starter", "month")).toBe("price_starter_month");
    expect(coercePlan("white_glove")).toBe("pro");
    expect(coercePlan("premium")).toBe("pro");
    expect(coercePlan("nope")).toBeNull();
    expect(persistablePlan("nope")).toBe("starter");
    expect(persistablePlan("pro")).toBe("pro");
  });

  it("gives trial, starter, and pro real caps — unknown plans are not unlimited", () => {
    expect(getPlanLimits("trial").sms).toBe(80);
    expect(getPlanLimits("trial").voiceMinutes).toBe(30);
    expect(getPlanLimits("starter").sms).toBe(500);
    expect(getPlanLimits("pro").sms).toBe(5000);
    expect(getPlanLimits("pro").voiceMinutes).toBe(2500);
    expect(getPlanLimits("white_glove").sms).toBe(5000);
    expect(getPlanLimits("mystery").sms).toBe(80);
    expect(getPlanLimits(null).voiceMinutes).toBeGreaterThan(0);
  });

  it("enforces usage unless explicitly disabled", () => {
    delete process.env.USAGE_ENFORCE;
    expect(isUsageEnforcementEnabled()).toBe(true);
    process.env.USAGE_ENFORCE = "true";
    expect(isUsageEnforcementEnabled()).toBe(true);
    process.env.USAGE_ENFORCE = "false";
    expect(isUsageEnforcementEnabled()).toBe(false);
  });

  it("rejects the sales webhook when the secret is missing or wrong", () => {
    expect(outboundWebhookAuthorized("Bearer justbookme-sales-secret", "")).toBe(false);
    expect(outboundWebhookAuthorized("Bearer justbookme-sales-secret", undefined)).toBe(false);
    expect(outboundWebhookAuthorized(null, "real-secret")).toBe(false);
    expect(outboundWebhookAuthorized("Bearer wrong", "real-secret")).toBe(false);
    expect(outboundWebhookAuthorized("Bearer real-secret", "real-secret")).toBe(true);
  });
});
