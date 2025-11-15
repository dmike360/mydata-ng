import { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';

const ConsentSummary = ({ consentRequest, onApprove, onDeny }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [selectedFields, setSelectedFields] = useState({});
  const [expirationDays, setExpirationDays] = useState(30);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pidgin', name: 'Pidgin' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'ha', name: 'Hausa' }
  ];

  // Mock consent request if none provided
  const mockRequest = {
    organizationName: 'HealthCorp Nigeria',
    complianceScore: 87,
    dataFields: ['full_name', 'email_address', 'phone_number', 'medical_records', 'date_of_birth'],
    purpose: 'To provide personalized healthcare services and maintain your medical records securely',
    thirdPartySharing: true
  };

  const activeRequest = consentRequest || mockRequest;

  useEffect(() => {
    loadSummary();
  }, [language]);

  useEffect(() => {
    const initialSelection = {};
    activeRequest.dataFields.forEach(field => {
      initialSelection[field] = true;
    });
    setSelectedFields(initialSelection);
  }, []);

  const loadSummary = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const summaries = {
          en: "This organization wants to access your personal information including your name, contact details, and medical records. They will use this data to provide healthcare services and may share it with medical partners. You can control exactly which information they can access and set an expiration date.",
          pidgin: "Dis organization wan access your personal information wey include your name, contact details, and medical records. Dem go use am to give you healthcare service and fit share am with medical partners. You fit control wetin dem fit access and set expiration date.",
          yo: "Ilé-iṣẹ́ yìí fẹ́ wọlé sí àlàyé ti ara rẹ pẹ̀lú orúkọ rẹ, alaye ibaraenisepo, ati awọn igbasilẹ ilera. Wọn yoo lo alaye yi lati pese awọn iṣẹ ilera ati pe wọn le pin pẹlu awọn alabaṣepọ ilera.",
          ig: "Nzukọ a chọrọ ịnweta ozi gị gụnyere aha gị, nkọwa kọntaktị, na ndekọ ahụike. Ha ga-eji ozi a nye ọrụ nlekọta ahụike ma nwee ike kesaa ya na ndị mmekọ ahụike.",
          ha: "Wannan ƙungiya tana son samun damar yin amfani da bayanan ku da suka haɗa da sunan ku, bayanan sadarwa, da bayanan lafiya. Za su yi amfani da wannan bayanin don samar da ayyukan kiwon lafiya kuma suna iya raba shi da abokan aikin lafiya."
        };
        setSummary(summaries[language] || summaries.en);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load summary:', error);
      setLoading(false);
    }
  };

  const toggleField = (field) => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleApprove = () => {
    const approvedFields = Object.keys(selectedFields)
      .filter(field => selectedFields[field])
      .map(fieldName => ({
        fieldName,
        approved: true,
        purpose: activeRequest.purpose
      }));

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    onApprove?.({
      organizationId: activeRequest.organizationId,
      dataFields: approvedFields,
      purpose: activeRequest.purpose,
      consentType: expirationDays === 0 ? 'one_time' : 'duration_limited',
      expiresAt: expirationDays === 0 ? null : expiresAt.toISOString(),
      language
    });
  };

  const getComplianceColor = (score) => {
    if (score >= 85) return '#4ade80';
    if (score >= 70) return '#facc15';
    return '#f87171';
  };

  const getComplianceLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  if (loading) {
    return (
      <div style={styles.loadingCard}>
        <Loader2 size={48} color="#c084fc" style={styles.loadingIcon} />
        <p style={styles.loadingText}>Analyzing privacy policy with AI...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Shield size={40} color="#c084fc" />
          <div>
            <h2 style={styles.headerTitle}>Consent Request</h2>
            <p style={styles.headerSubtitle}>{activeRequest.organizationName}</p>
          </div>
        </div>
        
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.languageSelect}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      {/* Compliance Score */}
      {activeRequest.complianceScore && (
        <div style={styles.complianceCard}>
          <div style={styles.complianceContent}>
            <div>
              <p style={styles.complianceLabel}>NDPR Compliance Score</p>
              <div style={styles.complianceScore}>
                <span style={{
                  ...styles.complianceNumber,
                  color: getComplianceColor(activeRequest.complianceScore)
                }}>
                  {activeRequest.complianceScore}/100
                </span>
                <span style={{
                  ...styles.complianceText,
                  color: getComplianceColor(activeRequest.complianceScore)
                }}>
                  {getComplianceLabel(activeRequest.complianceScore)}
                </span>
              </div>
            </div>
            <div style={styles.complianceBadge}>
              <span style={{
                ...styles.compliancePercent,
                color: getComplianceColor(activeRequest.complianceScore)
              }}>
                {Math.round(activeRequest.complianceScore)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* AI Summary */}
      <div style={styles.summaryCard}>
        <h3 style={styles.summaryTitle}>
          <AlertTriangle size={20} color="#facc15" />
          What This Means (Plain Language)
        </h3>
        <p style={styles.summaryText}>{summary}</p>
      </div>

      {/* Data Fields Selection */}
      <div style={styles.fieldsSection}>
        <h3 style={styles.fieldsTitle}>Data They Want to Access:</h3>
        <div style={styles.fieldsList}>
          {activeRequest.dataFields.map((field, idx) => (
            <FieldCard
              key={idx}
              field={field}
              selected={selectedFields[field]}
              onToggle={() => toggleField(field)}
            />
          ))}
        </div>
      </div>

      {/* Expiration Settings */}
      <div style={styles.expirationCard}>
        <div style={styles.expirationHeader}>
          <Clock size={20} color="#60a5fa" />
          <h3 style={styles.expirationTitle}>How Long Should They Have Access?</h3>
        </div>
        
        <div style={styles.expirationOptions}>
          {[
            { days: 7, label: '7 Days' },
            { days: 30, label: '30 Days' },
            { days: 90, label: '90 Days' },
            { days: 0, label: 'Ongoing' }
          ].map((option) => (
            <ExpirationButton
              key={option.days}
              option={option}
              selected={expirationDays === option.days}
              onClick={() => setExpirationDays(option.days)}
            />
          ))}
        </div>
        
        {expirationDays > 0 && (
          <p style={styles.expirationNote}>
            Access will automatically expire on {new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Purpose */}
      <div style={styles.purposeCard}>
        <h3 style={styles.purposeTitle}>Purpose:</h3>
        <p style={styles.purposeText}>{activeRequest.purpose}</p>
      </div>

      {/* Third-Party Sharing Warning */}
      {activeRequest.thirdPartySharing && (
        <div style={styles.warningCard}>
          <AlertTriangle size={20} color="#facc15" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={styles.warningText}>
              <strong>Third-Party Sharing:</strong> This organization may share your data with partners. 
              Check their privacy policy for details.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <ApproveButton
          onClick={handleApprove}
          disabled={Object.values(selectedFields).every(v => !v)}
        />
        
        <DenyButton onClick={onDeny} />
      </div>

      {/* User Rights Notice */}
      <div style={styles.rightsCard}>
        <p style={styles.rightsText}>
          <strong style={styles.rightsStrong}>Your Rights:</strong> You can view all access logs, 
          revoke this consent anytime, and export your data. Your privacy is protected by MyData NG.
        </p>
      </div>
    </div>
  );
};

const FieldCard = ({ field, selected, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.fieldCard,
        borderColor: selected ? 'rgba(34, 197, 94, 0.5)' : (isHovered ? 'rgba(71, 85, 105, 1)' : 'rgba(71, 85, 105, 1)'),
        backgroundColor: selected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(15, 23, 42, 0.3)',
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.fieldContent}>
        <div style={styles.fieldLeft}>
          {selected ? (
            <CheckCircle size={20} color="#4ade80" />
          ) : (
            <XCircle size={20} color="#6b7280" />
          )}
          <span style={styles.fieldName}>
            {field.replace(/_/g, ' ')}
          </span>
        </div>
        <span style={{
          ...styles.fieldStatus,
          color: selected ? '#4ade80' : '#6b7280'
        }}>
          {selected ? 'Approved' : 'Denied'}
        </span>
      </div>
    </div>
  );
};

const ExpirationButton = ({ option, selected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.expirationButton,
        borderColor: selected ? '#3b82f6' : (isHovered ? '#475569' : '#475569'),
        backgroundColor: selected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.3)',
        color: selected ? 'white' : '#9ca3af',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {option.label}
    </button>
  );
};

const ApproveButton = ({ onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.approveButton,
        background: disabled 
          ? 'linear-gradient(to right, #4b5563, #374151)' 
          : (isHovered 
            ? 'linear-gradient(to right, #22c55e, #10b981)' 
            : 'linear-gradient(to right, #16a34a, #059669)'),
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CheckCircle size={20} />
      Approve Consent
    </button>
  );
};

const DenyButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.denyButton,
        backgroundColor: isHovered ? '#ef4444' : '#dc2626',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <XCircle size={20} />
      Deny
    </button>
  );
};

const keyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const styles = {
  container: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '32px',
  },
  loadingCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '48px',
    textAlign: 'center',
  },
  loadingIcon: {
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
  loadingText: {
    color: '#d1d5db',
    margin: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  headerSubtitle: {
    color: '#9ca3af',
    margin: 0,
  },
  languageSelect: {
    padding: '8px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(71, 85, 105, 1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
  },
  complianceCard: {
    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  complianceContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  complianceLabel: {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '4px',
  },
  complianceScore: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  complianceNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  complianceText: {
    fontSize: '18px',
    fontWeight: '600',
  },
  complianceBadge: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    border: '4px solid rgba(168, 85, 247, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compliancePercent: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  summaryCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  summaryTitle: {
    fontWeight: '600',
    color: 'white',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summaryText: {
    color: '#d1d5db',
    lineHeight: '1.6',
    margin: 0,
  },
  fieldsSection: {
    marginBottom: '24px',
  },
  fieldsTitle: {
    fontWeight: '600',
    color: 'white',
    marginBottom: '16px',
  },
  fieldsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  fieldCard: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  fieldContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  fieldName: {
    fontWeight: '500',
    color: 'white',
    textTransform: 'capitalize',
  },
  fieldStatus: {
    fontSize: '14px',
    fontWeight: '500',
  },
  expirationCard: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  expirationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  expirationTitle: {
    fontWeight: '600',
    color: 'white',
    margin: 0,
  },
  expirationOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
  },
  expirationButton: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'none',
  },
  expirationNote: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#9ca3af',
  },
  purposeCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  purposeTitle: {
    fontWeight: '600',
    color: 'white',
    marginBottom: '8px',
  },
  purposeText: {
    color: '#d1d5db',
    margin: 0,
  },
  warningCard: {
    background: 'rgba(234, 179, 8, 0.1)',
    border: '1px solid rgba(234, 179, 8, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '24px',
  },
  warningText: {
    fontSize: '14px',
    color: '#fef3c7',
    margin: 0,
  },
  actionButtons: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  },
  approveButton: {
    flex: 1,
    padding: '16px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '16px',
  },
  denyButton: {
    padding: '16px 32px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '16px',
  },
  rightsCard: {
    padding: '16px',
    background: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '8px',
  },
  rightsText: {
    fontSize: '14px',
    color: '#d1d5db',
    margin: 0,
  },
  rightsStrong: {
    color: '#d8b4fe',
  },
};

export default ConsentSummary;