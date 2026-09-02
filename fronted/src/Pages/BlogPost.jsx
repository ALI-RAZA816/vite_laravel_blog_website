import { Link } from "react-router-dom";
import styles from "../assets/BlogPost.module.css";
import { useState } from "react";

export default function BlogPost() {
  
  const initialComments = [
    {
      id: 1,
      initials: "JV",
      name: "Julian Veldt",
      time: "2 days ago",
      text: "The section on intentional rituals really resonated with me. I've started a morning tea ritual and it's changed my whole day.",
    },
    {
      id: 2,
      initials: "ER",
      name: "Elena Rossi",
      time: "2 days ago",
      text: "Beautifully written. The photography in this piece is also stunning.",
    },
  ];
  
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
 
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        initials: "YO",
        name: "You",
        time: "Just now",
        text: newComment.trim(),
      },
    ]);
    setNewComment("");
  };
  

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200"
          alt="hero"
        />
        <div className={styles.heroContent}>
          <span className={styles.badge}>MINDFULNESS</span>
          <h1 className={styles.heroTitle}>
            The Art of Intentional Living: Reclaiming Time in a Digital Age
          </h1>
        </div>
      </div>

      <div className="container">
        <div className={styles.authorRow}>
          <div className={styles.authorInfo}>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
              alt="Elena Vance"
              className={styles.avatar}
            />
            <div>
              <p className={styles.authorName}>Elena Vance</p>
              <span className={styles.authorMeta}>Nov 12, 2024 • 5 min read</span>
            </div>
          </div>
        </div>
        <hr className={styles.divider} />

        <div className={styles.articleBody}>
          <p>
            In an era where every second is auctioned to the highest bidder of attention, the
            act of simply being has become a radical rebellion. We are tethered to
            notifications, measured by our productivity, and often lost in the digital static of
            constant availability.
          </p>

          <h2 className={styles.subheading}>The Quiet Rebellion of Presence</h2>

          <p>
            Intentional living is not about retreating to a cabin in the woods (though that has
            its charms). It is about the conscious choice to filter the noise. It's the decision
            to put the phone in another room during dinner, to walk without a podcast, and to
            look at the sky instead of a screen during a commute.
          </p>

          <blockquote className={styles.quote}>
            "The quality of your life is determined by the quality of your attention. Where you
            look is where you live."
          </blockquote>

          <p>
            When we reclaimed our mornings from the scroll, we found hours we didn't know
            existed. We found that a single cup of coffee, sipped in silence, provides more
            energy than ten minutes of frantic email checking.
          </p>

          <img
            className={styles.bodyImage}
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900"
            alt="coffee"
          />
        </div>
      <div className={styles.commentsSection}>
        <h5 className={styles.heading}>Comments ({comments.length})</h5>
 
        {/* Add a comment */}
        <div className={`d-flex align-items-start ${styles.addCommentRow}`}>
            <img
              src="https://i.pravatar.cc/64?img=47"
              alt="You"
              className={styles.userAvatar}
            />
            <div className={styles.addCommentBox}>
              <textarea
                className={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <button className={styles.postBtn} onClick={handlePostComment}>
                Post Comment
              </button>
            </div>
        </div>
  
        {/* Comment list */}
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.id} className={`d-flex align-items-start ${styles.commentRow}`}>
              <div className={styles.initialsAvatar}>{comment.initials}</div>
              <div className={styles.commentBody}>
                <div className="d-flex align-items-center gap-2">
                  <span className={styles.commentName}>{comment.name}</span>
                  <span className={styles.commentTime}>{comment.time}</span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
      </div>
  );
}
