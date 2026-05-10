import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Billing & Refund Policy — Dhruvid",
  description: "Dhruvid billing and refund policy — payment terms, renewals, refunds, and chargebacks.",
};

export default function Refund() {
  return (
    <LegalLayout title="Billing &amp; Refund Policy" updated="May 2025">

      <h2>1. Billing Overview</h2>
      <p>
        All Services provided by Dhruvid (operated by <strong>Kutunova Labs</strong>) are billed in advance for the selected billing term. Available billing terms are displayed at the time of purchase. Prices are shown in Indian Rupees (INR) and include applicable Goods and Services Tax (GST) unless stated otherwise.
      </p>
      <p>
        By placing an order, you authorise Kutunova Labs to charge the total amount shown, including applicable taxes, to your selected payment method.
      </p>

      <h2>2. Payment Methods</h2>
      <p>
        We accept the payment methods listed in the Client Area, which may include major credit and debit cards, UPI, net banking, and other methods as made available. All payment processing is handled through secure, PCI-compliant third-party payment processors. We do not store full card details on our servers.
      </p>
      <p>
        You are responsible for ensuring that your payment method is valid and has sufficient funds. If a payment method expires or is declined, you must update it promptly to avoid service interruption.
      </p>

      <h2>3. GST and Invoicing</h2>
      <p>
        Invoices are issued by <strong>Kutunova Labs</strong> and are GST-compliant. Our GSTIN is included on all invoices. All invoices are issued under the Dhruvid brand but remain the legal billing documents of Kutunova Labs.
      </p>
      <p>
        If you require a specific GST invoice for input tax credit purposes, please ensure your GSTIN is entered in your account profile before placing your order. Retroactive invoice modifications may not always be possible.
      </p>

      <h2>4. Renewals and Auto-Billing</h2>
      <p>
        All Services renew automatically at the end of each billing term at the then-current published rate. Renewal pricing reflects our standard published prices at the time of renewal, which may differ from your initial signup price. We display the renewal rate at the time of purchase and will notify you in advance of any rate changes.
      </p>
      <p>
        We send renewal reminder notifications to the email address on your account at least 7 days before the renewal date. It is your responsibility to manage your subscription and cancel before renewal if you do not wish to continue. Failure to receive a renewal reminder due to an incorrect email address on file does not entitle you to a refund.
      </p>

      <h2>5. Failed Payments and Service Suspension</h2>
      <p>
        If a payment is declined, we will notify you and provide a grace period of up to 7 days to update your payment method and complete payment. During this grace period, your service will remain active. If payment is not received by the end of the grace period, your service will be suspended.
      </p>
      <p>
        Suspended accounts and their associated data are retained for up to 30 days after suspension. If payment is not received within this period, the account will be permanently terminated and all data may be irreversibly deleted. We are not liable for data loss resulting from account termination due to non-payment.
      </p>
      <p>
        Reactivation of a suspended account requires payment of all outstanding amounts. A reactivation fee may apply.
      </p>

      <h2>6. Plan Upgrades and Downgrades</h2>
      <p>
        <strong>Upgrades</strong> take effect immediately and are prorated for the remaining billing period. Any difference in cost is charged to your payment method at the time of upgrade.
      </p>
      <p>
        <strong>Downgrades</strong> take effect at the start of the next billing period. No credit or refund is issued for the difference in plan cost for the current period.
      </p>

      <h2>7. Cancellation</h2>
      <p>
        You may cancel any Service at any time through the Client Area. Cancellation takes effect at the end of the current billing period unless you request immediate cancellation. Upon immediate cancellation, access to the Service will cease and your data will be handled per our data retention policy.
      </p>
      <p>
        Cancellation does not entitle you to a refund for any remaining unused period of your current billing term.
      </p>

      <h2>8. Refund Policy</h2>
      <div className="legal-note">
        Dhruvid does not offer money-back guarantees on any Service. All payments are final once a Service has been provisioned.
      </div>
      <p>
        Refunds are considered <em>only</em> in the following limited circumstances:
      </p>
      <ul>
        <li>A service failure that is directly attributable to Dhruvid prevents delivery of the contracted service entirely for a continuous period, and we are unable to remedy the failure within a reasonable timeframe. In this case, a pro-rata credit or refund for the affected period may be considered at our sole discretion.</li>
        <li>A duplicate payment or billing error has occurred. Such errors will be corrected promptly.</li>
      </ul>
      <p>
        Refund requests must be submitted via a support ticket in the Client Area. We will review and respond within 5 business days. Any approved refund will be credited to the original payment method within 7–10 business days, subject to the policies of the payment processor.
      </p>
      <p>
        Dissatisfaction with a service, a change in your own circumstances, or failure to use the service are not grounds for a refund.
      </p>

      <h2>9. Non-Refundable Services</h2>
      <p>
        The following are <strong>strictly non-refundable under any circumstances</strong> once provisioned or processed:
      </p>
      <ul>
        <li>Domain name registrations.</li>
        <li>Domain name renewals.</li>
        <li>Domain name transfers (inbound or outbound).</li>
        <li>SSL/TLS certificates.</li>
        <li>Dedicated IP addresses.</li>
        <li>Setup fees or one-time activation charges.</li>
        <li>Any service where the cost has been passed through to a third-party registry, registrar, or vendor and cannot be recovered.</li>
      </ul>
      <p>
        This non-refundable policy applies regardless of whether the domain, certificate, or service has been actively used.
      </p>

      <h2>10. Chargebacks and Payment Disputes</h2>
      <p>
        If you believe a charge is incorrect, please contact us at <a href="mailto:support@dhruvid.com">support@dhruvid.com</a> before initiating a chargeback with your payment provider. We are committed to resolving billing disputes fairly and promptly.
      </p>
      <p>
        Filing a chargeback without first contacting us is a violation of these Terms and may result in the immediate suspension of your account and all associated services. We will dispute chargebacks that we determine to be invalid and may provide payment processor records and usage data in support of our position.
      </p>
      <p>
        Accounts with disputed or reversed charges are not eligible for future service until the matter is resolved and any amounts owed are paid in full.
      </p>

      <h2>11. Pricing Changes</h2>
      <p>
        We reserve the right to adjust pricing for Services at any time. Price changes will be communicated to you in advance and will apply from your next renewal date. You will have the opportunity to cancel before the new pricing takes effect.
      </p>

    </LegalLayout>
  );
}
