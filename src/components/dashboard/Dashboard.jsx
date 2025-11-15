import React, { useState } from 'react';
import { Shield, Lock, Eye, User, Mail, Phone, Activity, TrendingUp, CheckCircle, Brain, AlertTriangle, FileCheck, XCircle } from 'lucide-react';

// Main Dashboard Component
const IntegratedDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Show the appropriate view with FULL UI
  if (currentView === 'anomaly-detection') {
    return <AnomalyDetectionFull onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'consent-summary') {
    return <ConsentSummaryFull onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'policy-analyzer') {
    return <PolicyAnalyzerFull onBack={() => setCurrentView('dashboard')} />;
  }

  return <Dashboard setCurrentView={setCurrentView} />;
};

// FULL ANOMALY DETECTION COMPONENT
const AnomalyDetectionFull = ({ onBack }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  React.useEffect(() => {
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
            }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const acknowledgeAlert = (alertId) => {
    setAlerts(alerts.filter(a => a._id !== alertId));
    setSelectedAlert(null);
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.backgroundWrapper}>
        <div style={{...styles.bgBlob, ...styles.bgBlob1}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob2}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob3}}></div>
      </div>
      
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoSection}>
              <div style={styles.logoIcon}>
                <Shield size={24} color="white" />
              </div>
              <div style={styles.logoText}>MyData NG</div>
            </div>
            <button onClick={onBack} style={styles.backButton}>
              ← Back to Dashboard
            </button>
          </div>
        </header>

        <div style={styles.mainContent}>
          <div style={styles.anomalyHeaderCard}>
            <div style={styles.anomalyHeaderContent}>
              <div style={styles.anomalyHeaderLeft}>
                <Shield size={40} color="#c084fc" />
                <div>
                  <h2 style={styles.anomalyHeaderTitle}>AI Anomaly Detection</h2>
                  <p style={styles.anomalyHeaderSubtitle}>Real-time monitoring of unusual data access patterns</p>
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
                  <span style={styles.statusTextRed}>{alerts.length} Active Alert{alerts.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div style={styles.loadingCard}>
              <Activity size={48} color="#c084fc" style={styles.loadingIcon} />
              <p style={styles.loadingText}>Loading anomaly alerts...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div style={styles.noAlertsCard}>
              <CheckCircle size={64} color="#4ade80" style={{ marginBottom: '16px' }} />
              <h3 style={styles.noAlertsTitle}>No Anomalies Detected</h3>
              <p style={styles.noAlertsText}>All your data access patterns look normal. We're monitoring 24/7.</p>
            </div>
          ) : (
            <div style={styles.alertsList}>
              {alerts.map((alert) => {
                const severity = alert.alerts[0]?.severity || 'high';
                const isSelected = selectedAlert?._id === alert._id;

                return (
                  <div
                    key={alert._id}
                    onClick={() => setSelectedAlert(alert)}
                    style={{
                      ...styles.alertCard,
                      borderColor: isSelected ? '#a855f7' : 'rgba(51, 65, 85, 1)',
                    }}
                  >
                    <div style={styles.alertHeader}>
                      <div style={styles.alertHeaderLeft}>
                        <div style={{
                          ...styles.alertIcon,
                          background: 'linear-gradient(to right, #ef4444, #ec4899)'
                        }}>
                          <AlertTriangle size={24} color="white" />
                        </div>
                        <div>
                          <h3 style={styles.alertTitle}>{alert.summary}</h3>
                          <p style={styles.alertOrgText}>
                            Organization: <span style={styles.alertOrgName}>{alert.organizationId?.name}</span>
                          </p>
                          <p style={styles.alertDateText}>
                            Detected: {new Date(alert.detectedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div style={styles.alertBadges}>
                        <span style={{
                          ...styles.severityBadge,
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          color: '#f87171'
                        }}>
                          {severity}
                        </span>
                        <div style={{
                          ...styles.riskBadge,
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          color: '#f87171'
                        }}>
                          Risk: {alert.anomalyScore}/100
                        </div>
                      </div>
                    </div>

                    <div style={styles.alertDetails}>
                      {alert.alerts.map((subAlert, idx) => (
                        <div
                          key={idx}
                          style={{
                            ...styles.subAlert,
                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                            borderColor: 'rgba(239, 68, 68, 0.5)'
                          }}
                        >
                          <div style={styles.subAlertContent}>
                            <Activity size={20} color="#f87171" style={styles.subAlertIcon} />
                            <div style={styles.subAlertText}>
                              <div style={styles.subAlertHeader}>
                                <span style={styles.subAlertType}>{subAlert.type.replace(/_/g, ' ')}</span>
                              </div>
                              <p style={styles.subAlertDescription}>{subAlert.description}</p>
                              <p style={styles.subAlertRecommendation}>
                                <strong>Recommendation:</strong> {subAlert.recommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {isSelected && (
                      <div style={styles.actionSection}>
                        <p style={styles.actionLabel}>What action did you take?</p>
                        <div style={styles.actionButtons}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              acknowledgeAlert(alert._id);
                            }}
                            style={{...styles.actionButton, backgroundColor: '#dc2626'}}
                          >
                            Revoked Access
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              acknowledgeAlert(alert._id);
                            }}
                            style={{...styles.actionButton, backgroundColor: '#2563eb'}}
                          >
                            Contacted Org
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              acknowledgeAlert(alert._id);
                            }}
                            style={{...styles.actionButton, backgroundColor: '#ea580c'}}
                          >
                            Reported Issue
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              acknowledgeAlert(alert._id);
                            }}
                            style={{...styles.actionButton, backgroundColor: '#16a34a'}}
                          >
                            Acknowledged
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>
              <Shield size={20} color="#c084fc" />
              How AI Anomaly Detection Works
            </h3>
            <ul style={styles.infoList}>
              <li style={styles.infoItem}>
                <span style={styles.infoBullet}>•</span>
                <span><strong>Frequency Monitoring:</strong> AI tracks how often organizations access your data</span>
              </li>
              <li style={styles.infoItem}>
                <span style={styles.infoBullet}>•</span>
                <span><strong>Scope Validation:</strong> Detects unauthorized data field access</span>
              </li>
              <li style={styles.infoItem}>
                <span style={styles.infoBullet}>•</span>
                <span><strong>Third-Party Sharing:</strong> Monitors unexpected data sharing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// FULL CONSENT SUMMARY COMPONENT
const ConsentSummaryFull = ({ onBack }) => {
  const [selectedFields, setSelectedFields] = useState({
    full_name: true,
    email_address: true,
    phone_number: true,
    medical_records: true
  });

  const consentRequest = {
    organizationName: 'HealthCorp Nigeria',
    complianceScore: 87,
    dataFields: ['full_name', 'email_address', 'phone_number', 'medical_records'],
    purpose: 'To provide personalized healthcare services',
    thirdPartySharing: true
  };

  const toggleField = (field) => {
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.backgroundWrapper}>
        <div style={{...styles.bgBlob, ...styles.bgBlob1}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob2}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob3}}></div>
      </div>
      
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoSection}>
              <div style={styles.logoIcon}>
                <Shield size={24} color="white" />
              </div>
              <div style={styles.logoText}>MyData NG</div>
            </div>
            <button onClick={onBack} style={styles.backButton}>
              ← Back to Dashboard
            </button>
          </div>
        </header>

        <div style={styles.mainContent}>
          <div style={styles.consentCard}>
            <h2 style={styles.consentTitle}>Consent Request</h2>
            <p style={styles.consentOrg}>{consentRequest.organizationName}</p>
            
            <div style={styles.complianceScoreCard}>
              <p style={styles.scoreLabel}>NDPR Compliance Score</p>
              <div style={styles.scoreValue}>{consentRequest.complianceScore}/100</div>
            </div>

            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>
                <FileCheck size={20} color="#60a5fa" />
                What This Means (Plain Language)
              </h3>
              <p style={styles.summaryText}>
                This organization wants to access your personal information including your name, contact details, and medical records.
              </p>
            </div>

            <div>
              <h3 style={styles.fieldsTitle}>Data They Want to Access:</h3>
              {consentRequest.dataFields.map((field) => (
                <div
                  key={field}
                  onClick={() => toggleField(field)}
                  style={{
                    ...styles.fieldCard,
                    borderColor: selectedFields[field] ? 'rgba(34, 197, 94, 0.5)' : 'rgba(71, 85, 105, 1)',
                    backgroundColor: selectedFields[field] ? 'rgba(34, 197, 94, 0.1)' : 'rgba(15, 23, 42, 0.3)',
                  }}
                >
                  <div style={styles.fieldContent}>
                    <div style={styles.fieldLeft}>
                      {selectedFields[field] ? (
                        <CheckCircle size={20} color="#4ade80" />
                      ) : (
                        <XCircle size={20} color="#6b7280" />
                      )}
                      <span style={styles.fieldName}>{field.replace(/_/g, ' ')}</span>
                    </div>
                    <span style={{...styles.fieldStatus, color: selectedFields[field] ? '#4ade80' : '#6b7280'}}>
                      {selectedFields[field] ? 'Approved' : 'Denied'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{marginTop: '24px'}}>
              <button style={{...styles.approveBtn, marginRight: '12px'}}>
                <CheckCircle size={20} />
                Approve Consent
              </button>
              <button style={styles.denyBtn}>
                <XCircle size={20} />
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FULL POLICY ANALYZER COMPONENT  
const PolicyAnalyzerFull = ({ onBack }) => {
  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.backgroundWrapper}>
        <div style={{...styles.bgBlob, ...styles.bgBlob1}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob2}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob3}}></div>
      </div>
      
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoSection}>
              <div style={styles.logoIcon}>
                <Shield size={24} color="white" />
              </div>
              <div style={styles.logoText}>MyData NG</div>
            </div>
            <button onClick={onBack} style={styles.backButton}>
              ← Back to Dashboard
            </button>
          </div>
        </header>

        <div style={styles.mainContent}>
          <div style={styles.policyCard}>
            <div style={styles.policyHeader}>
              <Brain size={40} color="#c084fc" />
              <h1 style={styles.policyTitle}>AI Policy Analyzer</h1>
            </div>
            <p style={styles.policySubtitle}>NDPR Compliance Analysis powered by Claude AI</p>
            
            <div style={styles.policyInputSection}>
              <label style={styles.inputLabel}>Organization Name *</label>
              <input
                type="text"
                placeholder="e.g., QuickCredit Nigeria"
                style={styles.policyInput}
              />
              
              <label style={styles.inputLabel}>Privacy Policy Text *</label>
              <textarea
                placeholder="Paste the complete privacy policy here..."
                rows={10}
                style={styles.policyTextarea}
              />
              
              <button style={styles.analyzeBtn}>
                <Brain size={20} />
                Analyze Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature View Wrapper (REMOVED - NO LONGER NEEDED)
const FeatureView = ({ title, description, onBack }) => {
  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.backgroundWrapper}>
        <div style={{...styles.bgBlob, ...styles.bgBlob1}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob2}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob3}}></div>
      </div>
      
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoSection}>
              <div style={styles.logoIcon}>
                <Shield size={24} color="white" />
              </div>
              <div style={styles.logoText}>MyData NG</div>
            </div>
            <button onClick={onBack} style={styles.backButton}>
              ← Back to Dashboard
            </button>
          </div>
        </header>

        <div style={styles.mainContent}>
          <div style={styles.featureCard}>
            <h1 style={styles.featureTitle}>{title}</h1>
            <p style={styles.featureDescription}>{description}</p>
            <div style={styles.featurePlaceholder}>
              <Brain size={64} color="#c084fc" />
              <p style={{ color: '#9ca3af', marginTop: '16px' }}>
                Full UI implementation available in the standalone components
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Main View
const Dashboard = ({ setCurrentView }) => {
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
  };

  const loginData = {
    date: 'November 15, 2024',
    time: '14:32 WAT',
    device: 'Chrome on Windows',
    location: 'Lagos, Nigeria'
  };

  const stats = {
    activePermissions: 12,
    totalAccessRequests: 247,
    connectedApps: 3,
    securityScore: 98
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      <div style={styles.backgroundWrapper}>
        <div style={{...styles.bgBlob, ...styles.bgBlob1}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob2}}></div>
        <div style={{...styles.bgBlob, ...styles.bgBlob3}}></div>
      </div>

      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoSection}>
              <div style={styles.logoIcon}>
                <Shield size={24} color="white" />
              </div>
              <div style={styles.logoText}>MyData NG</div>
            </div>
            <div style={styles.userSection}>
              <div style={styles.userInfo}>
                <p style={styles.userLabel}>Signed in as</p>
                <p style={styles.userName}>{userData.firstName} {userData.lastName}</p>
              </div>
              <button style={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div style={styles.mainContent}>
          <div style={styles.welcomeSection}>
            <h1 style={styles.welcomeTitle}>Welcome to Your Dashboard</h1>
            <p style={styles.welcomeSubtitle}>Manage your data permissions and privacy settings with AI-powered tools</p>
          </div>

          <div style={styles.loginCard}>
            <div style={styles.loginCardContent}>
              <div style={styles.loginIcon}>
                <Shield size={24} color="white" />
              </div>
              <div style={styles.loginDetails}>
                <h3 style={styles.loginTitle}>Last Login Information</h3>
                <div style={styles.loginGrid}>
                  <div style={styles.loginItem}>
                    <span style={styles.loginLabel}>Date & Time</span>
                    <span style={styles.loginValue}>{loginData.date} at {loginData.time}</span>
                  </div>
                  <div style={styles.loginItem}>
                    <span style={styles.loginLabel}>Device</span>
                    <span style={styles.loginValue}>{loginData.device}</span>
                  </div>
                  <div style={styles.loginItem}>
                    <span style={styles.loginLabel}>Location</span>
                    <span style={styles.loginValue}>{loginData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <StatCard
              icon={CheckCircle}
              value={stats.activePermissions}
              label="Active Permissions"
              change="+12%"
              gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))"
              textGradient="linear-gradient(to right, #3b82f6, #06b6d4)"
            />
            <StatCard
              icon={Activity}
              value={stats.totalAccessRequests}
              label="Access Requests"
              change="+8%"
              gradient="linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))"
              textGradient="linear-gradient(to right, #22c55e, #10b981)"
            />
            <StatCard
              icon={TrendingUp}
              value={stats.connectedApps}
              label="Connected Apps"
              change="+2"
              gradient="linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))"
              textGradient="linear-gradient(to right, #a855f7, #ec4899)"
            />
            <StatCard
              icon={Shield}
              value={`${stats.securityScore}%`}
              label="Security Score"
              change="+3%"
              gradient="linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2))"
              textGradient="linear-gradient(to right, #f97316, #ef4444)"
            />
          </div>

          <div style={styles.sectionDivider}>
            <Brain size={28} color="#c084fc" />
            <h2 style={styles.sectionHeader}>AI-Powered Privacy Tools</h2>
          </div>

          <div style={styles.cardsGrid}>
            <DashboardCard
              icon={AlertTriangle}
              title="Anomaly Detection"
              description="Real-time AI monitoring detects unusual data access patterns and alerts you instantly"
              gradient="linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1))"
              borderColor="rgba(239, 68, 68, 0.5)"
              iconBg="rgba(239, 68, 68, 0.2)"
              iconColor="#f87171"
              textGradient="linear-gradient(to right, #ef4444, #ec4899)"
              onClick={() => setCurrentView('anomaly-detection')}
            />

            <DashboardCard
              icon={FileCheck}
              title="AI Consent Summary"
              description="Get plain-language explanations of consent requests in English, Pidgin, Yoruba, Igbo, or Hausa"
              gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))"
              borderColor="rgba(59, 130, 246, 0.5)"
              iconBg="rgba(59, 130, 246, 0.2)"
              iconColor="#60a5fa"
              textGradient="linear-gradient(to right, #3b82f6, #6366f1)"
              onClick={() => setCurrentView('consent-summary')}
            />

            <DashboardCard
              icon={Brain}
              title="Policy Analyzer"
              description="Analyze any privacy policy for NDPR compliance with detailed scoring and recommendations"
              gradient="linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(139, 92, 246, 0.1))"
              borderColor="rgba(168, 85, 247, 0.5)"
              iconBg="rgba(168, 85, 247, 0.2)"
              iconColor="#c084fc"
              textGradient="linear-gradient(to right, #a855f7, #8b5cf6)"
              onClick={() => setCurrentView('policy-analyzer')}
            />
          </div>

          <div style={{...styles.sectionDivider, marginTop: '48px'}}>
            <Shield size={28} color="#60a5fa" />
            <h2 style={styles.sectionHeader}>Data Management</h2>
          </div>

          <div style={styles.cardsGrid}>
            <DashboardCard
              icon={Lock}
              title="Data Permissions"
              description="View and manage who has access to your personal data"
              gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))"
              borderColor="rgba(59, 130, 246, 0.5)"
              iconBg="rgba(59, 130, 246, 0.2)"
              iconColor="#60a5fa"
              textGradient="linear-gradient(to right, #3b82f6, #06b6d4)"
            />

            <DashboardCard
              icon={Eye}
              title="Access Logs"
              description="See detailed logs of all data access requests"
              gradient="linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))"
              borderColor="rgba(168, 85, 247, 0.5)"
              iconBg="rgba(168, 85, 247, 0.2)"
              iconColor="#c084fc"
              textGradient="linear-gradient(to right, #a855f7, #ec4899)"
            />

            <DashboardCard
              icon={Shield}
              title="Security Settings"
              description="Configure 2FA and other security options"
              gradient="linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))"
              borderColor="rgba(34, 197, 94, 0.5)"
              iconBg="rgba(34, 197, 94, 0.2)"
              iconColor="#4ade80"
              textGradient="linear-gradient(to right, #22c55e, #10b981)"
            />

            <DashboardCard
              icon={User}
              title="Profile"
              description="Update your personal information and preferences"
              gradient="linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))"
              borderColor="rgba(249, 115, 22, 0.5)"
              iconBg="rgba(249, 115, 22, 0.2)"
              iconColor="#fb923c"
              textGradient="linear-gradient(to right, #f97316, #ef4444)"
            />

            <DashboardCard
              icon={Mail}
              title="Notifications"
              description="Manage how you receive alerts and updates"
              gradient="linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(245, 158, 11, 0.1))"
              borderColor="rgba(234, 179, 8, 0.5)"
              iconBg="rgba(234, 179, 8, 0.2)"
              iconColor="#facc15"
              textGradient="linear-gradient(to right, #eab308, #f59e0b)"
            />

            <DashboardCard
              icon={Phone}
              title="Connected Devices"
              description="View and manage devices with access to your account"
              gradient="linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
              borderColor="rgba(99, 102, 241, 0.5)"
              iconBg="rgba(99, 102, 241, 0.2)"
              iconColor="#818cf8"
              textGradient="linear-gradient(to right, #6366f1, #8b5cf6)"
            />
          </div>

          <div style={styles.activityCard}>
            <div style={styles.activityHeader}>
              <Activity size={24} color="#60a5fa" />
              <h3 style={styles.activityTitle}>Recent Activity</h3>
            </div>
            <div style={styles.activityList}>
              {[
                { action: 'Permission granted to HealthApp', time: '2 hours ago', color: 'linear-gradient(to right, #22c55e, #10b981)' },
                { action: 'Security settings updated', time: '1 day ago', color: 'linear-gradient(to right, #3b82f6, #06b6d4)' },
                { action: 'New device connected', time: '3 days ago', color: 'linear-gradient(to right, #a855f7, #ec4899)' }
              ].map((activity, index) => (
                <div key={index} style={styles.activityItem}>
                  <div style={styles.activityItemContent}>
                    <div style={{...styles.activityDot, background: activity.color}}></div>
                    <span style={styles.activityAction}>{activity.action}</span>
                  </div>
                  <span style={styles.activityTime}>{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, change, gradient, textGradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.statCard,
        background: gradient,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.statCardContent}>
        <div style={styles.statCardHeader}>
          <Icon size={32} color="rgba(255, 255, 255, 0.8)" />
          <span style={styles.statChange}>{change}</span>
        </div>
        <div style={{...styles.statValue, background: textGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
          {value}
        </div>
        <div style={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon: Icon, title, description, gradient, borderColor, iconBg, iconColor, textGradient, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        ...styles.dashboardCard,
        background: gradient,
        borderColor: borderColor,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.dashboardCardContent}>
        <div style={{
          ...styles.dashboardCardIcon,
          backgroundColor: iconBg,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}>
          <Icon size={32} color={iconColor} />
        </div>
        <h3 style={styles.dashboardCardTitle}>{title}</h3>
        <p style={styles.dashboardCardDescription}>{description}</p>
        <div style={styles.dashboardCardLink}>
          <span style={{background: textGradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
            {onClick ? 'Launch' : 'Explore'}
          </span>
          <span style={{
            background: textGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s ease',
            display: 'inline-block'
          }}>
            →
          </span>
        </div>
      </div>
    </div>
  );
};

const keyframes = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.15; transform: scale(1.05); }
  }
`;

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    color: 'white',
    position: 'relative',
  },
  backgroundWrapper: {
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  },
  bgBlob: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: 'pulse 4s ease-in-out infinite',
  },
  bgBlob1: {
    top: '80px',
    left: '80px',
    width: '288px',
    height: '288px',
    background: 'rgba(59, 130, 246, 0.1)',
  },
  bgBlob2: {
    bottom: '80px',
    right: '80px',
    width: '384px',
    height: '384px',
    background: 'rgba(168, 85, 247, 0.1)',
    animationDelay: '1s',
  },
  bgBlob3: {
    top: '50%',
    left: '50%',
    width: '320px',
    height: '320px',
    background: 'rgba(236, 72, 153, 0.1)',
    animationDelay: '2s',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  header: {
    background: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  userInfo: {
    textAlign: 'right',
  },
  userLabel: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: 0,
  },
  userName: {
    fontWeight: '500',
    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    margin: 0,
  },
  signOutButton: {
    padding: '10px 24px',
    background: 'linear-gradient(to right, #1e293b, #334155)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: '10px 24px',
    background: 'linear-gradient(to right, #1e293b, #334155)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  mainContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  welcomeSection: {
    marginBottom: '48px',
  },
  welcomeTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '12px',
    background: 'linear-gradient(to right, #60a5fa, #c084fc, #f9a8d4)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  welcomeSubtitle: {
    color: '#d1d5db',
    fontSize: '18px',
    margin: 0,
  },
  loginCard: {
    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '48px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  loginCardContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  loginIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  loginDetails: {
    flex: 1,
    minWidth: 0,
  },
  loginTitle: {
    fontWeight: '600',
    fontSize: '18px',
    marginBottom: '12px',
    color: 'white',
  },
  loginGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    fontSize: '14px',
  },
  loginItem: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '12px',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
  },
  loginLabel: {
    color: '#9ca3af',
    display: 'block',
    marginBottom: '4px',
  },
  loginValue: {
    color: 'white',
    fontWeight: '500',
    wordWrap: 'break-word',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  statCard: {
    position: 'relative',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  statCardContent: {
    position: 'relative',
  },
  statCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  statChange: {
    color: '#4ade80',
    fontSize: '14px',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#d1d5db',
  },
  sectionDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    marginTop: '24px',
  },
  sectionHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    margin: 0,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  dashboardCard: {
    position: 'relative',
    backdropFilter: 'blur(10px)',
    padding: '32px',
    borderRadius: '16px',
    border: '1px solid',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  dashboardCardContent: {
    position: 'relative',
  },
  dashboardCardIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  dashboardCardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: 'white',
  },
  dashboardCardDescription: {
    color: '#d1d5db',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  dashboardCardLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  activityCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 0.5)',
    padding: '32px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  activityHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  activityTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    transition: 'background 0.3s ease',
    cursor: 'pointer',
  },
  activityItemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  activityDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  activityAction: {
    color: 'white',
    fontSize: '14px',
  },
  activityTime: {
    color: '#9ca3af',
    fontSize: '14px',
  },
  featureCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '48px',
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  featureDescription: {
    color: '#d1d5db',
    fontSize: '18px',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  featurePlaceholder: {
    padding: '48px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Anomaly Detection Styles
  anomalyHeaderCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '24px',
    marginBottom: '24px',
  },
  anomalyHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  anomalyHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  anomalyHeaderTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
  },
  anomalyHeaderSubtitle: {
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
    marginTop: '24px',
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
  },
  // Consent Summary Styles
  consentCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '32px',
  },
  consentTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
  },
  consentOrg: {
    color: '#9ca3af',
    marginBottom: '24px',
  },
  complianceScoreCard: {
    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  scoreLabel: {
    fontSize: '14px',
    color: '#9ca3af',
    marginBottom: '8px',
  },
  scoreValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#4ade80',
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
  },
  fieldsTitle: {
    fontWeight: '600',
    color: 'white',
    marginBottom: '16px',
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
  approveBtn: {
    padding: '16px 32px',
    background: 'linear-gradient(to right, #16a34a, #059669)',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  denyBtn: {
    padding: '16px 32px',
    background: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  // Policy Analyzer Styles
  policyCard: {
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 1)',
    padding: '32px',
  },
  policyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  policyTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #c084fc, #f9a8d4)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    margin: 0,
  },
  policySubtitle: {
    color: '#d1d5db',
    marginBottom: '32px',
  },
  policyInputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
    marginBottom: '8px',
  },
  policyInput: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(71, 85, 105, 1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
  },
  policyTextarea: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid rgba(71, 85, 105, 1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  analyzeBtn: {
    padding: '16px',
    background: 'linear-gradient(to right, #9333ea, #db2777)',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '18px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};

export default IntegratedDashboard;