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
  // Map onboarding_status to TrainerStatus ('active', 'pending', 'suspended')
  let status: TrainerStatus = 'Pending';
  if (backendTrainer.onboarding_status?.toLowerCase() === 'active')
    status = 'Active';
  else if (backendTrainer.onboarding_status?.toLowerCase() === 'suspended')
    status = 'Suspended';

  // Format date
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

export async function GET(request: Request) {
  const cookieStore = await cookies();
  let sessionToken = cookieStore.get('session_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  // Helper function to fetch data from backend
  const fetchFromBackend = async (token: string) => {
    return fetch(`${baseURL}/api/v1/trainers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  try {
    let backendRes;
    
    // If we have a session token, try it first
    if (sessionToken) {
      backendRes = await fetchFromBackend(sessionToken);
    }

    // If session token is missing or backend returned 401, attempt to refresh
    if (!sessionToken || backendRes?.status === 401) {
      if (!refreshToken) {
        return NextResponse.json(
          { error: 'Unauthorized: No valid session or refresh token' },
          { status: 401 }
        );
      }

      // Hit the refresh endpoint
      const refreshRes = await fetch(`${baseURL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!refreshRes.ok) {
        // Refresh token is invalid/expired
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

      // Retry the original request with the new session token
      backendRes = await fetchFromBackend(sessionToken!);
    }

    if (!backendRes || backendRes.status === 401) {
      return NextResponse.json(
        { error: 'Unauthorized: Backend session expired' },
        { status: 401 }
      );
    }

    if (!backendRes.ok) {
      throw new Error(`Backend returned ${backendRes.status}`);
    }

    const { data } = await backendRes.json();

    // Map the raw backend data to the frontend Trainer interface
    const mappedTrainers: Trainer[] = data.map((item: BackendTrainerResponse) =>
      mapBackendToFrontend(item)
    );

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    let filteredData = mappedTrainers;
    if (status !== 'all') {
      filteredData = mappedTrainers.filter(
        (trainer) => trainer.status.toLowerCase() === status.toLowerCase()
      );
    }
    const counts = {
      all: mappedTrainers.length,
      active: mappedTrainers.filter(
        (trainer) => trainer.status.toLowerCase() === 'active'
      ).length,
      pending: mappedTrainers.filter(
        (trainer) => trainer.status.toLowerCase() === 'pending'
      ).length,
      suspended: mappedTrainers.filter(
        (trainer) => trainer.status.toLowerCase() === 'suspended'
      ).length,
    };

    return NextResponse.json({
      data: filteredData,
      counts,
      pagination: {
        totalItems: mappedTrainers.length,
      },
    });
  } catch (error) {
    console.error('Failed to fetch trainers from backend:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
