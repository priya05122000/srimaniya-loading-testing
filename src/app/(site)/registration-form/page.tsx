import React, { Suspense } from 'react';
import Form from './components/Form';

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Form />
  </Suspense>
);

export default Page;