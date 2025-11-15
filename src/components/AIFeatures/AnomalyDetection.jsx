import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Activity, Shield } from 'lucide-react';

const AnomalyDetection = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = async () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setAlerts([
          {
            _id: '1',
            summary: 'Unusual Access Pattern Detected',
            organizationId: { name: 'HealthCorp Nigeria' },
            detectedAt: new Date(),
            anomalyScore: 85,
            alerts: [
              {
                type: 'excessive_access',
                severity: 'high',
                description: 'Organization accessed your medical records 45 times today, compared to average of 3 times per day',
                recommendation: 'Review their access permissions and consider revoking consent if suspicious'
              },
              {
                type: 'unauthorized_field',
                severity: 'medium',
                description: 'Attempted to access your financial data which was not in the original consent agreement',
                recommendation: 'Contact the organization to clarify why they need this data'
              }
            ]
          },
          {
            _id: '2',
            summary: 'Third-Party Data Sharing Detected',
            organizationId: { name: 'RetailApp Ltd' },
            detectedAt: new Date(Date.now() - 3600000),
            anomalyScore: 62,
            alerts: [
              {
                type: 'third_party_sharing',
                severity: 'medium',
                description: 'Your data was shared with "DataBroker Inc" which was not mentioned in the privacy policy',
                recommendation: 'Request explanation from RetailApp and consider filing a complaint with NDPR'
              }
            ]
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load alerts:', error);
      setLoading(false);
    }
  };

  const acknowledgeAlert = async (alertId, actionTaken) => {
    try {
      setAlerts(alerts.filter(a => a._id !== alertId));
      setSelectedAlert(null);
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'linear-gradient(to right, #ef4444, #ec4899)';
      case 'medium':
        return 'linear-gradient(to right, #f97316, #eab308)';
      case 'low':
        return 'linear-gradient(to right, #3b82f6, #06b6d4)';
      default:
        return 'linear-gradient(to right, #6b7280, #64748b)';
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'high':
        return { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 0.5)', text: '#f87171' };
      case 'medium':
        return { bg: 'rgba(249, 115, 22, 0.2)', border: 'rgba(249, 115, 22, 0.5)', text: '#fb923c' };
      case 'low':
        return { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.5)', text: '#60a5fa' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.2)', border: 'rgba(107, 114, 128, 0.5)', text: '#9ca3af' };
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingCard}>
        <Activity size={48} color="#c084fc" style={styles.loadingIcon} />
        <p style={styles.loadingText}>Loading anomaly alerts...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Header */}
      <div style={styles.headerCard}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <Shield size={40} color="#c084fc" />
            <div>
              <h2 style={styles.headerTitle}>AI Anomaly Detection</h2>
              <p style={styles.headerSubtitle}>Real-time monitoring of unusual data access patterns</p>
            </div>
          </div>
          
          {alerts.length === 0 ? (
            <div style={styles.statusBadgeGreen}>
              <CheckCircle size={20} color="#4ade80" />
              <span style={styles.statusTextGreen}>All Clear</span>
            </div>
          ) : (
            <div style={styles.statusBadgeRed}>
              <AlertTriangle size={20} color="#f87171" />
              <span style={styles.statusTextRed}>
                {alerts.length} Active Alert{alerts.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div style={styles.noAlertsCard}>
          <CheckCircle size={64} color="#4ade80" style={{ marginBottom: '16px' }} />
          <h3 style={styles.noAlertsTitle}>No Anomalies Detected</h3>
          <p style={styles.noAlertsText}>All your data access patterns look normal. We're monitoring 24/7.</p>
        </div>
      ) : (
        <div style={styles.alertsList}>
          {alerts.map((alert) => (
            <AlertCard
              key={alert._id}
              alert={alert}
              selected={selectedAlert?._id === alert._id}
              onSelect={() => setSelectedAlert(alert)}
              onAcknowledge={acknowledgeAlert}
              getSeverityColor={getSeverityColor}
              getSeverityStyles={getSeverityStyles}
            />
          ))}
        </div>
      )}

      {/* Info Box */}
      <div style={styles.infoCard}>
        <h3 style={styles.infoTitle}>
          <Shield size={20} color="#c084fc" />
          How AI Anomaly Detection Works
        </h3>
        <ul style={styles.infoList}>
          <li style={styles.infoItem}>
            <span style={styles.infoBullet}>•</span>
            <span>
              <strong>Frequency Monitoring:</strong> AI tracks how often organizations access your data and alerts you if it's unusual (e.g., 50 times in one day vs average of 5)
            </span>
          </li>
          <li style={styles.infoItem}>
            <span style={styles.infoBullet}>•</span>
            <span>
              <strong>Scope Validation:</strong> Detects when organizations try to access data fields you didn't approve
            </span>
          </li>
          <li style={styles.infoItem}>
            <span style={styles.infoBullet}>•</span>
            <span>
              <strong>Third-Party Sharing:</strong> Monitors if your data is being shared with companies not mentioned in the privacy policy
            </span>
          </li>
          <li style={styles.infoItem}>
            <span style={styles.infoBullet}>•</span>
            <span>
              <strong>Timing Analysis:</strong> Flags access at unusual hours or from unexpected locations
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const AlertCard = ({ alert, selected, onSelect, onAcknowledge, getSeverityColor, getSeverityStyles }) => {
  const [isHovered, setIsHovered] = useState(false);
  const severity = alert.alerts[0]?.severity || 'medium';
  const severityStyles = getSeverityStyles(severity);

  return (
    <div
      style={{
        ...styles.alertCard,
        borderColor: selected ? '#a855f7' : (isHovered ? 'rgba(168, 85, 247, 0.5)' : 'rgba(51, 65, 85, 1)'),
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Alert Header */}
      <div style={styles.alertHeader}>
        <div style={styles.alertHeaderLeft}>
          <div style={{
            ...styles.alertIcon,
            background: getSeverityColor(severity)
          }}>
            <AlertTriangle size={24} color="white" />
          </div>
          <div>
            <h3 style={styles.alertTitle}>{alert.summary}</h3>
            <p style={styles.alertOrgText}>
              Organization: <span style={styles.alertOrgName}>{alert.organizationId?.name || 'Unknown'}</span>
            </p>
            <p style={styles.alertDateText}>
              Detected: {new Date(alert.detectedAt).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div style={styles.alertBadges}>
          <span style={{
            ...styles.severityBadge,
            backgroundColor: severityStyles.bg,
            color: severityStyles.text
          }}>
            {severity}
          </span>
          <div style={{
            ...styles.riskBadge,
            backgroundColor: alert.anomalyScore >= 70 ? 'rgba(239, 68, 68, 0.2)' :
                            alert.anomalyScore >= 40 ? 'rgba(249, 115, 22, 0.2)' :
                            'rgba(234, 179, 8, 0.2)',
            color: alert.anomalyScore >= 70 ? '#f87171' :
                   alert.anomalyScore >= 40 ? '#fb923c' :
                   '#facc15'
          }}>
            Risk: {alert.anomalyScore}/100
          </div>
        </div>
      </div>

      {/* Alert Details */}
      <div style={styles.alertDetails}>
        {alert.alerts.map((subAlert, idx) => {
          const subSeverityStyles = getSeverityStyles(subAlert.severity);
          return (
            <div
              key={idx}
              style={{
                ...styles.subAlert,
                backgroundColor: subSeverityStyles.bg,
                borderColor: subSeverityStyles.border
              }}
            >
              <div style={styles.subAlertContent}>
                <Activity
                  size={20}
                  color={subSeverityStyles.text}
                  style={styles.subAlertIcon}
                />
                <div style={styles.subAlertText}>
                  <div style={styles.subAlertHeader}>
                    <span style={styles.subAlertType}>
                      {subAlert.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p style={styles.subAlertDescription}>{subAlert.description}</p>
                  <p style={styles.subAlertRecommendation}>
                    <strong>Recommendation:</strong> {subAlert.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      {selected && (
        <div style={styles.actionSection}>
          <p style={styles.actionLabel}>What action did you take?</p>
          <div style={styles.actionButtons}>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledge(alert._id, 'revoked_consent');
              }}
              color="#dc2626"
              hoverColor="#ef4444"
              label="Revoked Access"
            />
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledge(alert._id, 'contacted_org');
              }}
              color="#2563eb"
              hoverColor="#3b82f6"
              label="Contacted Org"
            />
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledge(alert._id, 'reported');
              }}
              color="#ea580c"
              hoverColor="#f97316"
              label="Reported Issue"
            />
            <ActionButton
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledge(alert._id, 'acknowledged');
              }}
              color="#16a34a"
              hoverColor="#22c55e"
              label="Acknowledged"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ActionButton = ({ onClick, color, hoverColor, label }) => {
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
      {label}
    </button>
  );
};

const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
`;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
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
    animation: 'pulse 2s ease-in-out infinite',
    margin: '0 auto 16px',
  },
  loadingText: {
    color: '#d1d5db',
    margin: 0,
  },
  headerCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '24px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  statusBadgeGreen: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.5)',
    borderRadius: '8px',
  },
  statusTextGreen: {
    color: '#86efac',
    fontWeight: '500',
  },
  statusBadgeRed: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '8px',
  },
  statusTextRed: {
    color: '#fca5a5',
    fontWeight: '500',
  },
  noAlertsCard: {
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    padding: '48px',
    textAlign: 'center',
  },
  noAlertsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
  },
  noAlertsText: {
    color: '#d1d5db',
    margin: 0,
  },
  alertsList: {
    display: 'grid',
    gap: '16px',
  },
  alertCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  alertHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  alertHeaderLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    flex: 1,
    minWidth: '300px',
  },
  alertIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  alertTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '4px',
  },
  alertOrgText: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '4px 0',
  },
  alertOrgName: {
    color: 'white',
    fontWeight: '500',
  },
  alertDateText: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '4px 0',
  },
  alertBadges: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  severityBadge: {
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  riskBadge: {
    padding: '4px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  alertDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  subAlert: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid',
  },
  subAlertContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  subAlertIcon: {
    flexShrink: 0,
    marginTop: '2px',
  },
  subAlertText: {
    flex: 1,
  },
  subAlertHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  subAlertType: {
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  subAlertDescription: {
    fontSize: '14px',
    color: '#d1d5db',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  subAlertRecommendation: {
    fontSize: '14px',
    color: '#d8b4fe',
  },
  actionSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(51, 65, 85, 1)',
  },
  actionLabel: {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '16px',
  },
  actionButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  },
  actionButton: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  infoCard: {
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    padding: '24px',
  },
  infoTitle: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
    color: '#d1d5db',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  infoBullet: {
    color: '#c084fc',
    marginTop: '4px',
    fontSize: '16px',
  },
};

export default AnomalyDetection;