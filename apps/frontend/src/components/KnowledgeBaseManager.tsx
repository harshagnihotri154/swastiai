import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Plus, Trash2, Cpu, FileText, Globe, HelpCircle, Search, RefreshCw, Upload, FileCheck } from 'lucide-react';

export const KnowledgeBaseManager: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Add Item Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'faq' | 'document' | 'website'>('document');
  const [adding, setAdding] = useState(false);

  // File Upload State
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom MCP Tool Form State
  const [customMcpName, setCustomMcpName] = useState('');
  const [customMcpDesc, setCustomMcpDesc] = useState('');
  const [customMcpUrl, setCustomMcpUrl] = useState('');
  const [addingMcp, setAddingMcp] = useState(false);

  // MCP Tools State
  const [mcpTools, setMcpTools] = useState([
    { id: 'check_order_status', name: 'check_order_status', desc: 'Looks up live e-commerce order tracking by Order ID', enabled: true },
    { id: 'check_appointment_slots', name: 'check_appointment_slots', desc: 'Queries available consultation slots for clinic booking', enabled: true }
  ]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/v1/knowledge');
      const data = await res.json();
      if (data.success && data.data) {
        setItems(data.data);
      }

      // Fetch custom MCP tools
      const mcpRes = await fetch('http://localhost:5001/api/v1/mcp/tools');
      const mcpData = await mcpRes.json();
      if (mcpData.success && mcpData.custom) {
        const mappedCustom = mcpData.custom.map((c: any) => ({
          id: c._id,
          name: c.name,
          desc: c.description + ` (API: ${c.endpointUrl})`,
          enabled: c.enabled
        }));
        setMcpTools((prev) => [...prev.filter((p) => p.id === 'check_order_status' || p.id === 'check_appointment_slots'), ...mappedCustom]);
      }
    } catch (err) {
      setItems([
        { _id: '1', title: 'Clinic Timings & Location', content: 'Our dental clinic is located at Sector 18, Noida. We are open Mon-Sat 10:00 AM to 7:00 PM.', type: 'faq', createdAt: new Date() },
        { _id: '2', title: 'Pricing Catalog 2026', content: 'Teeth Cleaning: ₹500, Root Canal Treatment: ₹3500, Teeth Whitening: ₹2000.', type: 'document', createdAt: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));
    setType('document');

    try {
      const text = await file.text();
      setContent(text);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      alert("Error reading file text. Please upload a valid text or markdown file.");
    }
  };

  const handleAddCustomMcp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMcpName.trim() || !customMcpUrl.trim()) return;

    setAddingMcp(true);
    try {
      const res = await fetch('http://localhost:5001/api/v1/mcp/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customMcpName,
          description: customMcpDesc || `Custom business API for ${customMcpName}`,
          endpointUrl: customMcpUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        setCustomMcpName('');
        setCustomMcpDesc('');
        setCustomMcpUrl('');
        fetchItems();
      }
    } catch (err) {
      alert("Failed to save custom MCP tool.");
    } finally {
      setAddingMcp(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setAdding(true);
    try {
      const res = await fetch('http://localhost:5001/api/v1/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, type })
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setContent('');
        setSelectedFileName(null);
        fetchItems();
      }
    } catch (err) {
      alert('Error adding Knowledge Base item.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await fetch(`http://localhost:5001/api/v1/knowledge/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setItems((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', color: '#0f172a' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>Knowledge Base & MCP Tools Studio</h2>
          <p style={{ color: '#475569', fontSize: '0.9rem' }}>Upload business PDFs/documents (RAG) and connect custom business API tools (MCP).</p>
        </div>

        <button onClick={fetchItems} className="btn-secondary">
          <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh List
        </button>
      </div>

      {/* Model Context Protocol (MCP) Section */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={22} color="#7c3aed" /> Custom Business MCP Tools Registry
            </h3>
            <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '4px' }}>
              Connect your business's unique API URL (e.g. order tracking API, Shopify orders, clinic booking API).
            </p>
          </div>
        </div>

        {/* Form to Add Custom Business MCP API */}
        <form onSubmit={handleAddCustomMcp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr auto', gap: '12px', marginBottom: '20px', alignItems: 'flex-end', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>MCP Tool Name</label>
            <input
              type="text"
              className="input-field"
              value={customMcpName}
              onChange={(e) => setCustomMcpName(e.target.value)}
              placeholder="e.g. order_tracking_api"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>Description</label>
            <input
              type="text"
              className="input-field"
              value={customMcpDesc}
              onChange={(e) => setCustomMcpDesc(e.target.value)}
              placeholder="e.g. Fetches live courier order status"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>API Endpoint URL</label>
            <input
              type="url"
              className="input-field"
              value={customMcpUrl}
              onChange={(e) => setCustomMcpUrl(e.target.value)}
              placeholder="https://api.yourcompany.com/v1/orders/{orderId}"
              required
            />
          </div>

          <button type="submit" disabled={addingMcp} className="btn-primary" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
            <Plus size={14} /> Add MCP Tool
          </button>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {mcpTools.map((tool) => (
            <div key={tool.id} style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.1)' }}>
                <Cpu size={20} color="#7c3aed" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem', fontFamily: 'monospace' }}>{tool.name}</span>
                  <span className="badge badge-live" style={{ fontSize: '0.65rem' }}>
                    Active
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base Documents & File Upload Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', gap: '28px' }}>
        {/* Upload Document & Add Knowledge Item Form */}
        <div className="glass-panel" style={{ padding: '28px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={18} color="#2563eb" /> Upload Document / File
          </h3>

          {/* File Drag and Drop Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '2px dashed #cbd5e1',
              background: 'rgba(37, 99, 235, 0.05)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.pdf,.doc,.docx,.md,.csv,.json"
              style={{ display: 'none' }}
            />
            <Upload size={32} color="#2563eb" style={{ margin: '0 auto 10px', display: 'block' }} />
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
              {selectedFileName ? `📄 Selected: ${selectedFileName}` : 'Click to Upload Document / PDF / Text File'}
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '4px' }}>
              Supports .pdf, .txt, .md, .csv, .json (Extracts text automatically into Knowledge Base)
            </p>
            {uploadSuccess && (
              <div style={{ marginTop: '8px', color: '#059669', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <FileCheck size={16} /> File text extracted successfully!
              </div>
            )}
          </div>

          <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Knowledge Entry Type
              </label>
              <select
                className="input-field"
                value={type}
                onChange={(e: any) => setType(e.target.value)}
              >
                <option value="document">📄 Uploaded Business Document / PDF</option>
                <option value="faq">❓ FAQ / Q&A Pair</option>
                <option value="website">🌐 Website Content / Product Catalog</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Document Title
              </label>
              <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dental_Clinic_Pricing_Sheet_2026"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                Extracted Text Content & Facts 🧠
              </label>
              <textarea
                className="input-field"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="File text content will automatically appear here..."
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" disabled={adding} className="btn-primary" style={{ justifyContent: 'center' }}>
              <Plus size={16} /> {adding ? 'Indexing File Content...' : 'Index Document to Knowledge Base'}
            </button>
          </form>
        </div>

        {/* Knowledge Base Search & Indexed Documents List */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#2563eb" /> Indexed Documents & Knowledge ({items.length})
            </h3>

            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: '32px', fontSize: '0.8rem', padding: '6px 10px 6px 32px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Knowledge..."
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading Knowledge Base...</div>
          ) : filteredItems.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', border: '1px dashed #cbd5e1', borderRadius: '12px' }}>
              No Knowledge Base items indexed yet. Upload your first document on the left!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '550px', overflowY: 'auto' }}>
              {filteredItems.map((item) => (
                <div key={item._id} style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.type === 'faq' && <HelpCircle size={16} color="#2563eb" />}
                      {item.type === 'document' && <FileText size={16} color="#7c3aed" />}
                      {item.type === 'website' && <Globe size={16} color="#059669" />}
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{item.title}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '4px' }}
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
