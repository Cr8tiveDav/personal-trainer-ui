import { SetAvailability } from "@/components/trainer/dashboard/SetAvailability";

export default function TrainerAvailabilityPage() {
  return (
    <div className="px-10 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Availability</h1>
        <p className="mt-1 text-sm text-gray-500">
          Set when you&apos;re available for sessions each week.
        </p>
      </div>
      <SetAvailability showSetupForm />
    </div>
  );
}
