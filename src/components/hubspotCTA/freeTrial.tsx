"use client";

export default function HubspotCTAFreeTrial() {
  return (
    <div
      className="my-4"
      dangerouslySetInnerHTML={{
        __html: `
          <div class="hs-web-interactive-inline" data-hubspot-wrapper-cta-id="199554454163">
            <style data-hubspot-cta-style="hs-inline-web-interactive-199554454163">
              a.hs-inline-web-interactive-199554454163 {
                cursor: pointer !important;
                display: inline-block !important;
                border-radius: 6px !important;
                color: #CF5127!important;
                border: 1px solid #CF5127 !important;
                font-size: 19px !important;
                padding: 6px 18px;
                text-decoration: none;
                transition: all .4s ease;
              }
              a.hs-inline-web-interactive-199554454163:hover {
                background: #CF5127 !important;
                color: #fff !important;
              }
            </style>
            <a href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLLHST51%2FNBqO9HoqmaNtWm1PKZNNCjSAfpqs8Ep9%2FQTDjm9S%2FCDa5HBsSswqYCyTNviIBpqv87%2Fj2eu7IJMfO4eKWoZN5EvWn3hLsOSW%2BWVM6VLUu%2Fff17dysNqEnwrNB6u3XnhEh2cR5zA8RZkWuGMT015O5mxnEIBFFbIt4mF%2BLXcfgD9%2BI2baf%2FelEM3hW%2F74T7n9QSsoGWR&amp;portalId=4536105" 
               class="hs-inline-web-interactive-199554454163"
               data-hubspot-cta-id="199554454163">
              Get Free Trial
            </a>
          </div>
        `,
      }}
    />
  );
}