import { useMemo, useRef, useState } from "react";
import styles from "../assets/AdminMessage.module.css";
import JoditEditor from "jodit-react";

/* ---------- tiny inline icons (no extra dependency needed) ---------- */
const Icon = ({ children, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const InboxIcon = () => (
  <Icon>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </Icon>
);
const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);
const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
const MailOpenIcon = () => (
  <Icon>
    <path d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9l9-6z" />
    <path d="m3 10 9 6 9-6" />
  </Icon>
);
const TrashIcon = () => (
  <Icon>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
  </Icon>
);
const ReplyIcon = () => (
  <Icon size={18}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 6 6v3" />
  </Icon>
);
const CalendarIcon = () => (
  <Icon size={16}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </Icon>
);
const DeviceIcon = () => (
  <Icon size={16}>
    <rect x="2" y="5" width="14" height="11" rx="1.5" />
    <rect x="14" y="9" width="8" height="12" rx="1.5" />
  </Icon>
);
const BoldIcon = () => (
  <Icon size={16} strokeWidth="2.4">
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
  </Icon>
);
const ItalicIcon = () => (
  <Icon size={16}>
    <path d="M19 4h-9M14 20H5M15 4 9 20" />
  </Icon>
);
const LinkIcon = () => (
  <Icon size={16}>
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </Icon>
);
const ListIcon = () => (
  <Icon size={16}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </Icon>
);
const PaperclipIcon = () => (
  <Icon size={16}>
    <path d="m21 11-9.5 9.5a5.5 5.5 0 0 1-7.8-7.8L13 3.4a3.7 3.7 0 0 1 5.2 5.2L9 17.8a1.8 1.8 0 0 1-2.6-2.6L15 6.6" />
  </Icon>
);
const SendIcon = () => (
  <Icon size={16}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </Icon>
);

/* ---------- data ---------- */
const stats = [
  { id: 1, label: "Total Inquiries", value: "28", icon: <InboxIcon /> },
  { id: 2, label: "Unread Messages", value: "4", badge: "New", icon: <MailIcon />, accent: true },
  { id: 3, label: "Avg Response Time", value: "2.4 hrs", icon: <ClockIcon /> },
];

const tabs = [
  { key: "all", label: "All", count: 28 },
  { key: "unread", label: "Unread", count: 4 },
];

const messages = [
  {
    id: 1,
    name: "Evelyn Thorne",
    time: "10:45 AM",
    subject: "Collaboration on mindful interior essay",
    preview:
      "Whether you have a question about our slow-living practices, want to collaborate, or just want to share a quiet moment of...",
    tag: "Website Inquiry",
    tagType: "inquiry",
    email: "evelyn@slowliving.com",
    unread: true,
  },
  {
    id: 2,
    name: "Marcus Vance",
    time: "Yesterday",
    subject: "Photography feature permission & inquiry",
    preview:
      "Hello editorial team, I loved your recent photo essay on morning rituals and natural light. We would love to offer full permissions...",
    tag: "Partnership",
    email: "m.vance@studio-nordic.dk",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    time: "Oct 23",
    subject: "Press inquiry regarding slow living publication",
    preview:
      "We would love to feature the founder in our upcoming winter quarterly editorial highlighting conscious digital creators...",
    tag: "Press",
    email: "s.jenkins@journalpress.com",
  },
  {
    id: 4,
    name: "Dr. Julian Reed",
    time: "Oct 21",
    subject: "Citation & guest contribution for neuroscience of focus",
    preview:
      "I appreciate your thoughtful curation and would love to submit a guest reflection bridging intentional pacing with cognitive well-...",
    tag: "Academic",
    email: "j.reed@university.edu",
  },
  {
    id: 5,
    name: "Clara Oswald",
    time: "Oct 19",
    subject: "Feedback regarding the Kyoto meditation article",
    preview:
      "Thank you for writing such a soothing piece. One small question about the tea house referenced in section two...",
  },
];

const detail = {
  from: "Evelyn Thorne",
  email: "evelyn@slowliving.com",
  role: "Founder & Spatial Designer at",
  company: "Atelier Minimal",
  date: "October 24, 2024 · 10:45 AM (EST)",
  via: "Sent via slowlivingblog.com/contact",
  subject: "Collaboration on mindful interior essay",
};

const avatarEvelyn =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces";
const avatarAdmin =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces";

/* ---------- component ---------- */
export default function ContactMessages({placeholder}) {

  const config = useMemo(
    () => ({
      readonly: false,
      height:500,
      statusbar: false,
      placeholder: placeholder || 'Type your response......',
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "fontsize",
        "|",
        "ul",
        "source"
    ],
    }),
    [placeholder]
  );

  const [activeTab, setActiveTab] = useState("all");
  const [selectedId, setSelectedId] = useState(1);
  const [reply, setReply] = useState("");
  const [content, setContent] = useState('');
  const editor = useRef(null);

  const visible = activeTab === "unread" ? messages.filter((m) => m.unread) : messages;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* heading */}
        <div className={styles.heading}>
          <div>
            <h1>Contact Messages</h1>
            <p>Review, manage, and respond to incoming reader inquiries submitted from the Contact page.</p>
          </div>
        </div>

        {/* stat cards */}
        <section className={styles.stats}>
          {stats.map((s) => (
            <div key={s.id} className={styles.statCard}>
              <div>
                <span className={styles.statLabel}>{s.label}</span>
                <div className={styles.statValueRow}>
                  <span className={styles.statValue}>{s.value}</span>
                  {s.badge && <span className={styles.statBadge}>{s.badge}</span>}
                </div>
              </div>
              <span className={`${styles.statIcon} ${s.accent ? styles.statIconAccent : ""}`}>{s.icon}</span>
            </div>
          ))}
        </section>

        {/* inbox panel */}
        <section className={styles.panel}>
          {/* list */}
          <aside className={styles.list}>
            <div className={styles.tabs}>
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label} <span className={styles.tabCount}>{t.count}</span>
                </button>
              ))}
            </div>

            <ul className={styles.items}>
              {visible.map((m) => (
                <li
                  key={m.id}
                  className={`${styles.item} ${selectedId === m.id ? styles.itemActive : ""}`}
                  onClick={() => setSelectedId(m.id)}
                >
                  <div className={styles.itemActions}>
                    <button type="button" aria-label={m.unread ? "Mark as read" : "Mark as unread"}>
                      {m.unread ? <MailOpenIcon /> : <MailIcon />}
                    </button>
                    <button type="button" aria-label="Delete message">
                      <TrashIcon />
                    </button>
                  </div>
                  <div className={styles.itemTop}>
                    <span className={styles.itemName}>
                      {m.unread && <i className={styles.unreadDot} />}
                      {m.name}
                      {m.unread && <span className="badge bg-primary">Unread</span>}
                    </span>
                    <span className={styles.itemTime}>{m.time}</span>
                  </div>
                  <h4>{m.subject}</h4>
                  <p>{m.preview}</p>
                  {m.tag && (
                    <div className={styles.itemMeta}>
                      <span className={`${styles.chip} ${m.tagType === "inquiry" ? styles.chipInquiry : ""}`}>
                        {m.tag}
                      </span>
                      <span className={styles.itemEmail}>{m.email}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.showing}>Showing 5 of 28 total inquiries</div>
          </aside>

          {/* detail */}
          <article className={styles.detail}>
            <div className={styles.detailBar}>
              <div className={styles.pills}>
                <span className={`${styles.pill} ${styles.pillNew}`}>
                  <i /> New Inquiry
                </span>
                <span className={styles.pill}>Contact Form</span>
              </div>
              <div className={styles.detailActions}>
                <button type="button" aria-label="Mark as read"><MailOpenIcon /></button>
                <span className={styles.barDivider} />
                <button type="button" className={styles.replyBtn}>
                  <ReplyIcon /> Reply
                </button>
              </div>
            </div>

            <div className={styles.sender}>
              <img src={avatarEvelyn} alt={detail.from} className={styles.senderAvatar} />
              <div className={styles.senderInfo}>
                <div className={styles.senderName}>
                  <strong>{detail.from}</strong>
                  <span>&lt;{detail.email}&gt;</span>
                </div>
                <p className={styles.senderRole}>
                  {detail.role} <b>{detail.company}</b>
                </p>
                <div className={styles.senderMeta}>
                  <span><CalendarIcon /> {detail.date}</span>
                  <span className={styles.metaDot} />
                  <span><DeviceIcon /> {detail.via}</span>
                </div>
              </div>
            </div>

            <div className={styles.body}>
              <h2>{detail.subject}</h2>
              <hr />
              <p>Hello SlowLiving Editorial Team,</p>
              <p>
                I hope this quiet morning finds you well. I've been a dedicated reader of the SlowLiving Journal for
                over two years, and your recent essay on <em>"The Architecture of Silence"</em> deeply resonated with our
                studio's philosophy.
              </p>
              <p>
                We are currently curating an architectural retrospective on mindful Scandinavian living spaces, natural
                acoustics, and slow interior design. We would be honored to explore a collaborative guest feature or
                co-curated photo essay for your upcoming winter edition.
              </p>
              <p>
                Could we arrange a brief call or email exchange next week to discuss potential themes, photography
                assets, and editorial guidelines?
              </p>
              <hr />
              <p className={styles.regards}>Warm regards,</p>
              <p className={styles.signature}>
                Evelyn Thorne
                <small>Founder &amp; Spatial Designer, Atelier Minimal</small>
                <small>Studio: The Quiet Corner, 42 Mindfulness Way, Portland</small>
              </p>
            </div>

            <div className={styles.composerWrap}>
              <div className={styles.composer}>
                <div className={styles.composerTop}>
                  <div className={styles.format}>
                    <button type="button" aria-label="Bold"><BoldIcon /></button>
                    <button type="button" aria-label="Italic"><ItalicIcon /></button>
                    <button type="button" aria-label="Link"><LinkIcon /></button>
                    <button type="button" aria-label="List"><ListIcon /></button>
                  </div>
                  <span className={styles.replyingTo}>Replying to: {detail.email}</span>
                </div>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your response to Evelyn..."
                />
                <div className={styles.composerBottom}>
                  <button type="button" className={styles.attach}>
                    <PaperclipIcon /> Attach Files
                  </button>
                  <div className={styles.sendGroup}>
                    <button type="button" className={styles.draft}>Save Draft</button>
                    <button type="button" className={styles.sendBtn}>
                      Send Reply <SendIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.composerWrap}>
              <div className={`${styles.composer} ${styles.editorWrap}`}>
                 <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  name="description"
                  onChange={newContent => setContent(newContent)}
              />
                <div className={styles.composerBottom}>
                  <button type="button" className={styles.attach}>
                  </button>
                  <div className={styles.sendGroup}>
                    <button type="button" className={styles.sendBtn}>
                      Send Reply <SendIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      {/* footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.brand}>SlowLiving Blog</span>
          <span>• Version 2.4.0 Management Portal</span>
        </div>
        <div className={styles.footerRight}>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <span>© 2024 Admin Workspace. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}