const Overview = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="dashboard-section" aria-label="Overview metrics">
      <h2 className="section-title">Overview</h2>
      <div className="grid grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.id || metric.label}
            className="metric-card glass-panel"
          >
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
