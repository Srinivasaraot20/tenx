"use client";

import { useState } from "react";
import { Search, Filter, Trash2, Eye, Mail, Download, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx"; // Note: Need to make sure xlsx is installed, but we can do a simple CSV export manually if it's not. 

export default function NewsletterClient({ initialSubscribers }) {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState(initialSubscribers || []);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openDrawer = (sub) => {
    setSelectedSub(sub);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubscribers.map(sub => sub.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(subId => subId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (ids) => {
    const isBulk = Array.isArray(ids) && ids.length > 1;
    const confirmMessage = isBulk 
      ? `Delete ${ids.length} selected subscribers?\n\nThis action cannot be undone.`
      : `Delete this subscriber?\n\nThis action cannot be undone.`;

    if (!window.confirm(confirmMessage)) return;

    const idsToDelete = Array.isArray(ids) ? ids : [ids];
    setIsDeleting(true);

    const previousSubs = [...subscribers];
    setSubscribers(subscribers.filter(sub => !idsToDelete.includes(sub.id)));
    if (isDrawerOpen) closeDrawer();
    setSelectedIds([]);

    try {
      const response = await fetch('/api/admin/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showNotification(isBulk ? `Successfully deleted ${idsToDelete.length} subscribers.` : 'Subscriber deleted successfully.');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to delete subscribers');
      }
    } catch (error) {
      console.error(error);
      setSubscribers(previousSubs);
      showNotification(error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin/newsletter', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (response.ok) {
        setSubscribers(subscribers.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub({ ...selectedSub, status: newStatus });
        }
        showNotification("Status updated successfully.");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleExportCSV = () => {
    if (filteredSubscribers.length === 0) return showNotification("No data to export", "error");
    
    const headers = ["Subscriber ID", "Email", "Status", "Source", "Date Subscribed", "IP Address"];
    const csvContent = [
      headers.join(","),
      ...filteredSubscribers.map(sub => [
        sub.subscriberId || '-',
        sub.email,
        sub.status,
        sub.source,
        new Date(sub.createdAt).toLocaleString(),
        sub.ipAddress || 'Unknown'
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (sub.subscriberId && sub.subscriberId.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-lg shadow-lg font-medium text-white transition-all transform duration-300 translate-y-0 ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col relative">
        
        {isDeleting && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50/50 gap-4">
          <div className="flex items-center space-x-3 w-full sm:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by email or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Subscribed">Subscribed</option>
              <option value="Unsubscribed">Unsubscribed</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedIds.length > 0 && (
              <button 
                onClick={() => handleDelete(selectedIds)}
                className="flex items-center px-3 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors shadow-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete ({selectedIds.length})
              </button>
            )}
            <button 
              onClick={handleExportCSV}
              className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download className="h-4 w-4 mr-2" /> Export CSV
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
                    checked={filteredSubscribers.length > 0 && selectedIds.length === filteredSubscribers.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">Subscriber</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr 
                    key={sub.id} 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer group ${selectedIds.includes(sub.id) ? 'bg-primary/5' : ''}`}
                    onClick={() => openDrawer(sub)}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                        checked={selectedIds.includes(sub.id)}
                        onChange={() => toggleSelect(sub.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{sub.email}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{sub.subscriberId || '-'}</div>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 ring-1 ring-inset cursor-pointer ${
                          sub.status === 'Subscribed' ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-100 text-slate-600 ring-slate-200'
                        }`}
                      >
                        <option value="Subscribed">Subscribed</option>
                        <option value="Unsubscribed">Unsubscribed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">{sub.source}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="text-slate-400 hover:text-primary p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                          title="View Subscriber"
                          onClick={(e) => { e.stopPropagation(); openDrawer(sub); }}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Subscriber"
                          onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }}
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
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <div>Showing 1 to {filteredSubscribers.length} of {subscribers.length} total subscribers</div>
        </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && selectedSub && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />
          
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Subscriber Details</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleDelete(selectedSub.id)}
                  title="Delete"
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
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-slate-800 break-all">{selectedSub.email}</h3>
                <p className="text-slate-500 font-mono text-sm mt-1">{selectedSub.subscriberId || 'No ID'}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <select 
                    value={selectedSub.status}
                    onChange={(e) => handleStatusChange(selectedSub.id, e.target.value)}
                    className={`text-sm font-medium rounded-lg px-3 py-1.5 border-0 ring-1 ring-inset cursor-pointer outline-none w-full ${
                      selectedSub.status === 'Subscribed' ? 'bg-green-50 text-green-700 ring-green-200 focus:ring-green-400' : 'bg-slate-100 text-slate-600 ring-slate-200 focus:ring-slate-400'
                    }`}
                  >
                    <option value="Subscribed">Subscribed</option>
                    <option value="Unsubscribed">Unsubscribed</option>
                  </select>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Source</p>
                  <p className="text-sm text-slate-800 font-medium">{selectedSub.source}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Date Subscribed</p>
                  <p className="text-sm text-slate-800">{new Date(selectedSub.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span> System Information
                </h4>
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">IP Address</p>
                    <p className="text-xs text-slate-600 font-mono">{selectedSub.ipAddress || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Referrer</p>
                    <p className="text-xs text-slate-600 truncate" title={selectedSub.referrer}>{selectedSub.referrer || 'Direct'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">User Agent</p>
                    <p className="text-[10px] text-slate-500 font-mono break-all leading-tight">{selectedSub.userAgent || 'Unknown'}</p>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <a 
                href={`mailto:${selectedSub.email}`}
                className="flex w-full items-center justify-center px-4 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4 mr-2" /> Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

