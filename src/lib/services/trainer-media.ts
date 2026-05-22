// src/lib/services/trainer-media.ts
export async function uploadTrainerMedia(trainerId: string, formData: FormData, type: 'image' | 'video') {
  const res = await fetch(`/api/admin/trainers/${trainerId}/upload?type=${type}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
}