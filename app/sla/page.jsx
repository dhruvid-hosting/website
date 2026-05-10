import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Service Level Agreement — Dhruvid",
  description: "Dhruvid service level agreement — uptime commitment, maintenance, credits, and support response times.",
};

export default function SLA() {
  return (
    <LegalLayout title="Service Level Agreement" updated="May 2025">

      <h2>1. Scope and Applicability</h2>
      <p>
        This Service Level Agreement ("SLA") is entered into between you ("Client") and <strong>Kutunova Labs</strong> (operating as Dhruvid) and forms part of the overall agreement between you and us as defined in our <a href="/terms/">Terms of Service</a>. This SLA applies to all shared hosting, business hosting, and managed hosting accounts provided by Dhruvid.
      </p>
      <p>
        This SLA does not apply to domain registration services, email-only accounts, free trial accounts, or services that have been explicitly excluded in a separate service agreement. Custom or enterprise infrastructure arrangements are governed by the terms of the applicable service order.
      </p>

      <h2>2. Uptime Commitment</h2>
      <p>
        Dhruvid commits to maintaining <strong>99.9% monthly network uptime</strong> for all in-scope hosting services. This equates to a maximum of approximately 43.8 minutes of unplanned downtime in any given calendar month, measured at the network level.
      </p>
      <p>
        Uptime is measured from our infrastructure monitoring systems and calculated as:
      </p>
      <p style={{ fontStyle: "italic", paddingLeft: "1rem", borderLeft: "2px solid rgba(175,129,0,0.3)", color: "#6b6150" }}>
        Uptime % = ((Total minutes in month − Unplanned downtime minutes) ÷ Total minutes in month) × 100
      </p>

      <h2>3. Measurement and Exclusions</h2>
      <p>
        The following are explicitly <strong>excluded</strong> from uptime calculations and do not constitute downtime for the purposes of this SLA:
      </p>
      <ul>
        <li>Scheduled maintenance windows (see Section 4).</li>
        <li>Events of force majeure as defined in our Terms of Service.</li>
        <li>Downtime caused by client-side software, scripts, misconfigurations, or actions taken by the client or their end users.</li>
        <li>DDoS attacks or other malicious network attacks directed at the client's account or our infrastructure, beyond reasonable mitigation thresholds.</li>
        <li>Outages attributable to third-party services outside our control, including upstream network providers, CDN providers, DNS registries, or payment processors.</li>
        <li>Failures caused by client-installed software with known vulnerabilities that were not patched despite available updates.</li>
        <li>Suspension of service due to policy violations, non-payment, or other contractual reasons.</li>
        <li>Outages affecting only individual features or third-party integrations (e.g., a specific software extension), where the core hosting infrastructure remains operational.</li>
      </ul>

      <h2>4. Scheduled Maintenance</h2>
      <p>
        We perform routine maintenance to keep our infrastructure secure, performant, and up to date. Scheduled maintenance is typically performed during low-traffic periods (<strong>02:00–06:00 IST</strong>) and we provide at least <strong>24 hours' advance notice</strong> by email and through our Client Area for any maintenance that may cause service interruption.
      </p>
      <p>
        Emergency maintenance — required to respond to critical security threats, imminent hardware failure, or active attacks — may be performed without advance notice. We will communicate the reason and expected duration as soon as practicable.
      </p>

      <h2>5. Service Credits</h2>
      <p>
        If, in any calendar month, the actual uptime of your hosting service falls below the 99.9% commitment due to reasons that qualify as downtime under this SLA, you may be eligible for a service credit applied to your account:
      </p>
      <ul>
        <li><strong>99.0% – 99.9% uptime</strong>: Credit equivalent to 5% of the monthly hosting fee.</li>
        <li><strong>95.0% – 98.9% uptime</strong>: Credit equivalent to 15% of the monthly hosting fee.</li>
        <li><strong>Below 95.0% uptime</strong>: Credit equivalent to 30% of the monthly hosting fee.</li>
      </ul>
      <p>
        Service credits are issued as account credit only and are not redeemable for cash. Credits will be applied to your next invoice. The total credit in any month shall not exceed 30% of the monthly hosting fee for the affected service.
      </p>

      <h2>6. Credit Claim Process</h2>
      <p>
        To claim a service credit, you must submit a support ticket through the Client Area within <strong>7 calendar days</strong> following the end of the month in which the qualifying downtime occurred. Your claim must include:
      </p>
      <ul>
        <li>The date(s) and approximate time(s) of the downtime.</li>
        <li>A description of the impact experienced.</li>
        <li>The hostname or IP address of the affected service.</li>
      </ul>
      <p>
        We will verify the claim against our monitoring records. Credits are issued at our sole discretion based on verified outage data. Claims will not be accepted after the 7-day window. Credits will not be issued where the downtime resulted from an excluded event as listed in Section 3.
      </p>

      <h2>7. Infrastructure and Technology</h2>
      <p>
        Our hosting platform is built on the following technologies, which we maintain and operate to deliver the committed service levels:
      </p>
      <ul>
        <li><strong>Web server</strong>: LiteSpeed Enterprise — providing high-performance, cache-optimised request handling.</li>
        <li><strong>Storage</strong>: NVMe SSD — delivering fast disk read/write speeds compared to standard SSD or HDD storage.</li>
        <li><strong>Operating environment</strong>: CloudLinux — providing account-level resource isolation to protect performance for all clients on a shared server.</li>
        <li><strong>Security</strong>: Imunify360 — providing real-time malware scanning, intrusion detection, and a Web Application Firewall (WAF).</li>
        <li><strong>Control panel</strong>: cPanel — the industry-standard hosting control panel.</li>
      </ul>
      <p>
        We reserve the right to modify, replace, or upgrade infrastructure components as part of ongoing platform improvements. Such changes will not reduce the overall service quality committed under this SLA. We will provide reasonable notice for changes that significantly affect your workflow.
      </p>

      <h2>8. Security Commitment</h2>
      <p>
        We actively maintain security measures across our infrastructure, including but not limited to: real-time malware scanning and removal, Web Application Firewall protection, brute-force login protection, CageFS account isolation to prevent cross-account access, and automated security patching of server-level software.
      </p>
      <p>
        No security system is completely infallible. We are not liable for security incidents caused by vulnerabilities in client-installed applications, outdated CMS installations, weak passwords, or other client-side security failures. Security incidents caused by client negligence are not covered under this SLA.
      </p>

      <h2>9. Backup Policy</h2>
      <p>
        We maintain regular backups of hosting accounts as follows:
      </p>
      <ul>
        <li><strong>Shared and business hosting</strong>: Weekly full account backups, with additional automated backups where available under the plan.</li>
        <li><strong>Managed hosting</strong>: Daily backups with retention periods as specified in your managed hosting agreement.</li>
      </ul>
      <div className="legal-note">
        <strong>Important:</strong> Backups provided by Dhruvid are a convenience feature and are not guaranteed to be complete, current, or successfully restorable. Backup restoration is provided on a best-effort basis and is subject to availability of backup data. We are not liable for any data loss, and we strongly recommend that you maintain your own independent, off-platform backups of all critical data at all times.
      </div>
      <p>
        Backup restoration requests should be submitted through the Client Area. Restoration timelines are best-effort and will vary based on account size and current workload.
      </p>

      <h2>10. Support Response Times</h2>
      <p>
        We provide support via the Client Area ticket system and email. Our target response times are:
      </p>
      <ul>
        <li><strong>Standard hosting (shared, business)</strong>: Initial response within 24 hours on business days (Monday–Friday, IST business hours).</li>
        <li><strong>Managed hosting</strong>: Priority support with a target initial response within 4 business hours.</li>
        <li><strong>Critical outages (site/server down)</strong>: We aim to acknowledge all critical outage reports within 2 hours during business hours.</li>
      </ul>
      <p>
        Response times are targets, not guarantees. Complex issues may require extended investigation. Support is provided in English. We do not offer 24/7 phone support; all support is through the Client Area or email.
      </p>

      <h2>11. SLA Limitations</h2>
      <p>
        This SLA sets out our service commitments and the exclusive remedy available to you in the event of a service failure. Service credits as described herein represent the sole and exclusive remedy for any failure to meet the uptime commitment. They do not entitle you to a cash refund or constitute a waiver of our liability limitations under the Terms of Service.
      </p>
      <p>
        This SLA does not override or limit any other provision of our Terms of Service, including but not limited to our Limitation of Liability and Disclaimer of Warranties clauses.
      </p>

      <h2>12. Amendments to this SLA</h2>
      <p>
        We may revise this SLA from time to time. When material changes are made, we will notify you in advance. The version of this SLA in effect at the time a service credit claim is made will govern that claim.
      </p>
      <p>
        For questions about this SLA, contact us at <a href="mailto:support@dhruvid.com">support@dhruvid.com</a>.
      </p>

    </LegalLayout>
  );
}
