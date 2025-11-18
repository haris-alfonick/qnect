"use client";

export default function HubspotCTAPro() {
  return (
    <div
      className="my-4"
      dangerouslySetInnerHTML={{
        __html: `
          <div class="hs-web-interactive-inline" style="" data-hubspot-wrapper-cta-id="200027781122">
            <style data-hubspot-cta-style="hs-inline-web-interactive-200027781122">
                a.hs-inline-web-interactive-200027781122 {
                    -webkit-font-smoothing: antialiased !important;cursor: pointer !important;-moz-user-select: none !important;-webkit-user-select: none !important;-o-user-select: none !important;user-select: none !important;display: inline-block !important;font-weight: normal !important;text-align: center !important;text-decoration: none !important;-moz-transition: all .4s ease !important;-webkit-transition: all .4s ease !important;-o-transition: all .4s ease !important;background: null !important;border-radius: 6px !important;color: #85C451!important;font-family: sans-serif !important;height: auto !important;transition: all .4s ease !important;padding:6px 18px;text-shadow: none !important;width: auto !important;font-size: 19px !important;line-height: 1.5em !important;border: 1px solid #85C451!important;color: #85C451;
                }
                a.hs-inline-web-interactive-200027781122:hover {
                    background: #85C451 !important;color: #fff !important;
                }
                a.hs-inline-web-interactive-200027781122:active {
                    background: null !important;color: #85C451 !important;
                }
                a.hs-inline-web-interactive-200027781122:active:hover {
                    background: null !important;color: #0600FF !important;
                }
            </style>
            <style data-hubspot-cta-style="hs-inline-web-interactive-200027781122">
                background: #85C451;
                border: 1px solid #85C451
            </style>
            <a href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLL1HduvgsBLNWyEmHu3VgTgMFExC7oPqcJURYWDAtHRsNB81DRnF62tH3lA1CLkZtClvhHXD7VeeF7rbxZ8rSl1Stt5q6f7hSq3GYOBkFKkTrvnYWXMIcD2F%2FD8D1tG%2BVkIY9guM3g1kYiQuFBvzvdMnWKcI3TqZGBORqOucKVeyYGocNmQaLofttmnqZgnL8DjoGWruA%3D%3D&amp;portalId=4536105" class="hs-inline-web-interactive-200027781122   " data-hubspot-cta-id="200027781122"> Buy Subscription </a>
        </div>
        `,
      }}
    />
  );
}