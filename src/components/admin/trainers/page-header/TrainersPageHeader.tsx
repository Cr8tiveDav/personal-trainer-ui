import React from 'react';
import AddTrainerButton from './AddTrainerButton';
// import ExportButton from './ExportButton';

const TrainersPageHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-[#111827]">Trainers</h2>
        <p className="text-sm text-[#6B7280]">Onboard, manage and monitor every trainer on FitCall.</p>
      </div>
      <div className="flex items-center gap-3">
        {/* <ExportButton /> */}
        <AddTrainerButton />
      </div>
    </div>
  );
};

export default TrainersPageHeader;
