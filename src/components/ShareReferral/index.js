import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";

const ShareReferral = ({ referral }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!referral) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section
      className="dashboard-section share-section glass-panel"
      aria-label="Share referral"
    >
      <h2 className="section-title">Refer friends and earn more</h2>

      <div className="share-grid">
        <div className="share-field">
          <label className="share-label">Your Referral Link</label>
          <div className="share-input-group">
            <input
              type="text"
              readOnly
              value={referral.link}
              className="share-input form-control"
            />
            <button
              className="btn btn-secondary copy-btn"
              onClick={() => handleCopy(referral.link, "link")}
            >
              {copiedLink ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copiedLink ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="share-field">
          <label className="share-label">Your Referral Code</label>
          <div className="share-input-group">
            <input
              type="text"
              readOnly
              value={referral.code}
              className="share-input form-control"
            />
            <button
              className="btn btn-secondary copy-btn"
              onClick={() => handleCopy(referral.code, "code")}
            >
              {copiedCode ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copiedCode ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareReferral;
