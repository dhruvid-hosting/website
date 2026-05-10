import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Domain Registration Policy — Dhruvid",
  description: "Dhruvid domain registration policy — ownership, transfers, renewals, WHOIS, and disputes.",
};

export default function DomainPolicy() {
  return (
    <LegalLayout title="Domain Registration Policy" updated="May 2025">

      <h2>1. Intermediary Role</h2>
      <p>
        Dhruvid, operated by <strong>Kutunova Labs</strong>, facilitates domain name registrations, renewals, and transfers as a reseller through accredited third-party domain registrars and registries. We are not a domain registry or an ICANN-accredited registrar. All domain registrations are processed through our registrar partners, and your registration is subject to both these policies and the applicable terms of the underlying registrar and registry.
      </p>
      <p>
        As an intermediary, our control over domain-related outcomes — including registration disputes, registry policy changes, or forced deletions — is limited to the extent that the registrar and registry policies permit. We are not liable for outcomes that fall outside our reasonable control as a reseller.
      </p>

      <h2>2. Domain Ownership</h2>
      <p>
        Domains registered through Dhruvid are registered in the name of the registrant — the individual or organisation whose details are provided during registration. <strong>Dhruvid and Kutunova Labs do not claim ownership of domains registered by clients through our platform.</strong>
      </p>
      <p>
        It is the registrant's responsibility to ensure that the registrant details are accurate and up to date. Domains registered with inaccurate or false WHOIS information may be suspended or deleted by the registry in accordance with their policies.
      </p>

      <h2>3. Domain Availability</h2>
      <p>
        Domain availability results shown on our platform are provided in good faith based on real-time registry lookups. However, we do not guarantee domain availability. A domain may become unavailable between the time of your search and the time your registration is processed. In the event a registration fails due to unavailability, any payment received for that registration will be refunded in full.
      </p>

      <h2>4. Registration Pricing</h2>
      <p>
        Domain registration prices are shown in INR and are inclusive of applicable GST. Prices include our reseller margin and applicable registry and registrar fees. Pricing is subject to change at any time without prior notice; however, price changes do not affect domains already registered. New pricing will apply to registrations, renewals, and transfers completed after the price change takes effect.
      </p>

      <h2>5. Non-Refundable Policy</h2>
      <div className="legal-note">
        Domain registrations, renewals, and transfers are strictly non-refundable once processed, regardless of whether the domain is actively used or the registration was made in error.
      </div>
      <p>
        This is because once a domain is registered or renewed, the registration fees are immediately and irrevocably passed through to the upstream registrar and registry. We have no ability to recover these costs. The only exception is a failed registration, where payment will be refunded as described in Section 3.
      </p>

      <h2>6. Renewals and Expiry</h2>
      <p>
        Domain registrations are valid for the term selected at the time of registration (typically 1–10 years). Domains must be renewed before their expiry date to remain active. We send renewal reminder notifications to the registered email address in advance of expiry; however, it remains your sole responsibility to ensure timely renewal.
      </p>
      <p>
        Upon expiry, a domain typically enters a grace period (the duration of which varies by TLD) during which renewal is possible, often at standard rates. After the grace period, the domain may enter a redemption phase during which recovery is possible but at a significantly higher cost. Domains not recovered during redemption will be released for public registration. We are not liable for the loss of a domain due to non-renewal.
      </p>

      <h2>7. Auto-Renewal</h2>
      <p>
        Auto-renewal is enabled by default for all domain registrations. When auto-renewal is active, we will automatically charge the renewal fee to your payment method on file before the domain expires. You will be notified before the charge is made.
      </p>
      <p>
        You may disable auto-renewal at any time through the Client Area. If auto-renewal is disabled, you are solely responsible for manually renewing the domain before it expires. We strongly recommend keeping auto-renewal enabled to avoid accidental expiry.
      </p>
      <p>
        If auto-renewal fails due to a payment method issue and the domain expires as a result, we are not responsible for the loss of the domain name.
      </p>

      <h2>8. Domain Transfers</h2>
      <h3>Outbound Transfers (Away from Dhruvid)</h3>
      <p>
        You may initiate an outbound transfer to another registrar at any time, provided the domain is not within 60 days of its initial registration date (as per ICANN policy), is not currently locked, and has no pending disputes.
      </p>
      <p>
        To initiate an outbound transfer, unlock the domain and request the auth/EPP code from the Client Area. Outbound transfers cancel any scheduled auto-renewal. No refund is issued for unused registration time upon a successful outbound transfer.
      </p>
      <h3>Inbound Transfers (To Dhruvid)</h3>
      <p>
        To transfer a domain to Dhruvid, initiate the transfer from the Client Area using your current auth/EPP code. Transfer fees are non-refundable. A successful inbound transfer typically extends the domain's registration by one year from the current expiry date, depending on registry rules.
      </p>

      <h2>9. WHOIS Accuracy and Privacy</h2>
      <p>
        ICANN policy and most registries require that WHOIS registration data be accurate and kept current. You are responsible for providing truthful registrant information (name, address, email, phone number) at the time of registration and for updating it if it changes. Providing false WHOIS data may result in your domain being suspended or cancelled by the registry.
      </p>
      <p>
        WHOIS privacy (proxy registration) may be available for supported TLDs. Where WHOIS privacy is enabled, your personal contact details are replaced with those of a privacy service in publicly visible WHOIS records. WHOIS privacy does not affect your legal ownership of the domain. Some TLDs or registries do not permit or offer WHOIS privacy — availability varies.
      </p>

      <h2>10. Domain Disputes</h2>
      <p>
        Domain name disputes — including trademark disputes, cybersquatting claims, or disputes regarding rights to a domain name — are governed by the ICANN Uniform Domain-Name Dispute-Resolution Policy (UDRP), applicable registry dispute policies, and any relevant national or international law.
      </p>
      <p>
        Kutunova Labs and Dhruvid are not a party to domain disputes between registrants and third-party claimants. We will comply with decisions issued by competent dispute resolution panels and relevant regulatory authorities. We are not liable for the outcome of any domain dispute, including the loss of a domain name as a result of a dispute proceeding.
      </p>

      <h2>11. Prohibited Registrations</h2>
      <p>
        You may not register domain names that:
      </p>
      <ul>
        <li>Infringe or dilute the trademarks, service marks, or trade names of third parties.</li>
        <li>Are registered for the primary purpose of selling, renting, or transferring them for profit ("cybersquatting").</li>
        <li>Are registered in bad faith as defined by the UDRP or applicable law.</li>
        <li>Are confusingly similar to government, regulatory, or emergency service domain names.</li>
        <li>Violate any applicable law, registry policy, or these Terms.</li>
      </ul>
      <p>
        We reserve the right to refuse or cancel any domain registration that we reasonably believe violates the above, without prior notice or liability.
      </p>

      <h2>12. Registry and Registrar Policies</h2>
      <p>
        All domain registrations are subject to the policies of the applicable top-level domain (TLD) registry and the underlying registrar. In cases where registry or registrar policies conflict with these Terms on domain-specific matters, the registry/registrar policies prevail. You agree to be bound by the applicable registrar's terms and conditions, which are incorporated by reference.
      </p>
      <p>
        Registry policies can and do change. Changes imposed by a registry that affect your domain registration — including price changes, eligibility requirements, or suspension/deletion policies — are outside our control and do not constitute a breach of contract by Dhruvid.
      </p>

      <h2>13. Suspension and Deletion by Registry</h2>
      <p>
        A registry or registrar may suspend or delete a domain name for reasons including: inaccurate WHOIS data, non-payment of registry fees, registry policy violations, legal or regulatory orders, or security concerns such as the domain being used for phishing or malware distribution. Such actions are outside our direct control, and we are not liable for consequential losses resulting from registry-initiated suspension or deletion of your domain.
      </p>

      <h2>14. Contact</h2>
      <p>
        For domain-related queries, please contact us at <a href="mailto:support@dhruvid.com">support@dhruvid.com</a> or through the Client Area.
      </p>

    </LegalLayout>
  );
}
