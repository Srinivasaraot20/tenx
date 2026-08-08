import Link from "next/link";
import Image from "next/image";
import { getAuthorArticles } from "@/lib/blog";

export default function AuthorProfile({ author }) {
  if (!author) return null;

  const latestArticles = getAuthorArticles(author.id, 3);

  return (
    <div className="author-card">
      <div className="author-avatar-wrap">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={72}
            height={72}
            className="author-avatar-img"
          />
        ) : (
          <div className="author-avatar">{author.name?.charAt(0) || "A"}</div>
        )}
      </div>
      <div className="author-info">
        <h3 className="author-name">About the Author</h3>
        <div className="author-name-text">{author.name}</div>
        <div className="author-role">{author.designation || author.role}</div>
        {author.experience && <div className="author-experience">{author.experience} experience</div>}
        <p className="author-bio">{author.bio}</p>
        {author.social && (
          <div className="author-social">
            {author.social.linkedin && (
              <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                LinkedIn
              </a>
            )}
            {author.social.twitter && (
              <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                X
              </a>
            )}
            {author.social.facebook && (
              <a href={author.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                Facebook
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

