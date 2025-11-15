import { useState } from 'react';
import { Brain, FileCheck, Shield, AlertTriangle, TrendingUp, Loader2, CheckCircle, XCircle, Download, RefreshCw } from 'lucide-react';

const PolicyAnalyzer = () => {
  const [policyText, setPolicyText] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [industry, setIndustry] = useState('fintech');
  const [language, setLanguage] = useState('en');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const industries = [
    'fintech', 'banking', 'healthcare', 'ecommerce', 
    'telecom', 'education', 'government', 'other'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pidgin', name: 'Nigerian Pidgin' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'ha', name: 'Hausa' }
  ];

  // ========== MAIN ANALYSIS FUNCTION ==========
  const analyzePolicy = async () => {
    console.log('🚀 analyzePolicy function called!');
    console.log('Organization:', organizationName);
    console.log('Policy length:', policyText.length);

    if (!policyText.trim() || !organizationName.trim()) {
      setError('Please provide both policy text and organization name');
      return;
    }

    if (policyText.length < 100) {
      setError('Policy text too short. Minimum 100 characters required.');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const payload = {
        organizationName: organizationName.trim(),
        policyText: policyText.trim()
      };

      console.log('📤 Sending payload:', payload);
      console.log('📤 Method: POST');
      console.log('📤 URL: http://localhost:5000/api/v1/analyze-policy');

      const response = await fetch('http://localhost:5000/api/v1/analyze-policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);

      const data = await response.json();
      console.log('📥 Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Analysis failed');
      }

      console.log('✅ Analysis received successfully');
      setAnalysis(data);
      setError(null);
    } catch (err) {
      console.error('❌ Error caught:', err);
      setError(err.message || 'Failed to analyze policy. Make sure the backend is running on http://localhost:5000');
      setAnalysis(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRecommendations = async () => {
    if (!analysis) return;
    setShowRecommendations(true);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'linear-gradient(to right, #22c55e, #10b981)';
    if (score >= 70) return 'linear-gradient(to right, #eab308, #f97316)';
    if (score >= 50) return 'linear-gradient(to right, #f97316, #ef4444)';
    return 'linear-gradient(to right, #ef4444, #ec4899)';
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return { text: 'Excellent', color: '#4ade80' };
    if (score >= 70) return { text: 'Good', color: '#facc15' };
    if (score >= 50) return { text: 'Fair', color: '#fb923c' };
    return { text: 'Poor', color: '#f87171' };
  };

  const getStatusStyles = (status) => {
    const styles = {
      compliant: { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.5)' },
      partially_compliant: { bg: 'rgba(234, 179, 8, 0.2)', text: '#facc15', border: 'rgba(234, 179, 8, 0.5)' },
      non_compliant: { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', border: 'rgba(239, 68, 68, 0.5)' }
    };
    return styles[status] || styles.non_compliant;
  };

  const exportAnalysis = () => {
    if (!analysis) return;
    
    const exportData = {
      organization: organizationName,
      industry,
      analysisDate: new Date().toISOString(),
      analysis
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${organizationName.replace(/\s+/g, '_')}_NDPR_Analysis.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <Brain size={40} color="#c084fc" />
            <h1 style={styles.headerTitle}>AI Policy Analyzer</h1>
          </div>
          <p style={styles.headerSubtitle}>NDPR Compliance Analysis powered by Groq AI</p>
        </div>

        {/* Input Section */}
        {!analysis && (
          <div style={styles.inputCard}>
            <div style={styles.inputGrid}>
              <div style={styles.inputRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Organization Name *</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g., QuickCredit Nigeria"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Industry *</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    style={styles.select}
                  >
                    {industries.map(ind => (
                      <option key={ind} value={ind}>
                        {ind.charAt(0).toUpperCase() + ind.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Privacy Policy Text *</label>
                <textarea
                  value={policyText}
                  onChange={(e) => setPolicyText(e.target.value)}
                  placeholder="Paste the complete privacy policy here..."
                  rows={12}
                  style={styles.textarea}
                />
                <div style={styles.charCount}>
                  <p style={styles.charCountText}>
                    {policyText.length} characters {policyText.length < 100 && '(minimum 100 required)'}
                  </p>
                  {policyText.length >= 100 && (
                    <span style={styles.charCountOk}>✓ Length OK</span>
                  )}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Analysis Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.select}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div style={styles.errorCard}>
                  <XCircle size={20} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={styles.errorText}>{error}</p>
                </div>
              )}

              <AnalyzeButton
                onClick={analyzePolicy}
                disabled={analyzing || policyText.length < 100 || !organizationName.trim()}
                analyzing={analyzing}
              />
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div style={styles.resultsContainer}>
            {/* Action Buttons */}
            <div style={styles.actionBar}>
              <ActionButton
                onClick={() => {
                  setAnalysis(null);
                  setRecommendations(null);
                  setShowRecommendations(false);
                }}
                icon={RefreshCw}
                label="Analyze Another Policy"
                color="#475569"
                hoverColor="#64748b"
              />
              <ActionButton
                onClick={exportAnalysis}
                icon={Download}
                label="Export Report"
                color="#2563eb"
                hoverColor="#3b82f6"
              />
            </div>

            {/* Compliance Score Card */}
            <div style={styles.scoreCard}>
              <div style={styles.scoreHeader}>
                <div>
                  <h2 style={styles.scoreTitle}>NDPR Compliance Score</h2>
                  <p style={styles.scoreOrg}>{organizationName}</p>
                  <p style={styles.scoreIndustry}>Industry: {industry}</p>
                </div>
                <Shield size={48} color="#c084fc" />
              </div>

              <div style={styles.scoreDisplay}>
                <div style={{
                  ...styles.scoreNumber,
                  background: getScoreColor(analysis.ndprScore),
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>
                  {analysis.ndprScore}
                </div>
                <div style={styles.scoreOutOf}>/100</div>
                <div style={{
                  ...styles.scoreLabel,
                  color: getScoreLabel(analysis.ndprScore).color
                }}>
                  {getScoreLabel(analysis.ndprScore).text}
                </div>
              </div>

              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    background: getScoreColor(analysis.ndprScore),
                    width: `${analysis.ndprScore}%`
                  }}
                />
              </div>

              <p style={styles.scoreAssessment}>{analysis.summary}</p>
            </div>

            {/* Summary */}
            <div style={styles.summaryCard}>
              <h3 style={styles.sectionTitle}>
                <FileCheck size={24} color="#60a5fa" />
                Analysis Summary
              </h3>
              <p style={styles.summaryText}>{analysis.summary}</p>
            </div>

            {/* Data Collected */}
            {analysis.dataCollected && (
              <div style={styles.summaryCard}>
                <h3 style={styles.sectionTitle}>Data Collected</h3>
                <ul style={styles.summaryList}>
                  {analysis.dataCollected.map((item, idx) => (
                    <li key={idx} style={styles.summaryListItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Flags */}
            {analysis.red_flags && analysis.red_flags.length > 0 && (
              <div style={styles.riskCard}>
                <h3 style={styles.sectionTitle}>
                  <AlertTriangle size={24} color="#f87171" />
                  Risk Flags ({analysis.red_flags.length})
                </h3>
                <div style={styles.riskList}>
                  {analysis.red_flags.map((flag, idx) => (
                    <RiskFlag key={idx} flag={flag} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div style={styles.recommendationsCard}>
                <h3 style={styles.sectionTitle}>
                  <TrendingUp size={24} color="#4ade80" />
                  Recommendations
                </h3>
                <ul style={styles.strengthsList}>
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx} style={styles.strengthItem}>
                      <CheckCircle size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                      <span style={styles.strengthText}>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* User Rights */}
            {analysis.user_rights && analysis.user_rights.length > 0 && (
              <div style={styles.strengthsCard}>
                <h3 style={styles.sectionTitle}>
                  <CheckCircle size={24} color="#4ade80" />
                  Your Rights
                </h3>
                <ul style={styles.strengthsList}>
                  {analysis.user_rights.map((right, idx) => (
                    <li key={idx} style={styles.strengthItem}>
                      <CheckCircle size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                      <span style={styles.strengthText}>{right}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== BUTTON COMPONENTS ==========
const AnalyzeButton = ({ onClick, disabled, analyzing }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    console.log('🖱️  Button clicked!');
    e.preventDefault();
    if (!disabled && onClick) {
      console.log('📞 Calling onClick handler');
      onClick();
    } else {
      console.log('⚠️  Button disabled or no onClick handler');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      style={{
        ...styles.analyzeButton,
        background: disabled 
          ? 'linear-gradient(to right, #4b5563, #374151)' 
          : (isHovered 
            ? 'linear-gradient(to right, #a855f7, #ec4899)' 
            : 'linear-gradient(to right, #9333ea, #db2777)'),
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {analyzing ? (
        <>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
          Analyzing with AI...
        </>
      ) : (
        <>
          <Brain size={20} />
          Analyze Policy
        </>
      )}
    </button>
  );
};

const ActionButton = ({ onClick, icon: Icon, label, color, hoverColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.actionButton,
        backgroundColor: isHovered ? hoverColor : color
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

const RiskFlag = ({ flag }) => {
  const getSeverityColor = () => {
    if (flag.risk && flag.risk.toLowerCase().includes('high')) return { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.5)', text: '#f87171' };
    if (flag.risk && flag.risk.toLowerCase().includes('medium')) return { bg: 'rgba(249, 115, 22, 0.2)', border: 'rgba(249, 115, 22, 0.5)', text: '#fb923c' };
    return { bg: 'rgba(234, 179, 8, 0.2)', border: 'rgba(234, 179, 8, 0.5)', text: '#facc15' };
  };

  const colors = getSeverityColor();

  return (
    <div style={{
      ...styles.riskItem,
      backgroundColor: colors.bg,
      borderColor: colors.border
    }}>
      <div style={styles.riskContent}>
        <AlertTriangle size={20} color={colors.text} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1 }}>
          <div style={styles.riskHeader}>
            <span style={styles.riskIssue}>{flag.item}</span>
          </div>
          <p style={styles.riskArticle}>{flag.risk}</p>
          {flag.action && <p style={styles.riskArticle}>Action: {flag.action}</p>}
        </div>
      </div>
    </div>
  );
};

const keyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    color: 'white',
    padding: '32px',
  },
  maxWidth: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  headerTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #c084fc, #f9a8d4)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    margin: 0,
  },
  headerSubtitle: {
    color: '#d1d5db',
    margin: 0,
  },
  inputCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '32px',
    marginBottom: '32px',
  },
  inputGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: 'white',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(71, 85, 105, 1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(71, 85, 105, 1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(71, 85, 105, 1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
  },
  charCount: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  charCountText: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: 0,
  },
  charCountOk: {
    fontSize: '14px',
    color: '#4ade80',
  },
  errorCard: {
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  errorText: {
    color: '#fecaca',
    margin: 0,
  },
  analyzeButton: {
    width: '100%',
    padding: '16px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '18px',
    color: 'white',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  actionBar: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '8px 24px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  scoreCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '32px',
  },
  scoreHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  scoreTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    margin: 0,
  },
  scoreOrg: {
    color: '#9ca3af',
    margin: '4px 0',
  },
  scoreIndustry: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  scoreDisplay: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    marginBottom: '16px',
  },
  scoreNumber: {
    fontSize: '72px',
    fontWeight: 'bold',
  },
  scoreOutOf: {
    fontSize: '32px',
    color: '#9ca3af',
    marginBottom: '8px',
  },
  scoreLabel: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    marginLeft: '16px',
  },
  progressBar: {
    width: '100%',
    height: '16px',
    background: '#334155',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  progressFill: {
    height: '100%',
    transition: 'width 1s ease',
  },
  scoreAssessment: {
    color: '#d1d5db',
    margin: 0,
  },
  summaryCard: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    padding: '32px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summaryText: {
    color: '#d1d5db',
    margin: 0,
  },
  summaryList: {
    listStyle: 'disc',
    listStylePosition: 'inside',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    color: '#d1d5db',
    padding: 0,
    margin: 0,
  },
  summaryListItem: {
    color: '#d1d5db',
  },
  riskCard: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '32px',
  },
  riskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  riskItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid',
  },
  riskContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  riskHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
    flexWrap: 'wrap',
  },
  riskIssue: {
    fontWeight: '600',
    color: 'white',
  },
  riskArticle: {
    fontSize: '14px',
    color: '#d1d5db',
    margin: 0,
  },
  recommendationsCard: {
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    padding: '32px',
  },
  strengthsCard: {
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    padding: '32px',
  },
  strengthsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  strengthItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '16px',
    borderRadius: '8px',
  },
  strengthText: {
    color: '#d1d5db',
  },
};

export default PolicyAnalyzer;