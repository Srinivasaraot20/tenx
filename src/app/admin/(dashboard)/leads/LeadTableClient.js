"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, ChevronRight, X, Trash2, Eye, Mail, MessageCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LeadTableClient({ initialLeads }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads || []);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openDrawer = (lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeadIds(leads.map(lead => lead.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter(leadId => leadId !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Qualified':
      case 'Proposal Sent': return 'bg-purple-100 text-purple-800';
      case 'Won': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleDelete = async (ids) => {
    const isBulk = Array.isArray(ids) && ids.length > 1;
    const confirmMessage = isBulk 
      ? `Delete ${ids.length} selected consultation leads?\n\nThis action cannot be undone.`
      : `Delete this consultation lead?\n\nThis action cannot be undone.`;

    if (!window.confirm(confirmMessage)) return;

    const idsToDelete = Array.isArray(ids) ? ids : [ids];
    setIsDeleting(true);

    // Optimistic UI update
    const previousLeads = [...leads];
    setLeads(leads.filter(lead => !idsToDelete.includes(lead.id)));
    if (isDrawerOpen) closeDrawer();
    setSelectedLeadIds([]);

    try {
      const response = await fetch('/api/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadIds: idsToDelete })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showNotification(isBulk ? `Successfully deleted ${idsToDelete.length} leads.` : 'Consultation lead deleted successfully.');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to delete leads');
      }
    } catch (error) {
      console.error(error);
      // Revert optimistic update
      setLeads(previousLeads);
      showNotification(error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async (leadId, newStatus) => {
    setIsUpdatingStatus(true);
    const previousLeads = [...leads];
    
    // Optimistic UI update
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }

    try {
      const response = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showNotification(data.message || 'Lead status updated successfully.');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error(error);
      // Revert optimistic update
      setLeads(previousLeads);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(previousLeads.find(l => l.id === leadId));
      }
      showNotification(error.message, 'error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-lg shadow-lg font-medium text-white transition-all transform duration-300 translate-y-0 ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col relative">
        
        {/* Loading Overlay */}
        {isDeleting && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3 w-full max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, or company..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {selectedLeadIds.length > 0 && (
              <button 
                onClick={() => handleDelete(selectedLeadIds)}
                className="flex items-center px-3 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors shadow-sm mr-2"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected ({selectedLeadIds.length})
              </button>
            )}
            <button className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    checked={leads.length > 0 && selectedLeadIds.length === leads.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Type / Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer group ${selectedLeadIds.includes(lead.id) ? 'bg-primary/5' : ''}`}
                    onClick={() => openDrawer(lead)}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                        checked={selectedLeadIds.includes(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{lead.fullName}</div>
                      {lead.company && <div className="text-xs text-slate-500 mt-1">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">{lead.email}</div>
                      <div className="text-xs text-slate-500 mt-1">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">{lead.leadType}</div>
                      <div className="text-xs text-slate-500 mt-1 max-w-[150px] truncate">{lead.service || '-'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="text-slate-400 hover:text-primary p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                          title="View Consultation"
                          onClick={(e) => { e.stopPropagation(); openDrawer(lead); }}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Consultation"
                          onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <div>Showing 1 to {leads.length} of {leads.length} results</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />
          
          <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">
                {selectedLead?.leadType === 'Consultation' ? 'Consultation Request' : 'Lead Details'}
              </h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleDelete(selectedLead?.id)}
                  title="Delete Lead"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={closeDrawer}
                  title="Close"
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Drawer Body */}
            {selectedLead && (
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 bg-white">
                
                {/* Header Block */}
                <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{selectedLead.fullName}</h3>
                    <p className="text-slate-500 font-medium mt-1 flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mr-2 ${selectedLead.leadType === 'Consultation' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                        {selectedLead.leadType}
                      </span>
                      {selectedLead.company || 'Individual / No Company'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <select 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 ring-1 ring-inset ${
                        selectedLead.status === 'New' ? 'bg-blue-50 text-blue-800 ring-blue-200' : 
                        selectedLead.status === 'Contacted' ? 'bg-yellow-50 text-yellow-800 ring-yellow-200' :
                        selectedLead.status === 'Qualified' || selectedLead.status === 'Proposal Sent' ? 'bg-purple-50 text-purple-800 ring-purple-200' :
                        selectedLead.status === 'Won' || selectedLead.status === 'Closed' ? 'bg-green-50 text-green-800 ring-green-200' :
                        selectedLead.status === 'Lost' ? 'bg-red-50 text-red-800 ring-red-200' :
                        'bg-slate-50 text-slate-800 ring-slate-200'
                      } focus:ring-2 focus:ring-primary outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      value={selectedLead.status}
                      onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                      disabled={isUpdatingStatus}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-sm text-slate-800 font-medium">{selectedLead.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                    <p className="text-sm text-slate-800 font-medium">{selectedLead.phone}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">WhatsApp Number</p>
                    <p className="text-sm text-slate-800">{selectedLead.whatsapp || '-'}</p>
                  </div>
                </div>

                {/* Business Information */}
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Business Information
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="col-span-2">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Website URL</p>
                    {selectedLead.website ? (
                      <a href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline font-medium">
                        {selectedLead.website}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-500">-</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Business Location</p>
                    <p className="text-sm text-slate-800">{selectedLead.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Business Type</p>
                    <p className="text-sm text-slate-800">{selectedLead.business || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Industry</p>
                    <p className="text-sm text-slate-800">{selectedLead.country || '-'}</p> 
                  </div>
                  {selectedLead.leadType === 'Consultation' && (
                    <>
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Company Size</p>
                        <p className="text-sm text-slate-800">{selectedLead.companySize || '-'}</p> 
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Monthly Revenue</p>
                        <p className="text-sm text-slate-800">{selectedLead.monthlyRevenue || '-'}</p> 
                      </div>
                    </>
                  )}
                </div>

                {/* Services & Goals (Consultation Specific) */}
                {selectedLead.leadType === 'Consultation' && (
                  <>
                    <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Services & Goals
                    </h4>
                    <div className="grid grid-cols-1 gap-y-6 mb-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Services Interested</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.servicesInterested ? (
                            JSON.parse(selectedLead.servicesInterested).map(srv => (
                              <span key={srv} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700">
                                {srv}
                              </span>
                            ))
                          ) : (
                            <p className="text-sm text-slate-500">None specified</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Marketing Goals</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.marketingGoals ? (
                            JSON.parse(selectedLead.marketingGoals).map(goal => (
                              <span key={goal} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700">
                                {goal}
                              </span>
                            ))
                          ) : (
                            <p className="text-sm text-slate-500">None specified</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Project Details */}
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Project Details
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Monthly Budget</p>
                    <p className="text-sm text-slate-800 font-medium">{selectedLead.budget || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Project Start</p>
                    <p className="text-sm text-slate-800">{selectedLead.preferredTime || '-'}</p>
                  </div>
                  {selectedLead.leadType !== 'Consultation' && (
                    <>
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Preferred Method</p>
                        <p className="text-sm text-slate-800 font-medium">{selectedLead.contactMethod || '-'}</p>
                      </div>
                      <div className="col-span-1"></div>
                      <div className="col-span-2">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Services Interested In</p>
                        <p className="text-sm text-slate-800 leading-relaxed">{selectedLead.service || 'None specified'}</p>
                      </div>
                    </>
                  )}
                  <div className="col-span-2 mt-2">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Project Description</p>
                    <div className="bg-white rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap border border-slate-200">
                      {selectedLead.message || 'No description provided.'}
                    </div>
                  </div>
                </div>

                {/* Contact Preferences */}
                {selectedLead.leadType === 'Consultation' && (
                  <>
                    <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Contact Preferences
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Preferred Method</p>
                        <p className="text-sm text-slate-800 font-medium">{selectedLead.contactMethod || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Preferred Time</p>
                        <p className="text-sm text-slate-800">{selectedLead.contactTime || 'Anytime'}</p>
                      </div>
                      <div className="col-span-2 flex flex-col space-y-2 mt-2">
                        <p className="text-sm text-slate-800 flex items-center">
                          <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-[10px]">✓</span> 
                          Privacy Policy Accepted
                        </p>
                        <p className="text-sm text-slate-800 flex items-center">
                          <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-[10px]">✓</span> 
                          Marketing Consent Given
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* System Information */}
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span> System Information
                </h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-2 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  {selectedLead.consultationId && (
                    <div className="col-span-2 mb-2">
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Consultation ID</p>
                      <p className="text-xs text-slate-600 font-mono font-bold bg-white px-2 py-1 inline-block rounded border border-slate-200">{selectedLead.consultationId}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Submitted At</p>
                    <p className="text-xs text-slate-600 font-mono">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Source / Referrer</p>
                    <p className="text-xs text-slate-600 truncate" title={selectedLead.referrer || selectedLead.sourcePage}>{selectedLead.referrer || selectedLead.sourcePage || 'Direct'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">IP Address</p>
                    <p className="text-xs text-slate-600 font-mono">{selectedLead.ip || 'Unknown'}</p>
                  </div>
                  <div className="col-span-2 mt-1">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">User Agent</p>
                    <p className="text-[10px] text-slate-500 font-mono break-all leading-tight">{selectedLead.browser || 'Unknown'}</p>
                  </div>
                </div>

              </div>
            )}
            
            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-white grid grid-cols-3 gap-3">
              <a 
                href={`mailto:${selectedLead?.email}`}
                className="flex items-center justify-center px-4 py-2.5 bg-slate-100 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" /> Email
              </a>
              <a 
                href={`https://wa.me/${selectedLead?.whatsapp?.replace(/\D/g, '') || selectedLead?.phone?.replace(/\D/g, '')}`}
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center px-4 py-2.5 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 font-medium text-sm rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
              </a>
              <button 
                onClick={closeDrawer}
                className="flex items-center justify-center px-4 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
