import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  Trainer,
  TrainerStatus,
  TrainerAvailability,
  BackendTrainerResponse,
} from '@/components/admin/trainers/types';

const mapBackendToFrontend = (
  backendTrainer: BackendTrainerResponse
): Trainer => {
  let status: TrainerStatus = 'Pending';
  if (backendTrainer.onboarding_status?.toLowerCase() === 'active')
    status = 'Active';
  else if (backendTrainer.onboarding_status?.toLowerCase() === 'suspended')
    status = 'Suspended';

  const date = backendTrainer.created_at
    ? new Date(backendTrainer.created_at)
    : new Date();
  const dateAdded = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return {
    id: backendTrainer.id,
    name: 'Unknown Trainer', // Placeholder until backend provides name
    email: 'N/A', // Placeholder until backend provides email
    avatarUrl:
      backendTrainer.display_picture ||
      `https://i.pravatar.cc/150?u=${backendTrainer.id}`,
    specialty: backendTrainer.specializations?.[0] || 'General',
    status,
    sessions: 0, // Placeholder
    earnings: 0, // Placeholder
    availability: 'Offline' as TrainerAvailability, // Placeholder
    dateAdded,
  };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  let sessionToken = cookieStore.get('session_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  const fetchFromBackend = async (token: string) => {
    return fetch(`${baseURL}/api/v1/trainers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  try {
    let backendRes;
    
    if (sessionToken) {
      backendRes = await fetchFromBackend(sessionToken);
    }

    if (!sessionToken || backendRes?.status === 401) {
      if (!refreshToken) {
        return NextResponse.json(
          { error: 'Unauthorized: No valid session or refresh token' },
          { status: 401 }
        );
      }

      const refreshRes = await fetch(`${baseURL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!refreshRes.ok) {
        return NextResponse.json(
          { error: 'Unauthorized: Session expired and refresh failed' },
          { status: 401 }
        );
      }

      const newTokens = await refreshRes.json();
      sessionToken = newTokens.data?.access_token || newTokens.access_token;
      
      if (sessionToken) {
        cookieStore.set('session_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: newTokens.data?.expires_in || newTokens.expires_in || 600,
        });
      }

      backendRes = await fetchFromBackend(sessionToken!);
    }

    if (!backendRes || backendRes.status === 401) {
      return NextResponse.json(
        { error: 'Unauthorized: Backend session expired' },
        { status: 401 }
      );
    }

    if (!backendRes.ok) {
      // If 404, we can handle it gracefully
      if (backendRes.status === 404) {
        return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
      }
      throw new Error(`Backend returned ${backendRes.status}`);
    }

    const { data } = await backendRes.json();
    const mappedTrainer = mapBackendToFrontend(data);

    return NextResponse.json({
      data: mappedTrainer,
    });
  } catch (error) {
    console.error('Failed to fetch trainer from backend:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
