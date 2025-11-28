"use client";
import React, { Suspense } from 'react';
import Form from './components/Form';
import Brochure from './components/Brochure';
import { useSearchParams } from 'next/navigation';

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
      {id === 'brochure' ? <Brochure /> : <Form />}
    </div>
  );
}

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RegistrationFormContent />
  </Suspense>
);

export default Page;