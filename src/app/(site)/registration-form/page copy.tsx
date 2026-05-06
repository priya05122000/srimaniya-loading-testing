import React, { Suspense } from 'react';
import Form from './components/Form';
import { useSearchParams } from 'next/navigation';

function RegistrationFormContent() {
  // const id = searchParams.get('id');

  return (
    <div>
      {/* {id === 'brochure' ? <Brochure /> : <Form />} */}
      <Form />
    </div>
  );
}

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RegistrationFormContent />
  </Suspense>
);

export default Page;