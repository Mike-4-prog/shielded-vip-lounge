import React from 'react';

const VerificationError = ({ error, currentTier, userBalance, onRetry, onSelectLowerTier }) => {
  const getErrorDetails = () => {
    if (error.message.includes('Insufficient token balance')) {
      return {
        title: "❌ Insufficient VIP Passes",
        message: `You need ${currentTier.threshold} VIP Passes for ${currentTier.name}, but you only have ${userBalance}.`,
        type: "balance",
        suggestion: "Try a lower tier or acquire more VIP Passes."
      };
    } else if (error.message.includes('Circuit not loaded')) {
      return {
        title: "🔧 Connection Issue", 
        message: "The ZK circuit isn't properly loaded. Please check your connection to Midnight Network.",
        type: "connection",
        suggestion: "Ensure you're connected to Midnight Network and try again."
      };
    } else {
      return {
        title: "❌ Verification Failed",
        message: error.message,
        type: "generic", 
        suggestion: "Please check your inputs and try again."
      };
    }
  };

  const errorInfo = getErrorDetails();

  return (
    <div style={{
      background: 'rgba(220, 38, 38, 0.1)',
      border: '2px solid #dc2626',
      borderRadius: '12px',
      padding: '25px',
      margin: '20px 0',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {errorInfo.type === 'balance' ? '💰' : '⚠️'}
      </div>
      
      <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>
        {errorInfo.title}
      </h3>
      
      <p style={{ color: '#e2e8f0', marginBottom: '15px', lineHeight: '1.5' }}>
        {errorInfo.message}
      </p>

      {errorInfo.type === 'balance' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💡 Educational Insight:</h4>
          <p style={{ color: '#e2e8f0', fontSize: '14px', margin: 0 }}>
            This demonstrates how Zero-Knowledge Proofs <strong>preserve your privacy even when verification fails</strong>. 
            The network knows the proof is invalid, but doesn't learn why or which specific tokens you own.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={onRetry}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #2d3a8c 0%, #1e2a78 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🔄 Retry Verification
        </button>
        
        {errorInfo.type === 'balance' && (
          <button
            onClick={onSelectLowerTier}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🏆 Try Lower Tier
          </button>
        )}
      </div>
    </div>
  );
};

export default VerificationError;