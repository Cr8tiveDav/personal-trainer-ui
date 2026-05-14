import { notFound } from 'next/navigation';
import React from 'react';
import Login from '@/components/trainers/Login';

type Props = {
  params: Promise<{ secretPath: string }>;
};

const TrainerLoginPage = async ({ params }: Props) => {
  const { secretPath } = await params;

  const isValid = secretPath && secretPath.length >= 12;

  if (!isValid) {
    notFound();
  }

  return <Login />;
};

export default TrainerLoginPage;
