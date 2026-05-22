import React, { useState } from 'react';
import { cn } from '@/utils';
import { Edit2 } from 'lucide-react';

const AvailabilityTab: React.FC = () => {
  const [workingDays, setWorkingDays] = useState({
    Sun: false,
    Mon: true,
    Tue: false,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
  });

  const [isCurrentlyAvailable, setIsCurrentlyAvailable] = useState(true);

  const toggleDay = (day: keyof typeof workingDays) => {
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className='flex flex-col gap-8'>
      {/* Top Settings Section */}
      <div className='flex flex-col lg:flex-row gap-6 bg-white rounded-xl border border-gray-100 p-6'>
        <div className='flex-1 border-r border-gray-100 pr-6'>
          <h3 className='text-sm font-semibold text-gray-900 mb-1'>Working days</h3>
          <p className='text-xs text-gray-500 mb-4'>Toggle the days this trainer is open for bookings.</p>
          
          <div className='flex items-center gap-2 mb-6'>
            {(Object.keys(workingDays) as Array<keyof typeof workingDays>).map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors border',
                  workingDays[day]
                    ? 'bg-[#0b4d8d] text-white border-[#0b4d8d]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                )}
              >
                {day}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>Available from</label>
              <select className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white outline-none focus:border-[#0b4d8d]'>
                <option>8:00 AM</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
              </select>
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>Available Until</label>
              <select className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white outline-none focus:border-[#0b4d8d]'>
                <option>6:00 PM</option>
                <option>5:00 PM</option>
                <option>4:00 PM</option>
              </select>
            </div>
          </div>
          
          <button className='mt-4 px-4 py-2 bg-[#0b4d8d] text-white text-sm font-medium rounded-lg hover:bg-[#0b4d8d]/90 transition-colors'>
            Set Availability
          </button>
        </div>

        <div className='w-full lg:w-64 flex flex-col gap-6 pl-0 lg:pl-2'>
          <div>
            <div className='flex items-center justify-between mb-1'>
              <h3 className='text-sm font-semibold text-gray-900'>Currently available</h3>
              <button 
                onClick={() => setIsCurrentlyAvailable(!isCurrentlyAvailable)}
                className={cn(
                  'relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none',
                  isCurrentlyAvailable ? 'bg-[#14561C]' : 'bg-gray-200'
                )}
              >
                <span className='sr-only'>Toggle availability</span>
                <span
                  className={cn(
                    'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
                    isCurrentlyAvailable ? 'translate-x-5' : 'translate-x-1'
                  )}
                />
              </button>
            </div>
            <p className='text-xs text-gray-500'>Toggle this off to pause bookings.</p>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-1'>Time zone</h3>
            <p className='text-xs text-gray-900 font-medium mb-1'>Lagos, Nigeria WAT</p>
            <button className='text-xs text-[#0b4d8d] font-medium flex items-center hover:underline'>
              Edit <Edit2 className='w-3 h-3 ml-1' />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Schedule Section */}
      <div className='bg-white rounded-xl border border-gray-100 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-1'>Weekly availability</h3>
            <p className='text-xs text-gray-500'>Set represent the trainer&apos;s published working hours.</p>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-[#0b4d8d]' />
            <span className='text-xs text-gray-600'>Available = 24</span>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Chart area */}
          <div className='flex-1 border border-gray-100 rounded-xl p-6'>
            <div className='flex flex-col gap-4'>
              {/* Mon */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Mon</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 relative'>
                  <div className='absolute left-[10%] right-[20%] top-0 bottom-0 bg-[#0b4d8d] rounded-full flex items-center justify-center'>
                    <span className='text-[10px] text-white font-medium'>8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
              {/* Tue */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Tue</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 flex items-center justify-center'>
                  <span className='text-xs text-gray-400'>Day off</span>
                </div>
              </div>
              {/* Wed */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Wed</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 relative'>
                  <div className='absolute left-[10%] right-[20%] top-0 bottom-0 bg-[#0b4d8d] rounded-full flex items-center justify-center'>
                    <span className='text-[10px] text-white font-medium'>8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
              {/* Thu */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Thu</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 relative'>
                  <div className='absolute left-[30%] right-[40%] top-0 bottom-0 bg-[#0b4d8d] rounded-full flex items-center justify-center'>
                    <span className='text-[10px] text-white font-medium'>10:00 AM - 3:00 PM</span>
                  </div>
                </div>
              </div>
              {/* Fri */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Fri</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 relative'>
                  <div className='absolute left-[10%] right-[40%] top-0 bottom-0 bg-[#0b4d8d] rounded-full flex items-center justify-center'>
                    <span className='text-[10px] text-white font-medium'>8:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
              {/* Sat */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Sat</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 relative'>
                  <div className='absolute left-[20%] right-[50%] top-0 bottom-0 bg-[#0b4d8d] rounded-full flex items-center justify-center'>
                    <span className='text-[10px] text-white font-medium'>9:00 AM - 1:00 PM</span>
                  </div>
                </div>
              </div>
              {/* Sun */}
              <div className='flex items-center gap-4'>
                <span className='w-8 text-xs font-medium text-gray-400'>Sun</span>
                <div className='flex-1 bg-gray-50 rounded-full h-8 flex items-center justify-center'>
                  <span className='text-xs text-gray-400'>Day off</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Info area */}
          <div className='w-full lg:w-64 flex flex-col gap-4'>
            <div className='border border-gray-100 rounded-xl p-5'>
              <div className='flex items-center justify-between mb-4'>
                <h4 className='text-sm font-semibold text-gray-900'>Today</h4>
                <div className='flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#14561C]/10 border border-[#14561C]/20'>
                  <div className='w-1 h-1 rounded-full bg-[#14561C]' />
                  <span className='text-[10px] font-semibold text-[#14561C] uppercase'>Available</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Opens</p>
                  <p className='text-sm font-medium text-gray-900'>8:00 AM</p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1 text-right'>Closes</p>
                  <p className='text-sm font-medium text-gray-900 text-right'>4:00 PM</p>
                </div>
              </div>
            </div>

            <div className='border border-gray-100 rounded-xl p-5'>
              <h4 className='text-sm font-semibold text-gray-900 mb-4'>Schedule details</h4>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Time zone</span>
                  <span className='text-xs font-medium text-gray-900'>PT (UTC -8)</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Session length</span>
                  <span className='text-xs font-medium text-gray-900'>45 min</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Buffer</span>
                  <span className='text-xs font-medium text-gray-900'>15 min</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500'>Last updated</span>
                  <span className='text-xs font-medium text-gray-900'>May 20, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTab;
