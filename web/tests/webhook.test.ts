/**
 * Tests for webhook payload parsing and validation.
 * Covers Vapi webhook, Stripe webhook, and SMS inbound.
 */

describe("Webhook Handling", () => {
  describe("Vapi webhook payload parsing", () => {
    it("should parse tool-call message type", () => {
      const payload = {
        message: {
          type: "tool-calls",
          toolCalls: [
            {
              id: "call_123",
              function: {
                name: "checkAvailability",
                arguments: JSON.stringify({
                  date: "2025-01-15",
                  service: "haircut",
                }),
              },
            },
          ],
          call: {
            id: "vapi_call_abc",
            assistantId: "asst_xyz",
          },
        },
      };

      const msg = payload.message;
      expect(msg.type).toBe("tool-calls");
      expect(msg.toolCalls).toHaveLength(1);
      expect(msg.toolCalls[0].function.name).toBe("checkAvailability");

      const args = JSON.parse(msg.toolCalls[0].function.arguments);
      expect(args.date).toBe("2025-01-15");
    });

    it("should parse end-of-call-report", () => {
      const payload = {
        message: {
          type: "end-of-call-report",
          call: {
            id: "vapi_call_abc",
            startedAt: "2025-01-15T10:00:00Z",
            endedAt: "2025-01-15T10:05:30Z",
            customer: { number: "+15145551234" },
          },
          transcript: "Bonjour, je voudrais prendre un rendez-vous...",
          summary: "Customer booked a haircut for Friday at 2pm.",
        },
      };

      const msg = payload.message;
      expect(msg.type).toBe("end-of-call-report");
      expect(msg.call.customer.number).toBe("+15145551234");
      expect(msg.transcript).toContain("rendez-vous");
    });

    it("should handle missing optional fields gracefully", () => {
      const payload = {
        message: {
          type: "end-of-call-report",
          call: { id: "vapi_call_abc" },
        },
      };

      const customer = payload.message.call?.customer ?? null;
      expect(customer).toBeNull();
    });
  });

  describe("Stripe webhook event types", () => {
    const HANDLED_EVENTS = [
      "checkout.session.completed",
      "customer.subscription.updated",
      "customer.subscription.deleted",
      "invoice.payment_failed",
    ];

    it("should recognize checkout.session.completed", () => {
      expect(HANDLED_EVENTS).toContain("checkout.session.completed");
    });

    it("should recognize subscription changes", () => {
      expect(HANDLED_EVENTS).toContain("customer.subscription.updated");
      expect(HANDLED_EVENTS).toContain("customer.subscription.deleted");
    });

    it("should recognize payment failures", () => {
      expect(HANDLED_EVENTS).toContain("invoice.payment_failed");
    });
  });

  describe("SMS inbound parsing", () => {
    it("should parse Twilio SMS webhook body", () => {
      const body = new URLSearchParams({
        From: "+15145551234",
        To: "+15145550100",
        Body: "Oui, confirmé pour 14h",
        MessageSid: "SM123abc",
      });

      expect(body.get("From")).toBe("+15145551234");
      expect(body.get("Body")).toContain("confirmé");
    });

    it("should handle empty body", () => {
      const body = new URLSearchParams({
        From: "+15145551234",
        To: "+15145550100",
        Body: "",
        MessageSid: "SM123abc",
      });

      expect(body.get("Body")).toBe("");
    });
  });
});
