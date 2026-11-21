import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Form from './components/Form';

const PAGE_URL = 'https://srimaniyainstitute.in/registration-form';

export const metadata: Metadata = {
  // absolute: skip the layout's "%s | Sri Maniya Institute" template (avoids the name twice)
  title: { absolute: 'Admission Registration Form | Sri Maniya Institute' },
  description:
    'Register for admission to hotel management courses at Sri Maniya Institute of Hotel Management, Kanyakumari. Fill in the online form to apply.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Admission Registration Form | Sri Maniya Institute',
    description:
      'Register for admission to hotel management courses at Sri Maniya Institute of Hotel Management, Kanyakumari.',
    url: PAGE_URL,
    type: 'website',
  },
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Form />
  </Suspense>
);

export default Page;
