'use client';

import { validateEmail } from '@/lib/email-validation';
import { processFreeTrialOrPurchase } from '@/lib/revit-subscriptions';

export default function RevitPage() {
  // const handlePurchase = async () => {
  //   const isValid = await validateEmail('user@example.com', 'REVIT');
  //   if (isValid) {
  //     await processFreeTrialOrPurchase({
  //       txn_id: '12345',
  //       custom: 'custom-data',
  //       payment_status: 'Completed',
  //       item_number: 'revit-sub-1',
  //       payment_gross: 100.0,
  //       txn_type: 'subscr_payment',
  //       last_name: 'Doe',
  //       first_name: 'John',
  //       user_name: 'John Doe',
  //       buyer_adsk_account: 'user@example.com',
  //       referer_account: 'referrer@example.com',
  //     });
  //   }
  // };

  return (
    <></>
    // <button onClick={handlePurchase}>Purchase</button>

  );
}