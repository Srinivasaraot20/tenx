"use client";

import { useState } from "react";
import { Search, Trash2, Eye, Mail, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommentsClient({ initialComments }) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments || []);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openDrawer = (comment) => {
    setSelectedComment(comment);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredComments.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(cId => cId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async (ids) => {
    if (!window.confirm("Delete selected comment(s)? This cannot be undone.")) return;

    const idsToDelete = Array.isArray(ids) ? ids : [ids];
    setIsDeleting(true);

    try {
      const response = await fetch('/api/admin/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete })
      });

      if (response.ok) {
        setComments(comments.filter(c => !idsToDelete.includes(c.id)));
        if (isDrawerOpen) closeDrawer();
        setSelectedIds([]);
        showNotification("Deleted successfully.");
        router.refresh();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (response.ok) {
        setComments(comments.map(c => c.id === id ? { ...c, status: newStatus } : c));
        if (selectedComment && selectedComment.id === id) {
          setSelectedComment({ ...selectedComment, status: newStatus });
        }
        showNotification("Status updated successfully.");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const filteredComments = comments.filter(c => {
    const matchesSearch = c.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-lg shadow-lg font-medium text-white transition-all duration-300 ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col relative">
        
        {isDeleting && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50/50 gap-4">
          <div className="flex items-center space-x-3 w-full sm:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search comments..."
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
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Spam">Spam</option>
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    checked={filteredComments.length > 0 && selectedIds.length === filteredComments.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    No comments found.
                  </td>
                </tr>
              ) : (
                filteredComments.map((c) => (
                  <tr 
                    key={c.id} 
                    className={`hover:bg-slate-50 transition-colors cursor-pointer group ${selectedIds.includes(c.id) ? 'bg-primary/5' : ''}`}
                    onClick={() => openDrawer(c)}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                        checked={selectedIds.includes(c.id)}
                        onChange={() => toggleSelect(c.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{c.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-600 text-sm">
                      {c.content}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 ring-1 ring-inset cursor-pointer ${
                          c.status === 'Approved' ? 'bg-green-50 text-green-700 ring-green-200' :
                          c.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 ring-yellow-200' :
                          c.status === 'Spam' ? 'bg-orange-50 text-orange-700 ring-orange-200' :
                          'bg-red-50 text-red-700 ring-red-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Spam">Spam</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="text-slate-400 hover:text-primary p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                          onClick={(e) => { e.stopPropagation(); openDrawer(c); }}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
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
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && selectedComment && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />
          
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Comment Details</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleDelete(selectedComment.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={closeDrawer}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 break-all">{selectedComment.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{selectedComment.email}</p>
                {selectedComment.website && (
                  <p className="text-blue-500 text-sm mt-1 underline"><a href={selectedComment.website} target="_blank">{selectedComment.website}</a></p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <select 
                    value={selectedComment.status}
                    onChange={(e) => handleStatusChange(selectedComment.id, e.target.value)}
                    className="text-sm font-medium rounded-lg px-3 py-1.5 border-0 ring-1 ring-inset cursor-pointer outline-none w-full bg-white ring-slate-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Spam">Spam</option>
                  </select>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Article Details</p>
                  <p className="text-sm text-slate-800 font-medium">Article ID: {selectedComment.articleId || 'N/A'}</p>
                  <p className="text-sm text-slate-800 font-medium">Slug: {selectedComment.blogSlug || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Date Submitted</p>
                  <p className="text-sm text-slate-800">{new Date(selectedComment.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span> Comment
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 whitespace-pre-wrap text-sm">
                  {selectedComment.content}
                </div>
              </div>

            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white">
              <a 
                href={`mailto:${selectedComment.email}`}
                className="flex w-full items-center justify-center px-4 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4 mr-2" /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

