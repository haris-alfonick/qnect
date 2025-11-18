import { Suspense } from "react";
import HubspotTokenAddPage from "components/HubspotTokenClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HubspotTokenAddPage />
    </Suspense>
  );
}
