import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, website, comment, rating, articleId, notify, blogSlug } = body;

    if (!name?.trim() || !email?.trim() || !comment?.trim()) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // 1. Save to Database
    const newComment = await prisma.blogComment.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        website: website?.trim() || "",
        content: comment.trim(),
        rating: Number(rating) || 5,
        notify: Boolean(notify),
        articleId: articleId ? Number(articleId) : null,
        blogSlug: blogSlug || null,
        status: "Pending",
      },
    });

    // 2. Create Admin Notification
    await prisma.adminNotification.create({
      data: {
        type: "BlogComment",
        title: "New Blog Comment",
        message: `${newComment.name} commented on an article.`,
        link: "/admin/comments",
      },
    });

    // 3. Send Email Notification
    import('@/lib/email').then(({ sendEmail }) => {
      sendEmail({
        to: 'digitalmarketingtenx@gmail.com',
        subject: `New Blog Comment from ${newComment.name}`,
        html: `
          <h3>New Blog Comment Awaiting Approval</h3>
          <p><strong>Name:</strong> ${newComment.name}</p>
          <p><strong>Email:</strong> ${newComment.email}</p>
          <p><strong>Comment:</strong> ${newComment.content}</p>
          <p><a href="https://www.digitalmarketingtenx.com/admin/comments">Review Comment</a></p>
        `
      }).catch(err => console.error("Email notification error:", err));
    });

    return NextResponse.json({ ok: true, id: newComment.id, message: "Comment submitted for review" }, { status: 201 });
  } catch (err) {
    console.error("Blog Comment Error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");
    const blogSlug = searchParams.get("blogSlug");

    let whereClause = { status: "Approved" };
    if (articleId) whereClause.articleId = Number(articleId);
    if (blogSlug) whereClause.blogSlug = blogSlug;

    const comments = await prisma.blogComment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    // To maintain compatibility with frontend expected format
    const formattedComments = comments.map(c => ({
      ...c,
      comment: c.content // mapping Prisma content to frontend comment
    }));

    return NextResponse.json({ ok: true, comments: formattedComments });
  } catch (err) {
    console.error("Fetch Comments Error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

