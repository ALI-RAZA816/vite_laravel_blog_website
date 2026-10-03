import { useMemo, useRef, useState } from "react";
import styles from "../assets/AdminMessage.module.css";
import JoditEditor from "jodit-react";
import { useContact } from "../Context/ContactContext";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import NoMessage from "../components/NoMessage";



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

const SendIcon = () => (
  <Icon size={16}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4z" />
  </Icon>
);

const detail = {
  from: "Evelyn Thorne",
  email: "evelyn@slowliving.com",
  via: "Sent via slowlivingblog.com/contact",
  subject: "Collaboration on mindful interior essay",
};



/* ---------- component ---------- */
export default function ContactMessages({placeholder}) {

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
    fetchSingleMessage,singleMessage
  } = useContact();
  const unreadCount = totalMessages.filter(item => item.status === 'unread');
  const stats = [
    { id: 1, label: "Total Inquiries", value: totalMessages.length <= 1000 ? `${totalMessages.length}` : `${(totalMessages.length/1000).toFixed(1)}k`, icon: <InboxIcon /> },
    { id: 2, label: "Unread Messages", value: unreadCount.length <= 1000 ? `${unreadCount.length}` : `${(unreadCount.length/1000).toFixed(1)}k`, badge: "New", icon: <MailIcon />, accent: true },
    { id: 3, label: "Avg Response Time", value: responseAvg ? `${responseAvg.toFixed(1)} hrs` : "N/A", icon: <ClockIcon /> },
  ];

  const tabs = [
    { key: "all", label: "All", count: messages.length },
    { key: "unread", label: "Unread", count: unreadCount.length },
  ];
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
  const editor = useRef(null);

  const visible = activeTab === "unread" ? messages.filter((m) => m.status === 'unread') : messages;

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

            {spinnerLoader ? (
                  <div style={{height:'480px'}} className="d-flex justify-content-center align-items-center"><LoadingSpinner /></div>
              ) :visible.length === 0 ? (<div className="p-3"><NoMessage/></div>) :<ul className={styles.items}>
              {visible.map((m) => (
                <li
                  key={m.id}
                  className={`${styles.item} ${selectedId === m.id ? styles.itemActive : ""}`}
                  onClick={() => {setSelectedId(m.id), fetchSingleMessage(m.id)}}
                >
                  <div className={styles.itemActions}>
                    {/* <button > */}
                      {m.status !== 'unread' ? <button  onClick={(event)=> {
                        event.stopPropagation();
                        markAsUnread(m.id);
                      }} ><MailOpenIcon  /></button>  : <button onClick={(event)=> {
                        event.stopPropagation();
                        markAsRead(m.id);
                      }}><MailIcon/></button> }
                    {/* </button> */}
                    <button type="button" aria-label="Delete message" onClick={(event) => {
                      event.stopPropagation();
                      deleteMessage(m.id);
                    }}>
                      <TrashIcon />
                    </button>
                  </div>
                  <div className={styles.itemTop}>
                    <span className={styles.itemName}>
                      {m.status === 'unread' && <i className={styles.unreadDot} />}
                      {m.name}
                      {m.status === 'unread' && <span className="badge bg-primary">Unread</span>}
                    </span>
                    <span className={styles.itemTime}>{m.date}</span>
                  </div>
                  <h4>{m.subject.length >= 20 ? `${m.subject.substring(0, 20)}...` : m.subject}</h4>
                  <p>{m.message.length >= 100 ? `${m.message.substring(0, 40)}...` : m.message}</p>
                  {m.email && (
                    <div className={styles.itemMeta}>
                      <span className={`${styles.chip} ${m.tagType === "inquiry" ? styles.chipInquiry : ""}`}>
                        {m.email}
                      </span>
                      <span className={`${styles.chip} ${m.tagType === "inquiry" ? styles.chipInquiry : ""}`}>
                        {m.reply === 'replied' ? "Replied" : "Not Replied"}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>}

            <div className={styles.showingRow}>
              <button
                type="button"
                onClick={()=> setPage(messagesPagination.currentPage - 1)} disabled={messagesPagination.currentPage <= 1}
                className={styles.chevronBtn}
              >
                <FaAngleLeft />
              </button>

              <div className={styles.showing}>Showing {messagesPagination.from} to {messagesPagination.to} of {messagesPagination.total} total inquiries</div>

              <button
                type="button"
                onClick={()=> setPage(messagesPagination.currentPage + 1)} disabled={messagesPagination.currentPage === messagesPagination.lastPage}
                className={styles.chevronBtn}
              >
                <FaChevronRight />
              </button>
            </div>
          </aside>

          {/* detail */}
          {selectedId && (
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
              <div className={styles.senderInfo}>
                <div className={styles.senderName}>
                  <strong>{singleMessage.name}</strong>
                  <span>&lt;{singleMessage.email}&gt;</span>
                </div>
                <div className={styles.senderMeta}>
                  <span><DeviceIcon /> {detail.via}</span><br/>
                  <strong>Subject: {singleMessage.subject}</strong>
                </div>
              </div>
            </div>

            <div className={styles.body}>
              <p>{singleMessage.message}</p>
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
                    <button onClick={sendReply} type="button" className={styles.sendBtn}>
                      Send Reply <SendIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>)}
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