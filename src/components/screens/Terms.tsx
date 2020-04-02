import * as React from "react";

import Card from "../structure/Card";

interface ITermsProps {
	appActions: any;
	history: any;
}

interface ITermsState {
	loading: boolean;
}

export class Terms extends React.Component<ITermsProps, ITermsState> {

	constructor(props: any) {
		super(props);
		this.state = {
			loading: false
		};

	}

	public render() {
		return (
			<Card title="Terms" loading={this.state.loading} help="">
				{this.getTerms()}
			</Card>
		);
	}

	// this is helpful if another component needs just the terms, such as the signup
	public getTerms() {
		return (
			<div id="aboutPage">
				<h1>Terms of Service</h1>

				<p>These terms and conditions outline the rules and regulations for the use of the Pregxas Website and Application(s), owned and operated by
  KVSS Technologies, LLC and Treelight Software, Inc. </p>
				<span style={{ textTransform: "capitalize" }}>Pregxas </span> is located at:<br />
				<address>
					PO Box 119, <br /> North Salem, New Hampshire 03073<br /> United States<br />
				</address>
				<p>
					By accessing this website and/or application(s) we assume you accept these terms and conditions in full. Do not continue to use this website if you do not accept all of the terms and conditions stated on this page.
  </p>
				<p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all
					Agreements: "Client", “You” and “Your” refers to you, the person accessing this website and accepting the Company’s terms
					and conditions. "Website", "Application", "App", and "Apps" refers to the software created by Pregxas or KVSS Technologies, LLC.
					The Company", “Ourselves”, “We”, “Our” and "Us", refers to our Company. “Party”, “Parties”, or “Us”,
					refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance
					and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate
					manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s
					needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing
					law of United States. Any use of the above terminology or other words in the singular, plural, capitalisation and/or
    he/she or they, are taken as interchangeable and therefore as referring to same.</p>

				<h2>
					Web Site Terms and Conditions of Use
</h2>

				<h3>
					1. Terms
</h3>

				<p>
					By accessing this web site, you are agreeing to be bound by these
					web site Terms and Conditions of Use, all applicable laws and regulations,
					and agree that you are responsible for compliance with any applicable local
					laws. If you do not agree with any of these terms, you are prohibited from
					using or accessing this site. The materials contained in this web site are
					protected by applicable copyright and trade mark law.
</p>

				<h3>
					2. Use License
</h3>

				<p>You are entitled to use the Pregxas application and platform in accordance with relevant licenses as found attached to the software code and this document. Usage can be terminated at any time and at the sole discretion of the owner.</p>

				<h3>
					3. Disclaimer
</h3>

				<ol type="a">
					<li>
						The materials on KVSS Technologies, LLC's web site are provided "as is". KVSS Technologies, LLC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, KVSS Technologies, LLC does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
	</li>
					<li>
						We <strong>do not</strong> monitor user posts or contributions. As such, we are not responsible for the posts of our users. Tools are available to make reports regarding inappropriate or concerning user submissions. Likewise, we will not report post to governing agencies automatically unless notified by a user on the site.
  </li>
				</ol>

				<h3>
					4. Limitations
</h3>

				<p>
					In no event shall KVSS Technologies, LLC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on KVSS Technologies, LLC's Internet site, even if KVSS Technologies, LLC or a KVSS Technologies, LLC authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
</p>

				<h3>
					5. Revisions and Errata
</h3>

				<p>
					The materials appearing on KVSS Technologies, LLC's web site could include technical, typographical, or photographic errors. KVSS Technologies, LLC does not warrant that any of the materials on its web site are accurate, complete, or current. KVSS Technologies, LLC may make changes to the materials contained on its web site at any time without notice. KVSS Technologies, LLC does not, however, make any commitment to update the materials.
</p>

				<h3>
					6. Links
</h3>

				<p>
					KVSS Technologies, LLC has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by KVSS Technologies, LLC of the site. Use of any such linked web site is at the user's own risk.
</p>

				<h3>
					7. Site Terms of Use Modifications
</h3>

				<p>
					KVSS Technologies, LLC may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
</p>

				<h3>
					8. Governing Law
</h3>

				<p>
					Any claim relating to KVSS Technologies, LLC's web site shall be governed by the laws of the State of New Hampshire without regard to its conflict of law provisions.
</p>

				<p>
					General Terms and Conditions applicable to Use of a Web Site.
</p>

				<h3>
					9. Technology practices
</h3>
				<p>
					We strive to implement the safest and most secure technological practices. We do not store any payment information. We utilize BCrypt for our password encryption. We utilize SSL for all web traffic.
</p>
				<p>
					If you find a vulnerability or have a concern regarding our practices, please contact us at <a href="mailto:support@kvsstechnologies">support@kvsstechnologies.com</a>.
</p>

<h3>
					10. Posting and Content Alignment
</h3>
				<p>
					Pregxas remains theologically neutral. As such, we are an open platform that welcomes those from many different theological worldviews, cultural backgrounds, and lifestyles. All requests are welcome as long as the do not contain any of the following:

					<ol>
						<li>Content that is illegal in the United States of America</li>
						<li>Copyrighted content posted without permission</li>
						<li>Threatening content targeting an individual or group, including the poster</li>
						<li>Content directing or targeting for harrassment</li>
						<li>Blatantly offensive content</li>
					</ol>

					The owner, at their sole discretion, may choose to remove any post for any reason.
</p>


				<h2>
					Privacy Policy
</h2>

				<p>
					Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
</p>

				<ul>
					<li>
						Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
	</li>
					<li>
						We will collect and use of personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.
	</li>
					<li>
						We will only retain personal information as long as necessary for the fulfillment of those purposes.
	</li>
					<li>
						We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
	</li>
					<li>
						Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
	</li>
					<li>
						We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
	</li>
					<li>
						We will make readily available to customers information about our policies and practices relating to the management of personal information.
	</li>
				</ul>

				<p>
					We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
</p>

			</div>

		);
	}

}