const ServiceSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="dashboard-section" aria-label="Service summary">
      <h2 className="section-title">Service summary</h2>
      <div className="grid grid-cols-4">
        <div className="summary-item glass-panel">
          <div className="summary-label">Service</div>
          <div className="summary-value">{summary.service}</div>
        </div>
        <div className="summary-item glass-panel">
          <div className="summary-label">Your Referrals</div>
          <div className="summary-value">{summary.yourReferrals}</div>
        </div>
        <div className="summary-item glass-panel">
          <div className="summary-label">Active Referrals</div>
          <div className="summary-value">{summary.activeReferrals}</div>
        </div>
        <div className="summary-item glass-panel">
          <div className="summary-label">Total Ref. Earnings</div>
          <div className="summary-value">{summary.totalRefEarnings}</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
