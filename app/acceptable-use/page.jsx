import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Acceptable Use Policy — Dhruvid",
  description: "Dhruvid acceptable use policy — prohibited content, activities, resource usage, and enforcement.",
};

export default function AcceptableUse() {
  return (
    <LegalLayout title="Acceptable Use Policy" updated="May 2025">

      <h2>1. Purpose and Scope</h2>
      <p>
        This Acceptable Use Policy ("AUP") defines the standards of conduct required of all users of Dhruvid's hosting, domain, and related services operated by <strong>Kutunova Labs</strong>. This AUP is incorporated into and forms part of our <a href="/terms/">Terms of Service</a>. By using our Services, you agree to comply with this AUP at all times.
      </p>
      <p>
        This policy applies to all clients, their customers, end users, and anyone accessing services hosted on our infrastructure. You are responsible for ensuring that all users of your account comply with this AUP.
      </p>

      <h2>2. Prohibited Content</h2>
      <p>The following types of content are strictly prohibited on our infrastructure:</p>
      <ul>
        <li>Child sexual abuse material (CSAM) or any content that sexualises minors.</li>
        <li>Content that promotes, facilitates, or glorifies terrorism, violent extremism, or mass violence.</li>
        <li>Defamatory content targeting identifiable individuals or organisations without factual basis.</li>
        <li>Content that infringes copyrights, trademarks, trade secrets, or other intellectual property rights.</li>
        <li>Phishing pages, fake login portals, or any content designed to deceive users into disclosing credentials or personal information.</li>
        <li>Content that constitutes fraud, misrepresentation, or deceptive trade practices.</li>
        <li>Content that promotes or facilitates illegal gambling, illegal drug supply, or other unlawful activities under Indian law or the law of the jurisdiction in which the content is accessed.</li>
        <li>Content that violates any applicable export control or sanctions laws.</li>
      </ul>

      <h2>3. Prohibited Activities</h2>
      <p>The following activities are strictly prohibited:</p>
      <ul>
        <li>Hosting, operating, or facilitating botnets, malware distribution, ransomware, spyware, or any malicious code.</li>
        <li>Conducting or facilitating distributed denial-of-service (DDoS) attacks or any other network attack against any system.</li>
        <li>Port scanning, network probing, or vulnerability scanning of systems other than those you own or have explicit written authorisation to test.</li>
        <li>Exploiting vulnerabilities in software, systems, or networks without authorisation.</li>
        <li>Cryptocurrency or blockchain mining on shared hosting infrastructure.</li>
        <li>Operating open mail relays or anonymous proxies.</li>
        <li>Running persistent IRC bots, game servers, or other resource-intensive background processes not reasonably expected for standard web hosting, without prior approval.</li>
        <li>Reselling or subletting our Services to third parties without our express written permission.</li>
        <li>Attempting to gain unauthorised access to any system, network, or account, including our own infrastructure.</li>
        <li>Impersonating Dhruvid, Kutunova Labs, or any of our staff in any communication.</li>
      </ul>

      <h2>4. Resource Usage and Fair Use</h2>
      <p>
        Shared hosting accounts operate on shared infrastructure. You must not use disproportionate server resources in a way that degrades the experience of other clients on the same server. Specifically:
      </p>
      <ul>
        <li><strong>CPU</strong> — sustained CPU usage exceeding 25% of the allocated limit for an extended period is subject to throttling or suspension.</li>
        <li><strong>Memory</strong> — processes must remain within the per-account memory allocation defined for your plan.</li>
        <li><strong>Disk I/O</strong> — disk read/write operations that degrade server performance for other accounts may be throttled.</li>
        <li><strong>Inodes</strong> — excessive file counts (inodes) may affect backup and server performance. Plan limits apply.</li>
        <li><strong>Processes</strong> — per-account process limits apply. Spawning excessive processes is prohibited.</li>
        <li><strong>Bandwidth</strong> — while many plans offer "unlimited" bandwidth, this is subject to fair use. Bandwidth used for the distribution of pirated content, streaming to mass audiences, or any prohibited activity is not permitted.</li>
      </ul>
      <p>
        We may contact you to discuss resource usage before taking action where the situation permits. However, where server stability is immediately at risk, we may throttle or suspend your account without prior notice.
      </p>

      <h2>5. Email and Anti-Spam</h2>
      <p>
        Dhruvid maintains a zero-tolerance policy for spam and unsolicited commercial email (UCE). The following are strictly prohibited:
      </p>
      <ul>
        <li>Sending unsolicited bulk email (spam) to any recipient who has not explicitly opted in to receive communications from you.</li>
        <li>Purchasing, renting, or using harvested, scraped, or otherwise obtained third-party email lists.</li>
        <li>Operating mailing lists that do not comply with applicable anti-spam laws (including CAN-SPAM, CASL, GDPR where applicable, and Indian IT regulations).</li>
        <li>Sending emails without a valid unsubscribe mechanism for commercial communications.</li>
        <li>Forging email headers, using spoofed sender addresses, or misrepresenting the source of email.</li>
        <li>Relaying email through our servers on behalf of third parties (open relay usage).</li>
        <li>Any activity that generates spam complaints to our network abuse team or to third-party spam reporting organisations.</li>
      </ul>
      <p>
        We impose email sending rate limits (typically 300 emails per hour for shared hosting accounts). Accounts found sending spam will be suspended immediately without notice. Repeat violations will result in permanent account termination without refund.
      </p>
      <p>
        To report email abuse originating from our infrastructure, please contact <a href="mailto:abuse@dhruvid.com">abuse@dhruvid.com</a> with full email headers and message content.
      </p>

      <h2>6. Security and Software Responsibilities</h2>
      <p>
        You are responsible for the security of all software, applications, scripts, and CMS installations hosted on your account. This includes:
      </p>
      <ul>
        <li>Keeping all installed software (WordPress, plugins, themes, frameworks, etc.) updated to the latest stable versions.</li>
        <li>Using strong, unique passwords for all administrative interfaces.</li>
        <li>Promptly remediating any vulnerabilities or security incidents identified in your applications.</li>
        <li>Not installing software from untrusted sources.</li>
      </ul>
      <p>
        If your account is compromised and poses a risk to our infrastructure or other clients, we may suspend your account without prior notice in order to isolate the threat. We will notify you promptly and work with you to restore service once the issue is resolved.
      </p>

      <h2>7. Copyright and DMCA-Style Infringement Reporting</h2>
      <p>
        We respect intellectual property rights and expect our clients to do the same. If you believe that content hosted on our infrastructure infringes your copyright, please send a written notice to <a href="mailto:abuse@dhruvid.com">abuse@dhruvid.com</a> containing the following:
      </p>
      <ul>
        <li>Identification of the copyrighted work you claim is being infringed.</li>
        <li>Identification of the material on our platform that you claim infringes your copyright, with sufficient detail for us to locate it (URL, IP address, etc.).</li>
        <li>Your contact information (name, address, email, phone number).</li>
        <li>A statement that you have a good-faith belief that the use is not authorised by the copyright owner, its agent, or applicable law.</li>
        <li>A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorised to act on behalf of the copyright owner.</li>
        <li>Your electronic or physical signature.</li>
      </ul>
      <p>
        We will investigate all valid notices and take appropriate action, which may include removing the infringing content and notifying the account holder. Clients who repeatedly infringe intellectual property rights will have their accounts terminated.
      </p>

      <h2>8. Reporting Violations</h2>
      <p>
        To report any AUP violation, spam, network abuse, phishing, or other misuse of our infrastructure, please contact our abuse team at <a href="mailto:abuse@dhruvid.com">abuse@dhruvid.com</a>. Include as much detail as possible, such as timestamps, URLs, IP addresses, and any supporting evidence. We investigate all reports and aim to respond within 2 business days.
      </p>

      <h2>9. Enforcement and Consequences</h2>
      <p>
        We determine whether a violation has occurred at our sole discretion, taking into account the severity and nature of the conduct. Depending on the circumstances, enforcement actions may include:
      </p>
      <ul>
        <li>A formal warning.</li>
        <li>Removal or disabling of specific content.</li>
        <li>Temporary suspension of the account.</li>
        <li>Permanent termination of the account without prior notice and without refund of any prepaid fees.</li>
        <li>Reporting to law enforcement or regulatory authorities.</li>
      </ul>
      <p>
        We reserve the right to cooperate fully with law enforcement agencies and relevant authorities in the investigation of any illegal activity facilitated through our Services.
      </p>

    </LegalLayout>
  );
}
