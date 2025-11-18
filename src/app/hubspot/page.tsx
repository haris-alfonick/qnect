import { Suspense } from "react";
import HubspotAddPage from "components/HubspotClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HubspotAddPage />
    </Suspense>
  );
}
