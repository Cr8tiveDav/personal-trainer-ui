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
    // Editable fields passed through for the edit form
    bio: backendTrainer.bio,
    years_of_experience: backendTrainer.years_of_experience,
    specializations: backendTrainer.specializations,
    training_styles: backendTrainer.training_styles,
    intro_video_url: backendTrainer.intro_video_url,
    onboarding_status: backendTrainer.onboarding_status,
  };
};

async function getAuthToken() {
  const cookieStore = await cookies();
  return {
    sessionToken: cookieStore.get('session_token')?.value,
    refreshToken: cookieStore.get('refresh_token')?.value,
    cookieStore,
  };
}

async function refreshAccessToken(refreshToken: string, baseURL: string) {
  const refreshRes = await fetch(`${baseURL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!refreshRes.ok) return null;
  const newTokens = await refreshRes.json();
  return newTokens.data?.access_token || newTokens.access_token || null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { sessionToken: rawSession, refreshToken, cookieStore } = await getAuthToken();
  let sessionToken = rawSession;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  const fetchFromBackend = async (token: string) =>
    fetch(`${baseURL}/trainers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

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

      const newToken = await refreshAccessToken(refreshToken, baseURL);
      if (!newToken) {
        return NextResponse.json(
          { error: 'Unauthorized: Session expired and refresh failed' },
          { status: 401 }
        );
      }

      sessionToken = newToken;
      cookieStore.set('session_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 600,
      });

      backendRes = await fetchFromBackend(sessionToken);
    }

    if (!backendRes || backendRes.status === 401) {
      return NextResponse.json(
        { error: 'Unauthorized: Backend session expired' },
        { status: 401 }
      );
    }

    if (!backendRes.ok) {
      if (backendRes.status === 404) {
        return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
      }
      throw new Error(`Backend returned ${backendRes.status}`);
    }

    const { data } = await backendRes.json();
    const mappedTrainer = mapBackendToFrontend(data);

    return NextResponse.json({ data: mappedTrainer });
  } catch (error) {
    console.error('Failed to fetch trainer from backend:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { sessionToken: rawSession, refreshToken, cookieStore } = await getAuthToken();
  let sessionToken = rawSession;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  const body = await request.json();

  const fetchFromBackend = async (token: string) =>
    fetch(`${baseURL}/trainers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

  try {
    let backendRes;

    if (sessionToken) {
      backendRes = await fetchFromBackend(sessionToken);
    }

    if (!sessionToken || backendRes?.status === 401) {
      if (!refreshToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const newToken = await refreshAccessToken(refreshToken, baseURL);
      if (!newToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      sessionToken = newToken;
      cookieStore.set('session_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 600,
      });

      backendRes = await fetchFromBackend(sessionToken);
    }

    if (!backendRes || backendRes.status === 401) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!backendRes.ok) {
      const errData = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData?.message || 'Failed to update trainer' },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to update trainer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
