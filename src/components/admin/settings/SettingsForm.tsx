'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useAdminSettings, useUpdateAdminSettings, useCreateAdminCategory, useDeleteAdminCategory, AdminCategory } from '@/api/settings';



export function SettingsForm() {
  const [sessionDuration, setSessionDuration] = useState('60');
  const [maxTrainers, setMaxTrainers] = useState('6');
  const [requireVideo, setRequireVideo] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);
  
  const [newCategory, setNewCategory] = useState('');

  const { data: settingsData, isLoading } = useAdminSettings();
  const updateSettings = useUpdateAdminSettings();
  const createCategory = useCreateAdminCategory();
  const deleteCategory = useDeleteAdminCategory();
  
  const categories: AdminCategory[] = settingsData?.categories || [];

  useEffect(() => {
    if (settingsData) {
      if (settingsData.default_session_duration_min) setSessionDuration(String(settingsData.default_session_duration_min));
      if (settingsData.max_trainers_displayed) setMaxTrainers(String(settingsData.max_trainers_displayed));
      if (settingsData.require_video_before_listing !== undefined) setRequireVideo(settingsData.require_video_before_listing);
      if (settingsData.auto_assign_trainer !== undefined) setAutoAssign(settingsData.auto_assign_trainer);
      
    }
  }, [settingsData]);

  function handleSave() {
    updateSettings.mutate({
      default_session_duration_min: Number(sessionDuration),
      max_trainers_displayed: Number(maxTrainers),
      require_video_before_listing: requireVideo,
      auto_assign_trainer: autoAssign,
    });
  }

  function removeCategory(id: string) {
    deleteCategory.mutate(id);
  }

  function addCategory() {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
      const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      createCategory.mutate({ name: trimmed, slug }, {
        onSuccess: () => setNewCategory('')
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addCategory();
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Settings</h1>
          <p className='mt-1 text-sm text-gray-500'>
            Configure how FitCall handles bookings, trainers, and content.
          </p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={updateSettings.isPending}
          className='shrink-0 rounded-[8px] bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 cursor-pointer disabled:opacity-50'
        >
          {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className='rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='text-base font-bold text-gray-900'>General</h2>
        <p className='mt-0.5 text-sm text-gray-400'>
          Defaults applied to every booking and listing.
        </p>

        <div className='mt-5 space-y-5'>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Default Session Duration
              </p>
              <p className='mt-0.5 text-xs text-gray-400'>
                Used when a client doesn&apos;t specify a length.
              </p>
            </div>
            <div className='relative'>
              <select
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className='w-44 appearance-none rounded-[8px] border border-gray-200 px-4 py-2 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20'
              >
                <option value='30'>30 minutes</option>
                <option value='45'>45 minutes</option>
                <option value='60'>60 minutes</option>
                <option value='90'>90 minutes</option>
                <option value='120'>120 minutes</option>
              </select>
              <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                ▾
              </span>
            </div>
          </div>

          <div className='border-t border-gray-100' />

          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Max Trainers Displayed
              </p>
              <p className='mt-0.5 text-xs text-gray-400'>
                Maximum trainers shown on the client discovery page.
              </p>
            </div>
            <div className='relative'>
              <select
                value={maxTrainers}
                onChange={(e) => setMaxTrainers(e.target.value)}
                className='w-44 appearance-none rounded-[8px] border border-gray-200 px-4 py-2 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20'
              >
                {['3', '4', '5', '6', '8', '10', '12'].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='text-base font-bold text-gray-900'>Trainer Rules</h2>
        <p className='mt-0.5 text-sm text-gray-400'>
          Control which trainers are eligible to be listed and assigned.
        </p>

        <div className='mt-5 space-y-5'>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Require video before listing
              </p>
              <p className='mt-0.5 text-xs text-gray-400'>
                Hide any trainer that does not have an active intro video.
              </p>
            </div>
            <button
              onClick={() => setRequireVideo((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-[9999px] border-2 border-transparent transition-colors focus:outline-none ${
                requireVideo ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-[9999px] bg-white shadow ring-0 transition-transform ${
                  requireVideo ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className='border-t border-gray-100' />

          <div className='flex items-center justify-between gap-6'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Auto-assign trainer
              </p>
              <p className='mt-0.5 text-xs text-gray-400'>
                Automatically match new requests to the best available trainer.
              </p>
            </div>
            <button
              onClick={() => setAutoAssign((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-[9999px] border-2 border-transparent transition-colors focus:outline-none ${
                autoAssign ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-[9999px] bg-white shadow ring-0 transition-transform ${
                  autoAssign ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className='rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm'>
        <h2 className='text-base font-bold text-gray-900'>Categories</h2>
        <p className='mt-0.5 text-sm text-gray-400'>
          Specialties available for trainers and client requests.
        </p>

        <div className='mt-5 flex flex-wrap gap-2'>
          {categories.map((cat) => (
            <span
              key={cat.id}
              className='flex items-center gap-1.5 rounded-[9999px] border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700'
            >
              {cat.name}
              <button
                onClick={() => removeCategory(cat.id)}
                className='text-gray-400 hover:text-gray-600'
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </span>
          ))}
        </div>

        <div className='mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
          <input
            type='text'
            placeholder='Add a category...'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1 rounded-[8px] border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20'
          />
          <button
            onClick={addCategory}
            disabled={!newCategory.trim()}
            className='flex shrink-0 items-center justify-center gap-1.5 rounded-[8px] border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40'
          >
            <Plus className='h-4 w-4' />
            Add category
          </button>
        </div>
      </div>
    </div>
  );
}
