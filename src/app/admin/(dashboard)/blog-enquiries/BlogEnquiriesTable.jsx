"use client";

import React, { useState } from "react";
import { Eye, Trash2, X, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { deleteEnquiry, bulkDeleteEnquiries, updateEnquiryStatus } from "../../actions/blog-enquiry-actions";

export default function BlogEnquiriesTable({ initialEnquiries }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [viewModalData, setViewModalData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(enquiries.map(enq => enq.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?\n\nThis action cannot be undone.")) return;
    
    setIsDeleting(true);
    const result = await deleteEnquiry(id);
    if (result.success) {
      setEnquiries(enquiries.filter(e => e.id !== id));
      showToast("Enquiry deleted successfully.");
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
    } else {
      showToast(result.message || "Failed to delete enquiry.", "error");
    }
    setIsDeleting(false);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedIds.size} selected enquiries?\n\nThis action cannot be undone.`)) return;

    setIsDeleting(true);
    const idsArray = Array.from(selectedIds);
    const result = await bulkDeleteEnquiries(idsArray);
    
    if (result.success) {
      setEnquiries(enquiries.filter(e => !selectedIds.has(e.id)));
      showToast(`${selectedIds.size} enquiries deleted successfully.`);
      setSelectedIds(new Set());
    } else {
      showToast(result.message || "Failed to bulk delete.", "error");
    }
    setIsDeleting(false);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${type} copied to clipboard!`);
    } catch (err) {
      showToast("Failed to copy", "error");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const result = await updateEnquiryStatus(id, status);
    if (result.success) {
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
      showToast("Status updated.");
    } else {
      showToast("Failed to update status.", "error");
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center px-4 py-3 rounded-lg shadow-lg text-white ${toast.type === "error" ? "bg-red-600" : "bg-green-600"} transition-all`}>
          {toast.type === "error" ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* View Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800 text-lg">Enquiry Details</h2>
              <button 
                onClick={() => setViewModalData(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                  <p className="font-medium text-slate-800">{viewModalData.fullName}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                    viewModalData.status === 'New' ? 'bg-blue-100 text-blue-700' :
                    viewModalData.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                    viewModalData.status === 'Converted' ? 'bg-green-100 text-green-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {viewModalData.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-slate-800 break-all">{viewModalData.email}</p>
                    <button onClick={() => copyToClipboard(viewModalData.email, 'Email')} className="text-slate-400 hover:text-primary" title="Copy Email">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                  {viewModalData.phone ? (
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-slate-800">{viewModalData.phone}</p>
                      <button onClick={() => copyToClipboard(viewModalData.phone, 'Phone')} className="text-slate-400 hover:text-primary" title="Copy Phone">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="italic text-slate-400">Not provided</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Blog Title</label>
                  <p className="font-medium text-slate-800">{viewModalData.blogTitle || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Blog URL / Slug</label>
                  <a href={viewModalData.blogUrl || "#"} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline break-all">
                    {viewModalData.blogUrl || "N/A"}
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message Content</label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 whitespace-pre-wrap">
                  {viewModalData.message || <span className="text-slate-400 italic">No message provided</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Submitted At</label>
                  <p className="text-slate-600">{new Date(viewModalData.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">IP Address</label>
                  <p className="text-slate-600 font-mono text-xs mt-1">{viewModalData.ip || "Not recorded"}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setViewModalData(null)}
                className="px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Header */}
      {selectedIds.size > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span className="text-sm font-medium text-blue-800">
            {selectedIds.size} item(s) selected
          </span>
          <button 
            onClick={handleBulkDelete}
            disabled={isDeleting}
            className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200 w-12">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                  checked={enquiries.length > 0 && selectedIds.size === enquiries.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4 border-b border-slate-200">Date</th>
              <th className="px-6 py-4 border-b border-slate-200">Contact Info</th>
              <th className="px-6 py-4 border-b border-slate-200">Blog / Subject</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
              <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.has(enq.id) ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-6 py-4 align-top">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer mt-1"
                      checked={selectedIds.has(enq.id)}
                      onChange={() => handleSelectOne(enq.id)}
                    />
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-slate-800">{new Date(enq.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-slate-400 mt-1">{new Date(enq.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-bold text-slate-800">{enq.fullName}</div>
                    <div className="text-slate-500 mt-1">{enq.email}</div>
                    <div className="text-slate-500">{enq.phone}</div>
                  </td>
                  <td className="px-6 py-4 align-top max-w-xs">
                    <div className="font-medium text-slate-800 truncate">{enq.subject}</div>
                    <div className="text-xs text-primary mt-1 truncate">{enq.blogTitle}</div>
                    <div className="text-xs text-slate-500 mt-2 line-clamp-2" title={enq.message}>{enq.message}</div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      enq.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      enq.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                      enq.status === 'Converted' ? 'bg-green-100 text-green-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {enq.status}
                    </span>
                    {enq.status === 'New' && (
                      <button 
                        onClick={() => handleUpdateStatus(enq.id, 'Contacted')}
                        className="block mt-2 text-[10px] uppercase font-bold text-blue-600 hover:underline"
                      >
                        Mark Contacted
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => setViewModalData(enq)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Enquiry"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(enq.id)}
                        disabled={isDeleting}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
