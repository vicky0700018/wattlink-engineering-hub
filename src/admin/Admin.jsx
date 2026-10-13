import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSite } from "../components/wattlink/SiteContext";
import { Button, Brand, Icon, Photo, Modal } from "../components/wattlink/UI";
import { ProjectModal } from "../components/wattlink/PublicSite";
import { routes, categories } from "../data/siteData";
import { moveEntry, validImage, validEmail } from "../data/rules";
const modules = [
  ["Overview", "grid"],
  ["Company Profile", "building"],
  ["Services", "tool"],
  ["Projects", "layers"],
  ["Gallery", "eye"],
  ["Industries", "building"],
  ["Homepage", "grid"],
  ["Our Process", "clock"],
  ["Inquiries", "mail"],
  ["Navigation & Footer", "layers"],
  ["Website Settings", "tool"],
];
export function AdminLogin() {
  const { demoAccess, setDemoAccess, settings } = useSite();
  const navigate = useNavigate();
  const [shown, setShown] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (demoAccess) navigate({ to: "/admin", replace: true });
  }, [demoAccess, navigate]);
  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("username") || !f.get("password")) {
      setError("Enter a username and password.");
      return;
    }
    if (f.get("username") === "admin" && f.get("password") === "Wattlink@123") {
      setDemoAccess(true);
      navigate({ to: "/admin", replace: true });
    } else setError("Incorrect demo username or password.");
  }
  return (
    <main className="login-page">
      <section className="login-panel">
        <Link to="/">
          <Brand text={settings.logoText} />
        </Link>
        <h1>Welcome to the workspace.</h1>
        <p>Sign in to manage your Wattlink website.</p>
        <div className="demo-notice warning">
          Frontend-only demo access. This is not secure authentication. All changes reset on
          refresh.
          <dl className="demo-credentials">
            <div><dt>Demo username</dt><dd><code>admin</code></dd></div>
            <div><dt>Demo password</dt><dd><code>Wattlink@123</code></dd></div>
          </dl>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" autoComplete="username" maxLength={100} required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                name="password"
                type={shown ? "text" : "password"}
                autoComplete="current-password"
                maxLength={100}
                required
              />
              <Button
                type="button"
                variant="icon"
                aria-label={shown ? "Hide password" : "Show password"}
                onClick={() => setShown(!shown)}
              >
                <Icon name="eye" />
              </Button>
            </div>
          </div>
          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit">
            Sign In
            <Icon name="arrow" size={17} />
          </Button>
        </form>
        <Link className="login-back" to="/">
          ← Back to website
        </Link>
      </section>
    </main>
  );
}
export function AdminDashboard() {
  const site = useSite();
  const navigate = useNavigate();
  const [module, setModule] = useState("Overview");
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!site.demoAccess) navigate({ to: "/admin/login", replace: true });
  }, [site.demoAccess, navigate]);
  if (!site.demoAccess)
    return (
      <main className="login-page">
        <p>Opening demo login…</p>
      </main>
    );
  const open = (m) => {
    setModule(m);
    setMenu(false);
  };
  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${menu ? "open" : ""}`}>
        <Link to="/">
          <Brand text={site.settings.logoText} />
        </Link>
        <div className="eyebrow">CONTENT WORKSPACE</div>
        <nav className="admin-menu" aria-label="Admin navigation">
          {modules.map(([label, icon]) => (
            <button
              className={module === label ? "active" : ""}
              key={label}
              onClick={() => open(label)}
            >
              <Icon name={icon} size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <p>Wattlink demo workspace</p>
          <p>Session-only · No permanent saving</p>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <Button
            variant="icon"
            className="admin-mobile-toggle"
            aria-label="Toggle admin menu"
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </Button>
          <h1>{module}</h1>
          <div className="admin-top-actions">
            <Button variant="outline" to="/">
              <Icon name="eye" size={15} />
              Preview Website
            </Button>
            <span className="admin-avatar">A</span>
            <Button
              variant="ghost"
              onClick={() => {
                site.setDemoAccess(false);
                navigate({ to: "/admin/login", replace: true });
              }}
            >
              <Icon name="logout" size={16} />
              Logout
            </Button>
          </div>
        </header>
        <div className="admin-content">
          <div className="demo-notice">
            Demo workspace: edits and inquiries exist in this session only and disappear on a full
            page refresh.
          </div>
          {!validEmail(site.company.email) && (
            <div className="demo-notice warning">
              The supplied company email is not valid. Correct it in Company Profile before
              production use.
            </div>
          )}
          <div className="admin-page-title">
            <h2>{module === "Overview" ? "Your website, at a glance." : module}</h2>
            <p>
              {module === "Overview"
                ? "Manage your content and keep every detail connected."
                : "Changes update the public website immediately within this session."}
            </p>
          </div>
          <AdminModule key={module} module={module} site={site} open={open} />
        </div>
      </div>
    </div>
  );
}
function AdminModule({ module, site, open }) {
  if (module === "Overview") return <Overview site={site} open={open} />;
  if (module === "Company Profile")
    return (
      <ObjectEditor
        value={site.company}
        onSave={site.setCompany}
        fields={[
          ["name", "Company Name"],
          ["description", "Company Introduction", "textarea"],
          ["address", "Address", "textarea"],
          ["phone", "Phone"],
          ["email", "Email"],
          ["vision", "Vision", "textarea"],
          ["mission", "Mission", "textarea"],
          ["values", "Core Values (one per line)", "textarea"],
          ["whyChoose", "Why Choose Wattlink"],
          ["footerDescription", "Footer Description", "textarea"],
          ["footerCredit", "Developer Credit", "readonly"],
        ]}
      />
    );
  if (module === "Homepage")
    return (
      <ObjectEditor
        value={site.homepage}
        onSave={site.setHomepage}
        fields={[
          ["headline", "Hero Headline"],
          ["description", "Hero Description", "textarea"],
          ["image", "Hero Image", "image"],
          ["primaryLabel", "Primary CTA Label"],
          ["secondaryLabel", "Secondary CTA Label"],
          ["aboutText", "About Section Text", "textarea"],
          ["aboutImage", "About Image", "image"],
          ["featuredServices", "Featured Service IDs (comma separated)"],
          ["featuredProjects", "Featured Project IDs (comma separated)"],
          ["showAbout", "Show About", "checkbox"],
          ["showServices", "Show Services", "checkbox"],
          ["showProjects", "Show Projects", "checkbox"],
          ["showIndustries", "Show Industries", "checkbox"],
          ["showProcess", "Show Process", "checkbox"],
        ]}
        extra={
          <div className="editor-hint">
            Available service IDs: {site.services.map((s) => s.id).join(", ")}
            <br />
            Project IDs: {site.projects.map((p) => p.id).join(", ")}
          </div>
        }
      />
    );
  if (module === "Website Settings")
    return (
      <ObjectEditor
        value={site.settings}
        onSave={site.setSettings}
        fields={[
          ["websiteTitle", "Website Title"],
          ["logoText", "Logo Text"],
          ["primaryColor", "Engineering Blue", "color"],
          ["navyColor", "Deep Navy", "color"],
          ["cyanColor", "Electric Cyan", "color"],
          ["orangeColor", "Safety Orange", "color"],
          ["creditVisible", "Show Developer Credit", "checkbox"],
          ["showConsultation", "Show Navbar Consultation Button", "checkbox"],
          ["adminLabel", "Admin Link Label"],
          ["defaultCategory", "Default Project Category", "category"],
        ]}
        extra={<div className="editor-hint">Contact details are managed in Company Profile.</div>}
      />
    );
  if (module === "Navigation & Footer")
    return (
      <>
        <CollectionManager
          name="Navigation"
          entries={site.navigation}
          setter={site.setNavigation}
          fields={[
            ["label", "Navigation Label"],
            ["target", "Destination", "route"],
          ]}
          titleKey="label"
        />
        <CollectionManager
          name="Footer Link"
          entries={site.footerLinks}
          setter={site.setFooterLinks}
          fields={[
            ["label", "Footer Link Label"],
            ["target", "Destination", "route"],
          ]}
          titleKey="label"
        />
        <div className="admin-panel">
          <h3>Footer contact & admin link</h3>
          <p>
            Edit contact details in Company Profile and the admin link label in Website Settings.
            Destinations are restricted to working pages.
          </p>
        </div>
      </>
    );
  if (module === "Inquiries") return <InquiryManager />;
  const config = {
    Services: [
      "services",
      "setServices",
      [
        ["title", "Service Title"],
        ["category", "Category", "category"],
        ["description", "Description", "textarea"],
        ["capabilities", "Key Capabilities (one per line)", "textarea"],
        ["image", "Service Image", "image"],
      ],
    ],
    Projects: [
      "projects",
      "setProjects",
      [
        ["title", "Project Title"],
        ["category", "Category", "category"],
        ["description", "Description", "textarea"],
        ["location", "Location"],
        ["status", "Project Status"],
        ["image", "Project Image", "image"],
        ["gallery", "Gallery Image Paths (one per line)", "gallery"],
      ],
    ],
    Gallery: [
      "gallery",
      "setGallery",
      [
        ["title", "Image Title"],
        ["description", "Description", "textarea"],
        ["category", "Category", "category"],
        ["image", "Image Path", "image"],
      ],
    ],
    Industries: [
      "industries",
      "setIndustries",
      [
        ["title", "Industry Name"],
        ["description", "Description", "textarea"],
        ["image", "Industry Image", "image"],
      ],
    ],
    "Our Process": [
      "process",
      "setProcess",
      [
        ["title", "Step Title"],
        ["description", "Description", "textarea"],
      ],
    ],
  };
  const [key, setter, fields] = config[module];
  return (
    <CollectionManager
      name={
        module === "Our Process" ? "Process Step" : module.replace(/ies$/, "y").replace(/s$/, "")
      }
      entries={site[key]}
      setter={site[setter]}
      fields={fields}
      defaultCategory={site.settings.defaultCategory}
      project={module === "Projects"}
    />
  );
}
function Overview({ site, open }) {
  const metrics = [
    ["Total Services", site.services.length, "tool"],
    ["Total Projects", site.projects.length, "layers"],
    ["Published Projects", site.projects.filter((p) => p.published).length, "eye"],
    ["Total Industries", site.industries.length, "building"],
    ["Demo Inquiries", site.inquiries.length, "mail"],
  ];
  return (
    <>
      <div className="summary-grid">
        {metrics.map(([title, value, icon]) => (
          <article className="summary-card" key={title}>
            <Icon name={icon} size={22} />
            <p>{title}</p>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <div className="overview-links">
        {["Services", "Projects", "Homepage", "Gallery", "Company Profile", "Inquiries"].map(
          (m) => (
            <Button variant="outline" key={m} onClick={() => open(m)}>
              Manage {m}
              <Icon name="arrow" size={17} />
            </Button>
          ),
        )}
      </div>
      <div className="admin-panel">
        <h3>Recent demo inquiries</h3>
        {site.inquiries.length ? (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {site.inquiries.slice(0, 5).map((i) => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.service}</td>
                    <td>
                      <span className="status-badge">{i.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No inquiries yet. Submitted contact forms will appear here during this session.</p>
        )}
      </div>
      <div className="admin-panel">
        <h3>Publishing checklist</h3>
        <p>
          Replace sample projects with verified work, confirm company contact details and legal
          policies, and replace this demo access system before production use.
        </p>
      </div>
    </>
  );
}
function EditorField({ field, value, onChange, error }) {
  const [key, label, type = "text"] = field;
  const id = `editor-${key}`;
  return (
    <div className={`field ${["textarea", "gallery", "image"].includes(type) ? "full-field" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {type === "checkbox" ? (
        <label className="checkbox-field">
          <input
            id={id}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          Enabled
        </label>
      ) : type === "route" ? (
        <select id={id} value={value || "/"} onChange={(e) => onChange(e.target.value)}>
          {routes.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      ) : type === "category" ? (
        <input
          id={id}
          list="admin-categories"
          value={value || ""}
          maxLength={100}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "textarea" || type === "gallery" ? (
        <textarea
          id={id}
          value={value || ""}
          maxLength={5000}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type === "color" ? "color" : "text"}
          value={value || ""}
          readOnly={type === "readonly"}
          maxLength={type === "image" ? 2000 : 500}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <p className="field-error">{error}</p>}
      {type === "image" && (
        <>
          <p className="editor-hint">
            Use a HTTPS image URL or an existing /images/ or bundled asset path.
          </p>
          <Photo src={validImage(value) ? value : ""} alt="Image preview" />
        </>
      )}
      {type === "gallery" && value && (
        <div className="gallery-thumbs">
          {value
            .split("\n")
            .filter(Boolean)
            .map((v, i) => (
              <Photo key={i} src={validImage(v) ? v : ""} alt={`Gallery preview ${i + 1}`} />
            ))}
        </div>
      )}
    </div>
  );
}
function validateEditor(draft, fields) {
  const errors = {};
  for (const [key, label, type] of fields) {
    const value = draft[key];
    if (type === "checkbox" || type === "readonly") continue;
    if (
      ["title", "label", "name", "headline", "logoText", "target"].includes(key) &&
      !String(value || "").trim()
    )
      errors[key] = `${label} is required.`;
    if (type === "image" && !validImage(value))
      errors[key] = "Use an existing /path or a publicly accessible HTTPS URL.";
    if (
      type === "gallery" &&
      value &&
      value
        .split("\n")
        .filter(Boolean)
        .some((v) => !validImage(v.trim()))
    )
      errors[key] = "Each image must use an existing /path or HTTPS URL.";
    if (type === "route" && !routes.includes(value)) errors[key] = "Choose a working website page.";
    if (type === "color" && !/^#[a-f0-9]{6}$/i.test(value))
      errors[key] = "Enter a six-digit hex color.";
    if (key === "email" && !validEmail(value))
      errors[key] = "Correct the supplied email to a valid address before saving.";
  }
  return errors;
}
function ObjectEditor({ value, onSave, fields, extra }) {
  const [draft, setDraft] = useState({ ...value });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  function submit(e) {
    e.preventDefault();
    const issues = validateEditor(draft, fields);
    setErrors(issues);
    if (Object.keys(issues).length) return;
    onSave(draft);
    setSaved(true);
  }
  return (
    <form className="admin-panel editor-form" onSubmit={submit}>
      <datalist id="admin-categories">
        {categories.slice(1).map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <div className="form-grid">
        {fields.map((f) => (
          <EditorField
            key={f[0]}
            field={f}
            value={draft[f[0]]}
            error={errors[f[0]]}
            onChange={(v) => {
              setDraft({ ...draft, [f[0]]: v });
              setSaved(false);
            }}
          />
        ))}
      </div>
      {extra}
      <div className="editor-actions">
        {saved && (
          <span className="saved-message" role="status">
            Changes applied for this session.
          </span>
        )}
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            setDraft({ ...value });
            setErrors({});
            setSaved(false);
          }}
        >
          Reset Form
        </Button>
        <Button type="submit">
          Apply Changes
          <Icon name="check" size={17} />
        </Button>
      </div>
    </form>
  );
}
function CollectionManager({
  name,
  entries,
  setter,
  fields,
  titleKey = "title",
  defaultCategory = "Electrical",
  project = false,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [draft, setDraft] = useState(null);
  const [errors, setErrors] = useState({});
  const [deleteItem, setDeleteItem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const hasImage = fields.some((f) => f[2] === "image");
  function add() {
    setDraft(
      Object.fromEntries([
        ["id", crypto.randomUUID()],
        ["published", true],
        ...fields.map(([key, , type]) => [
          key,
          key === "category"
            ? defaultCategory
            : key === "target"
              ? "/"
              : key === "status"
                ? "Concept / demo"
                : "",
        ]),
      ]),
    );
    setErrors({});
  }
  function save(e) {
    e.preventDefault();
    const issues = validateEditor(draft, fields);
    setErrors(issues);
    if (Object.keys(issues).length) return;
    const trimmed = { ...draft };
    for (const [key, , type] of fields)
      if (typeof trimmed[key] === "string" && type !== "readonly")
        trimmed[key] = trimmed[key].trim();
    setter((previous) =>
      previous.some((p) => p.id === draft.id)
        ? previous.map((p) => (p.id === draft.id ? trimmed : p))
        : [...previous, trimmed],
    );
    setDraft(null);
    setMessage("Content applied for this session.");
  }
  const filtered = entries.filter(
    (p) =>
      String(p[titleKey] || "")
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "All" || (filter === "Published" ? p.published : !p.published)),
  );
  return (
    <div className="collection-manager">
      <div className="admin-toolbar">
        <div className="admin-search">
          <Icon name="search" size={17} />
          <input
            aria-label={`Search ${name}`}
            placeholder={`Search ${name.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          aria-label={`${name} visibility filter`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <Button onClick={add}>
          <Icon name="plus" size={16} />
          Add {name}
        </Button>
      </div>
      {message && (
        <p className="saved-message" role="status">
          {message}
        </p>
      )}
      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{name}</th>
              {fields.some((f) => f[0] === "category") && <th>Category</th>}
              <th>Visibility</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="table-title">
                    {hasImage && <Photo src={p.image} alt={p[titleKey]} />}
                    <div>
                      <strong>{p[titleKey]}</strong>
                      <small>{p.target || p.id}</small>
                    </div>
                  </div>
                </td>
                {fields.some((f) => f[0] === "category") && <td>{p.category}</td>}
                <td>
                  <label className="toggle-publish">
                    <input
                      type="checkbox"
                      checked={p.published}
                      onChange={() =>
                        setter((previous) =>
                          previous.map((x) =>
                            x.id === p.id ? { ...x, published: !x.published } : x,
                          ),
                        )
                      }
                    />
                    <span className={`status-badge ${p.published ? "" : "draft"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </label>
                </td>
                <td>
                  <div className="table-actions">
                    <Button
                      variant="icon"
                      title="Move up"
                      aria-label={`Move ${p[titleKey]} up`}
                      disabled={entries[0]?.id === p.id}
                      onClick={() => setter((previous) => moveEntry(previous, p.id, -1))}
                    >
                      <Icon name="up" size={16} />
                    </Button>
                    <Button
                      variant="icon"
                      title="Move down"
                      aria-label={`Move ${p[titleKey]} down`}
                      disabled={entries.at(-1)?.id === p.id}
                      onClick={() => setter((previous) => moveEntry(previous, p.id, 1))}
                    >
                      <Icon name="down" size={16} />
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <Button
                      variant="icon"
                      title="Preview"
                      aria-label={`Preview ${p[titleKey]}`}
                      onClick={() => setPreview(p)}
                    >
                      <Icon name="eye" size={16} />
                    </Button>
                    <Button
                      variant="icon"
                      title="Edit"
                      aria-label={`Edit ${p[titleKey]}`}
                      onClick={() => {
                        setDraft({ ...p });
                        setErrors({});
                      }}
                    >
                      <Icon name="edit" size={16} />
                    </Button>
                    <Button
                      variant="icon"
                      title="Delete"
                      aria-label={`Delete ${p[titleKey]}`}
                      onClick={() => setDeleteItem(p)}
                    >
                      <Icon name="trash" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && (
          <div className="empty-state">No {name.toLowerCase()} entries found.</div>
        )}
      </div>
      {draft && (
        <Modal
          title={`${entries.some((p) => p.id === draft.id) ? "Edit" : "Add"} ${name}`}
          onClose={() => setDraft(null)}
        >
          <form className="editor-form" onSubmit={save}>
            <datalist id="admin-categories">
              {categories.slice(1).map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <div className="form-grid">
              {fields.map((f) => (
                <EditorField
                  key={f[0]}
                  field={f}
                  value={draft[f[0]]}
                  error={errors[f[0]]}
                  onChange={(v) => setDraft({ ...draft, [f[0]]: v })}
                />
              ))}
            </div>
            <div className="editor-actions">
              <Button variant="outline" type="button" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">Apply Changes</Button>
            </div>
          </form>
        </Modal>
      )}
      {deleteItem && (
        <Modal title={`Delete ${name}?`} onClose={() => setDeleteItem(null)}>
          <p>Remove “{deleteItem[titleKey]}” from this session? This action cannot be undone.</p>
          <div className="editor-actions">
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setter((previous) => previous.filter((p) => p.id !== deleteItem.id));
                setDeleteItem(null);
              }}
            >
              Delete Entry
            </Button>
          </div>
        </Modal>
      )}
      {preview &&
        (project ? (
          <ProjectModal project={preview} onClose={() => setPreview(null)} />
        ) : (
          <Modal title={preview[titleKey]} onClose={() => setPreview(null)}>
            {hasImage && <Photo src={preview.image} alt={preview[titleKey]} />}
            <div className="modal-body">
              <p>{preview.description || preview.target}</p>
              {preview.capabilities && (
                <ul className="capability-list">
                  {preview.capabilities.split("\n").map((c) => (
                    <li key={c}>
                      <Icon name="check" size={15} />
                      {c}
                    </li>
                  ))}
                </ul>
              )}
              <p>{preview.published ? "Published" : "Draft"} · Preview</p>
            </div>
          </Modal>
        ))}
    </div>
  );
}
function InquiryManager() {
  const { inquiries, setInquiries } = useSite();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const visible = inquiries.filter(
    (i) =>
      `${i.name} ${i.email} ${i.company} ${i.details}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "All" || i.service === filter),
  );
  return (
    <>
      <div className="admin-toolbar">
        <div className="admin-search">
          <Icon name="search" size={17} />
          <input
            aria-label="Search inquiries"
            placeholder="Search inquiries…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          aria-label="Filter inquiries by service"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          {[...new Set(inquiries.map((i) => i.service))].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((i) => (
              <tr key={i.id}>
                <td>
                  <strong>{i.name}</strong>
                  <br />
                  {i.email}
                </td>
                <td>{i.service}</td>
                <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    aria-label={`Status for ${i.name}`}
                    value={i.status}
                    onChange={(e) =>
                      setInquiries((previous) =>
                        previous.map((x) => (x.id === i.id ? { ...x, status: e.target.value } : x)),
                      )
                    }
                  >
                    {["New", "Contacted", "Closed"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="table-actions">
                    <Button
                      variant="icon"
                      aria-label={`View inquiry from ${i.name}`}
                      onClick={() => setSelected(i)}
                    >
                      <Icon name="eye" size={17} />
                    </Button>
                    <Button
                      variant="icon"
                      aria-label={`Delete inquiry from ${i.name}`}
                      onClick={() => setDeleteItem(i)}
                    >
                      <Icon name="trash" size={17} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!visible.length && (
          <div className="empty-state">
            No demo inquiries found. Submit the public contact form to create one.
          </div>
        )}
      </div>
      {selected && (
        <Modal title={`Inquiry from ${selected.name}`} onClose={() => setSelected(null)}>
          <div className="modal-body">
            {[
              ["Company", selected.company || "Not provided"],
              ["Email", selected.email],
              ["Phone", selected.phone],
              ["Service", selected.service],
              ["Project Location", selected.location],
              ["Project Details", selected.details],
            ].map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong>
                <br />
                {value}
              </p>
            ))}
          </div>
        </Modal>
      )}
      {deleteItem && (
        <Modal title="Delete demo inquiry?" onClose={() => setDeleteItem(null)}>
          <p>Remove the inquiry from {deleteItem.name}?</p>
          <div className="editor-actions">
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setInquiries((p) => p.filter((i) => i.id !== deleteItem.id));
                setDeleteItem(null);
              }}
            >
              Delete Inquiry
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
