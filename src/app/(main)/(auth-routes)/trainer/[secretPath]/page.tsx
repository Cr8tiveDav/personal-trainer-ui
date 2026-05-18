import { notFound } from 'next/navigation'
import Login from '@/components/auth/Login';

type Props = {
  params: Promise<{ secretPath: string }>;
};

const TrainerLoginPage = async ({ params }: Props) => {
  const { secretPath } = await params;

  const isValid = secretPath && secretPath.length >= 12;

  if (!isValid) {
    notFound();
  }

  return <Login type="trainer" />;
};

export default TrainerLoginPage;
