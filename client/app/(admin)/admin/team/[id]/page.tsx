export const dynamic = "force-dynamic";

import { getTeamMemberById } from "@/actions/team";
import TeamMemberForm from "@/components/admin/forms/TeamMemberForm";
import { notFound } from "next/navigation";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getTeamMemberById(id);
  if (!member) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Team Member</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TeamMemberForm item={member} />
      </div>
    </div>
  );
}