# Service enquiries and instant service assistant

The guided `/contact` form saves service requests in the private PINCODE IT
administration CRM. It collects service, project goal, timeline and contact
details with consent. Only a confirmed API receipt displays success; network
failure keeps form details available for retry. An unchanged retry uses the
same request ID. A changed request gets a new ID.

The site-wide nonmodal PINCODE AI panel sends service questions to Gemini
through the administration backend. It keeps the conversation in memory only,
discloses the provider and links visitors to the contact form for human support.
No Gemini key, CRM credential or staff session is bundled in this application.

The fixed backend origin is `https://admin.pincodeit.com`. Deploy the matching
admin change first; its `/api/public/enquiries` and `/api/public/assistant`
endpoints must allow both the www and apex public origins. Detailed backend
requirements and verification steps live in the admin repository at
`docs/PUBLIC_SERVICE_SUPPORT.md`.

An API outage shows an error and the existing business email fallback. The
assistant never marks an enquiry sent; only the separate form's saved receipt
can confirm delivery. Staff follow up from the admin **Service Enquiries** link.
