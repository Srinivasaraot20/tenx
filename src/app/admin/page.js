"use client";

import { useEffect, useState } from "react";
import "./admin.css";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedLeadId, setExpandedLeadId] = useState(null);
  const [newNoteText, setNewNoteText] = useState("");

  const loadLeads = () => {
    const stored = localStorage.getItem("ten_consultation_leads");
    if (stored) {
      try {
        setLeads(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to load leads from localStorage:", err);
      }
    }
  };

  // Check session storage for existing authentication
  useEffect(() => {
    const isAuth = sessionStorage.getItem("ten_admin_auth") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
      loadLeads();
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passcode === "10XGROWTH") {
      setIsAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem("ten_admin_auth", "true");
      loadLeads();
    } else {
      setAuthError("Invalid Admin Passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ten_admin_auth");
  };

  // Add notes to a specific lead
  const handleAddNote = (leadId) => {
    if (!newNoteText.trim()) return;

    const updated = leads.map((l) => {
      if (l.leadId === leadId) {
        const currentNotes = l.notes || [];
        return {
          ...l,
          notes: [
            ...currentNotes,
            {
              text: newNoteText,
              dateTime: new Date().toLocaleString()
            }
          ]
        };
      }
      return l;
    });

    setLeads(updated);
    localStorage.setItem("ten_consultation_leads", JSON.stringify(updated));
    setNewNoteText("");
  };

  // Change Status of a lead
  const handleStatusChange = (leadId, newStatus) => {
    const updated = leads.map((l) => {
      if (l.leadId === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });

    setLeads(updated);
    localStorage.setItem("ten_consultation_leads", JSON.stringify(updated));
  };

  // Delete lead
  const handleDeleteLead = (leadId) => {
    if (window.confirm(`Are you sure you want to delete lead ${leadId}?`)) {
      const updated = leads.filter((l) => l.leadId !== leadId);
      setLeads(updated);
      localStorage.setItem("ten_consultation_leads", JSON.stringify(updated));
      if (expandedLeadId === leadId) {
        setExpandedLeadId(null);
      }
    }
  };

  // Export filtered leads to CSV file
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads found to export.");
      return;
    }

    const headers = [
      "Lead ID", "Date & Time", "Name", "Company", "Email", "Phone", "WhatsApp", 
      "Website", "Location", "Business Type", "Industry", "Company Size", "Monthly Revenue", "Services Interested", 
      "Goals", "Budget", "Timeline", "Project Description", "Preferred Contact Method", "Preferred Contact Time", 
      "Device", "Browser", "Landing Page", "Status"
    ];

    const csvRows = [headers.join(",")];

    filteredLeads.forEach((l) => {
      const row = [
        l.leadId,
        `"${l.dateTime}"`,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${(l.companyName || "").replace(/"/g, '""')}"`,
        `"${l.email}"`,
        `"${l.phone}"`,
        `"${l.whatsapp || ""}"`,
        `"${l.website || ""}"`,
        `"${(l.location || "").replace(/"/g, '""')}"`,
        `"${l.businessType || ""}"`,
        `"${(l.industry || "").replace(/"/g, '""')}"`,
        `"${l.companySize || ""}"`,
        `"${l.monthlyRevenue || ""}"`,
        `"${(l.services || []).join(" | ")}"`,
        `"${(l.goals || []).join(" | ")}"`,
        `"${l.budget || ""}"`,
        `"${l.timeline || ""}"`,
        `"${(l.projectDescription || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${l.contactMethod || ""}"`,
        `"${(l.contactTime || "").replace(/"/g, '""')}"`,
        `"${l.deviceType || ""}"`,
        `"${l.browser || ""}"`,
        `"${l.landingPage || ""}"`,
        `"${l.status || ""}"`
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digitalmarketingtenx_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter((l) => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.companyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.leadId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = 
      !filterService || 
      (l.services || []).includes(filterService);

    const matchesStatus = 
      !filterStatus || 
      l.status === filterStatus;

    return matchesSearch && matchesService && matchesStatus;
  });

  // Calculate statistics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const qualifiedLeadsCount = leads.filter((l) => l.status === "Qualified").length;
  const wonLeadsCount = leads.filter((l) => l.status === "Won").length;

  if (!isAuthenticated) {
    return (
      <div className="admin-body">
        <div className="admin-container">
          <div className="admin-login-overlay">
            <form className="admin-login-card" onSubmit={handleLoginSubmit}>
              <h2>🔒 Admin Leads Portal</h2>
              <p>Please enter your 10X Admin Passcode to review submitted consultation inquiries.</p>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button type="submit">Verify & Login</button>
              {authError && <div className="admin-login-error">{authError}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title-area">
            <h1>🚀 Leads & Consultations Dashboard</h1>
            <p>Track, manage, qualify, and export incoming inquiries from Digital Marketing TenX.</p>
          </div>
          <div className="admin-header-actions">
            <button className="admin-export-btn" onClick={handleExportCSV}>
              📥 Export to CSV
            </button>
            <button className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card orange">
            <span className="admin-stat-label">Total Inquiries</span>
            <span className="admin-stat-value">{totalLeads}</span>
          </div>
          <div className="admin-stat-card purple">
            <span className="admin-stat-label">New Leads</span>
            <span className="admin-stat-value">{newLeadsCount}</span>
          </div>
          <div className="admin-stat-card blue">
            <span className="admin-stat-label">Qualified Leads</span>
            <span className="admin-stat-value">{qualifiedLeadsCount}</span>
          </div>
          <div className="admin-stat-card green">
            <span className="admin-stat-label">Won Contracts</span>
            <span className="admin-stat-value">{wonLeadsCount}</span>
          </div>
        </div>

        {/* Control Filters Bar */}
        <div className="admin-control-bar">
          <input 
            type="text" 
            placeholder="Search by Name, Company, Email, ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={filterService} 
            onChange={(e) => setFilterService(e.target.value)}
          >
            <option value="">-- Filter by Service --</option>
            <option value="Website Design">Website Design</option>
            <option value="Website Development">Website Development</option>
            <option value="SEO">SEO</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="Social Media Marketing">Social Media Marketing</option>
            <option value="WhatsApp Automation">WhatsApp Automation</option>
            <option value="AI Automation">AI Automation</option>
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">-- Filter by Status --</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", color: "#64748b", fontSize: "13px", fontWeight: "600" }}>
            Showing {filteredLeads.length} of {totalLeads} leads
          </div>
        </div>

        {/* Leads Table wrapper */}
        <div className="admin-table-wrapper">
          {filteredLeads.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Date & Time</th>
                  <th>Contact Info</th>
                  <th>Interested Services</th>
                  <th>Budget / Timeline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((l) => (
                  <>
                    <tr key={l.leadId} style={{ cursor: "pointer" }} onClick={() => setExpandedLeadId(expandedLeadId === l.leadId ? null : l.leadId)}>
                      <td style={{ fontWeight: "800", color: "#fff" }}>
                        {l.leadId}
                      </td>
                      <td style={{ fontSize: "13px", color: "#94a3b8" }}>
                        {l.dateTime}
                      </td>
                      <td>
                        <div style={{ fontWeight: "700", color: "#f8fafc" }}>{l.name}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>{l.companyName ? `${l.companyName} | ` : ""}{l.email}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>{l.phone}</div>
                      </td>
                      <td>
                        {(l.services || []).map((s) => (
                          <span key={s} className="admin-badge-service">{s}</span>
                        ))}
                      </td>
                      <td>
                        <div style={{ fontWeight: "600", color: "#fff", fontSize: "13px" }}>{l.budget}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>⌛ {l.timeline}</div>
                      </td>
                      <td>
                        <span className={`admin-badge-status ${l.status.toLowerCase()}`}>
                          {l.status}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            className="btn-outline" 
                            style={{ padding: "4px 10px", fontSize: "12px", borderRadius: "6px" }}
                            onClick={() => setExpandedLeadId(expandedLeadId === l.leadId ? null : l.leadId)}
                          >
                            {expandedLeadId === l.leadId ? "Close" : "View"}
                          </button>
                          <button 
                            className="btn-outline" 
                            style={{ padding: "4px 10px", fontSize: "12px", borderRadius: "6px", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}
                            onClick={() => handleDeleteLead(l.leadId)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedLeadId === l.leadId && (
                      <tr className="admin-detail-row" onClick={(e) => e.stopPropagation()}>
                        <td colSpan="7">
                          <div className="admin-lead-detail">
                            <div className="admin-detail-section">
                              <h4>🔎 Full Lead Information</h4>
                              <div className="admin-detail-grid">
                                <div className="admin-detail-item">
                                  <label>WhatsApp Number</label>
                                  <span>{l.whatsapp || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Website URL</label>
                                  <span>{l.website ? <a href={l.website.startsWith("http") ? l.website : `https://${l.website}`} target="_blank" rel="noreferrer" style={{ color: "#ff5722", textDecoration: "underline" }}>{l.website}</a> : "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Business Location</label>
                                  <span>{l.location || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Business Type</label>
                                  <span>{l.businessType || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Industry</label>
                                  <span>{l.industry || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Company Size</label>
                                  <span>{l.companySize || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Monthly Revenue</label>
                                  <span>{l.monthlyRevenue || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Primary Goals</label>
                                  <span>{(l.goals || []).join(", ") || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Preferred Contact</label>
                                  <span>{l.contactMethod} ({l.contactTime || "Anytime"})</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Project Budget</label>
                                  <span>{l.budget || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item">
                                  <label>Required Timeline</label>
                                  <span>{l.timeline || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item" style={{ gridColumn: "span 2" }}>
                                  <label>Services Interested In</label>
                                  <span>{(l.services || []).join(", ") || "N/A"}</span>
                                </div>
                                <div className="admin-detail-item" style={{ gridColumn: "span 2" }}>
                                  <label>UTM / Referrer Info</label>
                                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>Source: {l.utmSource} | Medium: {l.utmMedium} | Page: {l.landingPage}</span>
                                </div>
                              </div>

                              <div className="admin-detail-item" style={{ marginTop: "12px" }}>
                                <label>Project Description</label>
                                <span style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", display: "block", marginTop: "4px", lineHeight: "1.5" }}>
                                  {l.projectDescription}
                                </span>
                              </div>
                            </div>

                            <div className="admin-detail-section">
                              <h4>⚙️ Manage Status & Notes</h4>
                              <div className="con-form-group" style={{ marginBottom: "16px" }}>
                                <label>Update Workflow Status</label>
                                <select 
                                  value={l.status} 
                                  onChange={(e) => handleStatusChange(l.leadId, e.target.value)}
                                  style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: "100%", padding: "8px 12px", borderRadius: "6px" }}
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Qualified">Qualified</option>
                                  <option value="Won">Won</option>
                                  <option value="Lost">Lost</option>
                                </select>
                              </div>

                              <div className="admin-notes-area">
                                <label style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Internal Notes</label>
                                <div className="admin-notes-list">
                                  {(l.notes || []).length > 0 ? (
                                    l.notes.map((n, idx) => (
                                      <div key={idx} className="admin-note-item">
                                        <div>{n.text}</div>
                                        <span className="admin-note-meta">{n.dateTime}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <div style={{ color: "#64748b", fontSize: "12px", padding: "4px" }}>No notes added yet.</div>
                                  )}
                                </div>
                                <div className="admin-add-note">
                                  <input 
                                    type="text" 
                                    placeholder="Type admin note..." 
                                    value={newNoteText}
                                    onChange={(e) => setNewNoteText(e.target.value)}
                                  />
                                  <button onClick={() => handleAddNote(l.leadId)}>Add</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="admin-empty-state">
              <h3>No Consultation Leads Found</h3>
              <p>Search terms or filter metrics did not return any records.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

