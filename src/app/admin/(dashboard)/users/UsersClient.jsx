"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, Plus, Download, MoreVertical, Eye, Edit, Trash2, 
  X, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, 
  Filter, UploadCloud, UserCircle2
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { 
  createUser, updateUser, deleteUser, 
  bulkDeleteUsers, bulkUpdateUserStatus 
} from "../../actions/user-actions";

export default function UsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  // Search, Filter, Sort, Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    name: "", username: "", email: "", phone: "",
    role: "user", status: "Active", password: "", confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Filtering & Sorting Logic ---
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.phone && u.phone.toLowerCase().includes(q))
      );
    }

    // Filter
    if (filterRole) result = result.filter(u => u.role === filterRole);
    if (filterStatus) result = result.filter(u => u.status === filterStatus);

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (!aVal) aVal = "";
      if (!bVal) bVal = "";

      if (sortConfig.key === "createdAt" || sortConfig.key === "lastLogin") {
        aVal = new Date(aVal || 0).getTime();
        bVal = new Date(bVal || 0).getTime();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchQuery, filterRole, filterStatus, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const currentUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // --- Selection Logic ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(currentUsers.map(u => u.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  // --- Bulk Actions ---
  const handleBulkAction = async (action) => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    setIsLoading(true);

    if (action === "delete") {
      if (!window.confirm(`Delete ${selectedIds.size} selected users? This cannot be undone.`)) {
        setIsLoading(false);
        return;
      }
      const res = await bulkDeleteUsers(ids);
      if (res.success) {
        setUsers(users.filter(u => !selectedIds.has(u.id)));
        setSelectedIds(new Set());
        showToast(`${selectedIds.size} users deleted successfully.`);
      } else {
        showToast(res.message, "error");
      }
    } else {
      const statusMap = {
        activate: "Active",
        deactivate: "Inactive",
        suspend: "Suspended"
      };
      const newStatus = statusMap[action];
      if (!newStatus) return;

      const res = await bulkUpdateUserStatus(ids, newStatus);
      if (res.success) {
        setUsers(users.map(u => selectedIds.has(u.id) ? { ...u, status: newStatus } : u));
        setSelectedIds(new Set());
        showToast(`Status updated for ${selectedIds.size} users.`);
      } else {
        showToast(res.message, "error");
      }
    }
    setIsLoading(false);
  };

  // --- Export Logic ---
  const handleExport = (format) => {
    const exportData = filteredAndSortedUsers.map(u => ({
      "Full Name": u.name || "-",
      "Username": u.username || "-",
      "Email": u.email || "-",
      "Phone": u.phone || "-",
      "Role": u.role || "-",
      "Status": u.status || "-",
      "Registration Date": new Date(u.createdAt).toLocaleDateString(),
      "Last Login": u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Never",
    }));

    if (format === "csv" || format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      
      if (format === "csv") {
        XLSX.writeFile(workbook, "users_export.csv", { bookType: "csv" });
      } else {
        XLSX.writeFile(workbook, "users_export.xlsx", { bookType: "xlsx" });
      }
      showToast(`Exported as ${format.toUpperCase()} successfully.`);
    } else if (format === "pdf") {
      const doc = new jsPDF("landscape");
      doc.text("Admin Users Export", 14, 15);
      
      const tableColumn = Object.keys(exportData[0]);
      const tableRows = exportData.map(obj => Object.values(obj));

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [15, 23, 42] }
      });
      
      doc.save("users_export.pdf");
      showToast("Exported as PDF successfully.");
    }
  };

  // --- Form Logic ---
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ name: "", username: "", email: "", phone: "", role: "user", status: "Active", password: "", confirmPassword: "" });
    setFormErrors({});
    setEditModalData(true);
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setFormData({ 
      id: user.id, name: user.name || "", username: user.username || "", 
      email: user.email || "", phone: user.phone || "", role: user.role || "user", 
      status: user.status || "Active", password: "", confirmPassword: "" 
    });
    setFormErrors({});
    setEditModalData(user);
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.username) errors.username = "Username is required";
    
    if (!isEditMode && !formData.password) {
      errors.password = "Password is required for new users";
    }
    
    if (formData.password) {
      if (formData.password.length < 8) errors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const dataToSubmit = { ...formData };
    delete dataToSubmit.confirmPassword;
    if (!dataToSubmit.password) delete dataToSubmit.password;

    if (isEditMode) {
      const id = dataToSubmit.id;
      delete dataToSubmit.id;
      const res = await updateUser(id, dataToSubmit);
      if (res.success) {
        setUsers(users.map(u => u.id === id ? { ...u, ...dataToSubmit } : u));
        showToast("User updated successfully.");
        setEditModalData(null);
      } else {
        showToast(res.message, "error");
      }
    } else {
      const res = await createUser(dataToSubmit);
      if (res.success) {
        setUsers([res.user, ...users]);
        showToast("User created successfully.");
        setEditModalData(null);
      } else {
        showToast(res.message, "error");
      }
    }
    setIsLoading(false);
  };

  // --- Delete Single Logic ---
  const executeDelete = async (id) => {
    setIsLoading(true);
    const res = await deleteUser(id);
    if (res.success) {
      setUsers(users.filter(u => u.id !== id));
      showToast("User deleted successfully.");
    } else {
      showToast(res.message, "error");
    }
    setIsLoading(false);
    setDeleteConfirmId(null);
  };

  // --- Helpers ---
  const StatusBadge = ({ status }) => {
    const colors = {
      "Active": "bg-green-100 text-green-700",
      "Inactive": "bg-slate-100 text-slate-700",
      "Suspended": "bg-red-100 text-red-700",
      "Pending Verification": "bg-amber-100 text-amber-700"
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || colors["Inactive"]}`}>
        {status || "Unknown"}
      </span>
    );
  };

  const RoleBadge = ({ role }) => {
    const isAdmin = role === "admin" || role === "Super Admin";
    return (
      <span className={`px-2.5 py-1 rounded text-xs font-medium border ${isAdmin ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
        {role || "user"}
      </span>
    );
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-[60] flex items-center px-4 py-3 rounded-lg shadow-lg text-white ${toast.type === "error" ? "bg-red-600" : "bg-green-600"} animate-in slide-in-from-bottom-5`}>
          {toast.type === "error" ? <AlertCircle className="w-5 h-5 mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
              <option value="Staff">Staff</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending Verification">Pending Verification</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <div className="relative group">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 text-sm font-medium flex items-center shrink-0">
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
            <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button onClick={() => handleExport("excel")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Excel (.xlsx)</button>
              <button onClick={() => handleExport("csv")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">CSV</button>
              <button onClick={() => handleExport("pdf")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">PDF</button>
            </div>
          </div>
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-slate-900 text-white border border-transparent rounded-lg shadow-sm hover:bg-slate-800 text-sm font-medium flex items-center shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" /> Add User
          </button>
        </div>
      </div>

      {/* Bulk Actions Header */}
      {selectedIds.size > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
          <span className="text-sm font-medium text-blue-800">
            {selectedIds.size} user(s) selected
          </span>
          <div className="flex gap-2">
            <button onClick={() => handleBulkAction("activate")} disabled={isLoading} className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 disabled:opacity-50">Activate</button>
            <button onClick={() => handleBulkAction("deactivate")} disabled={isLoading} className="px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded hover:bg-slate-700 disabled:opacity-50">Deactivate</button>
            <button onClick={() => handleBulkAction("delete")} disabled={isLoading} className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 disabled:opacity-50 flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Delete</button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    checked={currentUsers.length > 0 && selectedIds.size === currentUsers.length}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-primary cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => requestSort("name")}>
                  Name / Email {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => requestSort("role")}>
                  Role
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => requestSort("status")}>
                  Status
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => requestSort("createdAt")}>
                  Registered
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => requestSort("lastLogin")}>
                  Last Login
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                    <UserCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-lg font-medium text-slate-800">No users found.</p>
                    <p className="text-sm mt-1">Adjust your filters or create your first user to get started.</p>
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.has(user.id) ? 'bg-blue-50/50' : ''}`}>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(user.id)}
                        onChange={() => handleSelectOne(user.id)}
                        className="rounded border-slate-300 text-primary cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase">
                          {(user.name || user.email || "U").charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{user.name || "Unnamed"}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{user.email}</div>
                      {user.username && <div className="text-slate-400 text-xs">@{user.username}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => setViewModalData(user)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEditModal(user)} className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirmId(user.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                          <Trash2 className="w-4 h-4" />
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
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <span className="text-sm text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} entries
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1.5 text-sm font-medium text-slate-700">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete this user?</h3>
            <p className="text-sm text-slate-500 mb-6">This action cannot be undone. The user's data will be permanently removed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 flex-1">
                Cancel
              </button>
              <button onClick={() => executeDelete(deleteConfirmId)} disabled={isLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 flex-1 disabled:opacity-50">
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewModalData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800 text-lg">User Details</h2>
              <button onClick={() => setViewModalData(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center space-x-6 mb-8">
                {viewModalData.image ? (
                  <img src={viewModalData.image} alt={viewModalData.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-slate-50 flex items-center justify-center text-slate-400 text-3xl font-bold uppercase shadow-sm">
                    {(viewModalData.name || viewModalData.email || "U").charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{viewModalData.name || "Unnamed User"}</h3>
                  <p className="text-slate-500">{viewModalData.email}</p>
                  <div className="flex gap-2 mt-3">
                    <RoleBadge role={viewModalData.role} />
                    <StatusBadge status={viewModalData.status} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div><span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Username</span><span className="font-medium text-slate-800">{viewModalData.username || "N/A"}</span></div>
                <div><span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span><span className="font-medium text-slate-800">{viewModalData.phone || "N/A"}</span></div>
                <div><span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date Joined</span><span className="text-slate-700">{new Date(viewModalData.createdAt).toLocaleString()}</span></div>
                <div><span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Last Login</span><span className="text-slate-700">{viewModalData.lastLogin ? new Date(viewModalData.lastLogin).toLocaleString() : "Never"}</span></div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setViewModalData(null)} className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {editModalData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800 text-lg">{isEditMode ? "Edit User" : "Add New User"}</h2>
              <button onClick={() => setEditModalData(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${formErrors.name ? 'border-red-500' : 'border-slate-300'}`} />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username *</label>
                  <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${formErrors.username ? 'border-red-500' : 'border-slate-300'}`} />
                  {formErrors.username && <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${formErrors.email ? 'border-red-500' : 'border-slate-300'}`} />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Pending Verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-4">{isEditMode ? "Change Password (Leave blank to keep current)" : "Set Password *"}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${formErrors.password ? 'border-red-500' : 'border-slate-300'}`} />
                    {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${formErrors.confirmPassword ? 'border-red-500' : 'border-slate-300'}`} />
                    {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
              
              <div className="pt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setEditModalData(null)} className="px-5 py-2 border border-slate-300 bg-white rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50">
                  {isLoading ? "Saving..." : (isEditMode ? "Save Changes" : "Create User")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
