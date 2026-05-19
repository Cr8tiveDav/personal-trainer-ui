import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { mockTrainers } from '@/components/admin/trainers/trainers-list/table/mockData';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;

  // Check if token exists (User is authenticated)
  // TEMPORARILY DISABLED for mock data development
  /*
  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized: No session token found' }, { status: 401 });
  }
  */

  // Connect backend later

  // 3. Extract status filter from URL
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'all';

  // Simulating network delay and return mock data
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Filter mock data
  let filteredData = mockTrainers;
  if (status !== 'all') {
    filteredData = mockTrainers.filter(
      (trainer) => trainer.status.toLowerCase() === status.toLowerCase()
    );
  }

  // Calculate counts
  const counts = {
    all: mockTrainers.length,
    active: mockTrainers.filter(t => t.status.toLowerCase() === 'active').length,
    pending: mockTrainers.filter(t => t.status.toLowerCase() === 'pending').length,
    suspended: mockTrainers.filter(t => t.status.toLowerCase() === 'suspended').length,
  };

  return NextResponse.json({ 
    data: filteredData,
    counts,
    pagination: {
      totalItems: mockTrainers.length
    }
  });
}
