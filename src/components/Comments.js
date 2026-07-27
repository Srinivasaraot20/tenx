"use client";

import { useEffect, useState } from "react";

function StarRating({ value, onChange }) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="interactive-rating-container">
      <div className="star-rating" role="group" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn ${(hoverValue || value) >= n ? "filled" : ""}`}
            onMouseEnter={() => setHoverValue(n)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="rating-display-text">{value}/5 Rating</span>
    </div>
  );
}

function CommentItem({ comment }) {
  const initials = (comment.name || "A").charAt(0).toUpperCase();

  return (
    <div className={`comment-item ${comment.isAdmin ? "admin-comment" : ""}`}>
      <div className="comment-avatar">{initials}</div>
      <div className="comment-body">
        <div className="comment-header">
          <strong>{comment.name}</strong>
          {comment.isAdmin && <span className="admin-badge">Admin</span>}
          <span className="comment-date">
            {new Date(comment.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        {comment.rating > 0 && (
          <div className="comment-stars">{"★".repeat(comment.rating)}{"☆".repeat(5 - comment.rating)}</div>
        )}
        <p>{comment.comment}</p>
        {comment.replies?.map((reply) => (
          <div key={reply.id} className="comment-reply">
            <CommentItem comment={reply} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Comments({ articleId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    rating: 0,
    notify: false,
    privacy: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    comment: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load comments
  useEffect(() => {
    fetch(`/api/comments?articleId=${articleId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setComments(data.comments || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [articleId]);

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Full name is required.";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters.";
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email address is required.";
      else if (!emailRegex.test(value)) error = "Please enter a valid email address.";
    }
    if (name === "comment") {
      if (!value.trim()) error = "Comment body is required.";
      else if (value.trim().length < 10) error = "Comment must be at least 10 characters.";
    }
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const error = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  async function submit(e) {
    e.preventDefault();

    // Trigger validation for all fields
    const nameErr = validateField("name", form.name);
    const emailErr = validateField("email", form.email);
    const commentErr = validateField("comment", form.comment);

    setTouched({ name: true, email: true, comment: true });
    setErrors({ name: nameErr, email: emailErr, comment: commentErr });

    if (nameErr || emailErr || commentErr) {
      return;
    }

    if (!form.privacy) {
      setStatus("privacy");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ articleId, ...form }),
      });
      if (res.ok) {
        setStatus("submitted");
        setForm({ name: "", email: "", website: "", comment: "", rating: 0, notify: false, privacy: false });
        setTouched({ name: false, email: false, comment: false });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function clearForm() {
    setForm({ name: "", email: "", website: "", comment: "", rating: 0, notify: false, privacy: false });
    setTouched({ name: false, email: false, comment: false });
    setErrors({});
    setStatus(null);
  }

  const getInputClass = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "input-invalid" : "input-valid";
  };

  return (
    <section className="comments" id="comments">
      {comments.length > 0 && (
        <div className="comments-list">
          <h3>{comments.length} Comment{comments.length !== 1 ? "s" : ""}</h3>
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      )}

      {loading && <p className="comments-loading">Loading comments...</p>}

      <div className="comments-header">
        <div className="header-title-row">
          <svg className="chat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>Leave a Comment</h2>
        </div>
        <p>Share your thoughts, ask questions, or join the discussion.</p>
      </div>

      <div className="comment-form-card">
        {status === "submitted" ? (
          <div className="comments-success-alert">
            <div className="success-icon">✓</div>
            <div className="success-content">
              <h4>Thank you!</h4>
              <p>Your comment has been submitted successfully and is awaiting moderation.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="comments-form" noValidate>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name-input" className="sr-only">Full Name</label>
                <div className="input-wrapper">
                  <input
                    id="name-input"
                    placeholder="Full Name"
                    value={form.name}
                    className={getInputClass("name")}
                    onBlur={() => handleBlur("name")}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                  {touched.name && !errors.name && <span className="valid-check">✓</span>}
                </div>
                {touched.name && errors.name && <p className="validation-msg error">{errors.name}</p>}
              </div>

              <div className="input-group">
                <label htmlFor="email-input" className="sr-only">Email Address</label>
                <div className="input-wrapper">
                  <input
                    id="email-input"
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    className={getInputClass("email")}
                    onBlur={() => handleBlur("email")}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                  {touched.email && !errors.email && <span className="valid-check">✓</span>}
                </div>
                {touched.email && errors.email && <p className="validation-msg error">{errors.email}</p>}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="website-input" className="sr-only">Website (Optional)</label>
              <input
                id="website-input"
                placeholder="Website (optional)"
                type="url"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="comment-input" className="sr-only">Comment</label>
              <div className="input-wrapper">
                <textarea
                  id="comment-input"
                  placeholder="Comment"
                  rows={5}
                  value={form.comment}
                  className={getInputClass("comment")}
                  onBlur={() => handleBlur("comment")}
                  onChange={(e) => handleChange("comment", e.target.value)}
                  required
                />
                {touched.comment && !errors.comment && <span className="valid-check text-area-check">✓</span>}
              </div>
              {touched.comment && errors.comment && <p className="validation-msg error">{errors.comment}</p>}
            </div>

            <div className="rating-section-row">
              <span className="rating-title-text">Rate this article</span>
              <StarRating value={form.rating} onChange={(r) => handleChange("rating", r)} />
            </div>

            <div className="checkboxes-section">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={form.notify}
                  onChange={(e) => handleChange("notify", e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Notify me about replies</span>
              </label>

              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={form.privacy}
                  onChange={(e) => handleChange("privacy", e.target.checked)}
                  required
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">
                  I agree to the <a href="/privacy-policy" className="privacy-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </span>
              </label>
            </div>

            <div className="comments-buttons-row">
              <button className="submit-btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Posting..." : "Post Comment"}
              </button>
              <button type="button" className="clear-btn" onClick={clearForm}>
                Clear Form
              </button>
            </div>

            {status === "error" && <div className="comments-error-banner">Failed to submit comment. Please try again.</div>}
            {status === "privacy" && <div className="comments-error-banner">You must agree to the Privacy Policy to submit a comment.</div>}
          </form>
        )}
      </div>
    </section>
  );
}
