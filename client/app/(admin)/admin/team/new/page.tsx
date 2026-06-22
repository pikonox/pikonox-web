export const dynamic = "force-dynamic";

import TeamMemberForm from "@/components/admin/forms/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Team Member</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TeamMemberForm />
      </div>
    </div>
  );
}
