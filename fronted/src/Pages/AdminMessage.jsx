import { useMemo, useRef, useState } from "react";
import styles from "../assets/AdminMessage.module.css";
import JoditEditor from "jodit-react";
import { useContact } from "../Context/ContactContext";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import NoMessage from "../components/NoMessage";

/* ---------- tiny inline icons ---------- */
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
const DeviceIcon = () => (
  <Icon size={16}>
    <rect x="2" y="5" width="14" height="11" rx="1.5" />
    <rect x="14" y="9" width="8" height="12" rx="1.5" />
  </Icon>
);
const SendIcon = () => (
  <Icon size={16}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </Icon>
);

const formatCount = (n) => (n <= 1000 ? `${n}` : `${(n / 1000).toFixed(1)}k`);
const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* ---------- component ---------- */
export default function ContactMessages({ placeholder }) {
  const {
    messages,
    deleteMessage,
    markAsRead,
    selectedId,
    setSelectedId,
    markAsUnread,
    sendReply,
    content,
    setPage,
    messagesPagination,
    totalMessages,
    setContent,
    responseAvg,
    spinnerLoader,
    fetchSingleMessage,
    singleMessage,
  } = useContact();

  const [activeTab, setActiveTab] = useState("all");
  const editor = useRef(null);

  const unreadCount = totalMessages.filter((item) => item.status === "unread");

  const stats = [
    { id: 1, label: "Total inquiries", value: formatCount(totalMessages.length), icon: <InboxIcon /> },
    { id: 2, label: "Unread", value: formatCount(unreadCount.length), badge: "New", icon: <MailIcon /> },
    { id: 3, label: "Average response time", value: responseAvg ? `${responseAvg.toFixed(1)} hrs` : "N/A", icon: <ClockIcon /> },
  ];

  const tabs = [
    { key: "all", label: "All", count: messages.length },
    { key: "unread", label: "Unread", count: unreadCount.length },
  ];

  const config = useMemo(
    () => ({
      readonly: false,
      height: 220,
      statusbar: false,
      placeholder: placeholder || "Write your reply",
      buttons: ["bold", "italic", "underline", "|", "fontsize", "|", "ul", "source"],
    }),
    [placeholder]
  );

  const visible =
    activeTab === "unread" ? messages.filter((m) => m.status === "unread") : messages;

  const selected = singleMessage || {};

  const openMessage = (id) => {
    setSelectedId(id);
    fetchSingleMessage(id);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* heading */}
        <div className={styles.heading}>
          <h1>Contact messages</h1>
          <p>Read and reply to inquiries sent from your Contact page.</p>
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
              <span className={styles.statIcon}>{s.icon}</span>
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

            {spinnerLoader ? (
              <div style={{ height: "480px" }} className="d-flex justify-content-center align-items-center">
                <LoadingSpinner />
              </div>
            ) : visible.length === 0 ? (
              <div className="p-3">
                <NoMessage />
              </div>
            ) : (
              <ul className={styles.items}>
                {visible.map((m) => {
                  const isUnread = m.status === "unread";
                  return (
                    <li
                      key={m.id}
                      className={`${styles.item} ${isUnread ? styles.itemUnread : ""} ${
                        selectedId === m.id ? styles.itemActive : ""
                      }`}
                      onClick={() => openMessage(m.id)}
                    >
                      <div className={styles.itemActions}>
                        <button
                          type="button"
                          aria-label={isUnread ? "Mark as read" : "Mark as unread"}
                          onClick={(e) => {
                            e.stopPropagation();
                            isUnread ? markAsRead(m.id) : markAsUnread(m.id);
                          }}
                        >
                          {isUnread ? <MailIcon /> : <MailOpenIcon />}
                        </button>
                        <button
                          type="button"
                          aria-label="Delete message"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(m.id);
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      <div className={styles.itemTop}>
                        <span className={styles.itemName}>
                          {m.name}
                          {isUnread && <span className={styles.unreadBadge}>Unread</span>}
                        </span>
                        <span className={styles.itemTime}>{m.date}</span>
                      </div>
                      <h4>{m.subject}</h4>
                      <p>{m.message}</p>
                      {m.email && (
                        <div className={styles.itemMeta}>
                          {m.email} &nbsp;•&nbsp;{" "}
                          <span className={m.reply === "replied" ? styles.replied : ""}>
                            {m.reply === "replied" ? "Replied" : "Not replied"}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            <div className={styles.showingRow}>
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage(messagesPagination.currentPage - 1)}
                disabled={messagesPagination.currentPage <= 1}
                className={styles.chevronBtn}
              >
                <FaAngleLeft />
              </button>

              <div className={styles.showing}>
                {messagesPagination.from} to {messagesPagination.to} of {messagesPagination.total} inquiries
              </div>

              <button
                type="button"
                aria-label="Next page"
                onClick={() => setPage(messagesPagination.currentPage + 1)}
                disabled={messagesPagination.currentPage === messagesPagination.lastPage}
                className={styles.chevronBtn}
              >
                <FaChevronRight />
              </button>
            </div>
          </aside>

          {/* detail */}
          <article className={styles.detail}>
            {!selectedId ? (
              <div className={styles.placeholder}>Select a message to read it</div>
            ) : (
              <>
                <div className={styles.detailBar}>
                  <span className={styles.detailTag}>Contact form</span>
                  <div className={styles.detailActions}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      aria-label="Mark as unread"
                      onClick={() => markAsUnread(selectedId)}
                    >
                      <MailOpenIcon />
                    </button>
                    <button
                      type="button"
                      className={styles.btnInk}
                      onClick={() => editor.current?.editor?.selection?.focus()}
                    >
                      <ReplyIcon /> Reply
                    </button>
                  </div>
                </div>

                <div className={styles.sender}>
                  <div className={styles.avatar}>{initials(selected.name)}</div>
                  <div className={styles.senderInfo}>
                    <strong>{selected.name}</strong>
                    <span>{selected.email}</span>
                  </div>
                </div>

                <h2 className={styles.subject}>{selected.subject}</h2>
                <div className={styles.via}>
                  <DeviceIcon /> Sent via slowlivingblog.com/contact
                </div>

                <div className={styles.body}>
                  <p>{selected.message}</p>
                </div>

                <div className={styles.composerWrap}>
                  <div className={`${styles.composer} ${styles.editorWrap}`}>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      name="description"
                      onChange={(newContent) => setContent(newContent)}
                    />
                    <div className={styles.composerBottom}>
                      <button onClick={sendReply} type="button" className={styles.btnInk}>
                        <SendIcon /> Send reply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </article>
        </section>
      </main>

      {/* footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.brand}>SlowLiving Blog</span>
          <span>Version 2.4.0 Management Portal</span>
        </div>
        <div className={styles.footerRight}>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <span>© 2026 Admin Workspace</span>
        </div>
      </footer>
    </div>
  );
}