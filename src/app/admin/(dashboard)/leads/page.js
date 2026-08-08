import { PrismaClient } from '@prisma/client';
import LeadTableClient from './LeadTableClient';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function LeadsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const type = resolvedParams?.type || 'All';
  
  let where = {};
  if (type === 'Contact' || type === 'Consultation') {
    where = {
      leadType: type,
    };
  } else if (type !== 'All') {
    // Legacy support for older services/types if they were stored in leadType or service
    where = {
      OR: [
        { leadType: type },
        { service: { contains: type } }
      ]
    };
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{type === 'All' ? 'All Leads' : `${type}s`}</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and view details for all submitted forms.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm">
            Add Lead
          </button>
        </div>
      </div>

      <LeadTableClient initialLeads={leads} />
    </div>
  );
}

