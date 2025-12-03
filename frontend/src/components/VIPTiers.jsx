import React from 'react';

const VIPTiers = ({ currentTier, onTierSelect }) => {
  const tiers = [
    {
      id: 'bronze',
      name: 'Bronze Tier',
      description: 'Basic access to VIP content',
      threshold: 1,
      color: '#cd7f32',
      icon: '🥉',
      benefits: ['Access to basic VIP content', 'Monthly newsletter', 'Community access']
    },
    {
      id: 'silver', 
      name: 'Silver Tier',
      description: 'Enhanced VIP privileges',
      threshold: 3,
      color: '#c0c0c0',
      icon: '🥈',
      benefits: ['All Bronze benefits', 'Exclusive events', 'Early access to features', 'Priority support']
    },
    {
      id: 'gold',
      name: 'Gold Tier',
      description: 'Full VIP experience',
      threshold: 5,
      color: '#ffd700',
      icon: '🥇',
      benefits: ['All Silver benefits', 'Private messaging', 'Premium 1-on-1 support', 'Governance rights', 'VIP-only content']
    }
  ];

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '25px', 
        color: '#2c3e50',
        fontSize: '22px',
        fontWeight: '600'
      }}>
        🏆 Choose Your VIP Tier
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '25px'
      }}>
        {tiers.map(tier => (
          <div
            key={tier.id}
            onClick={() => onTierSelect(tier)}
            style={{
              border: `3px solid ${currentTier?.id === tier.id ? tier.color : '#e0e0e0'}`,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: currentTier?.id === tier.id ? `${tier.color}15` : '#ffffff',
              transition: 'all 0.3s ease',
              boxShadow: currentTier?.id === tier.id 
                ? `0 8px 25px ${tier.color}40` 
                : '0 4px 15px rgba(0,0,0,0.1)',
              transform: currentTier?.id === tier.id ? 'translateY(-5px)' : 'none'
            }}
          >
            <div style={{ 
              fontSize: '32px', 
              marginBottom: '15px',
              filter: currentTier?.id === tier.id ? 'none' : 'grayscale(20%)'
            }}>
              {tier.icon}
            </div>
            
            <h4 style={{ 
              color: tier.color, 
              margin: '0 0 8px 0',
              fontSize: '18px',
              fontWeight: '700'
            }}>
              {tier.name}
            </h4>
            
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              margin: '0 0 15px 0',
              lineHeight: '1.4'
            }}>
              {tier.description}
            </p>
            
            <div style={{ 
              backgroundColor: tier.color, 
              color: 'white', 
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              display: 'inline-block',
              boxShadow: `0 2px 8px ${tier.color}80`
            }}>
              {tier.threshold}+ VIP Passes Required
            </div>
            
            {currentTier?.id === tier.id && (
              <div style={{
                marginTop: '15px',
                padding: '8px',
                backgroundColor: `${tier.color}20`,
                borderRadius: '8px',
                border: `1px solid ${tier.color}40`
              }}>
                <div style={{
                  fontSize: '12px',
                  color: tier.color,
                  fontWeight: '600'
                }}>
                  ✅ Selected
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {currentTier && (
        <div style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '20px',
          borderRadius: '12px',
          borderLeft: `5px solid ${currentTier.color}`,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{ fontSize: '24px', marginRight: '10px' }}>
              {currentTier.icon}
            </span>
            <h4 style={{ 
              color: currentTier.color, 
              margin: 0,
              fontSize: '18px',
              fontWeight: '600'
            }}>
              {currentTier.name} Benefits
            </h4>
          </div>
          
          <ul style={{ 
            margin: 0, 
            paddingLeft: '25px',
            listStyle: 'none'
          }}>
            {/* FIXED: Added safe mapping with fallback empty array */}
            {(currentTier.benefits || []).map((benefit, index) => (
              <li key={index} style={{ 
                marginBottom: '8px', 
                fontSize: '14px',
                color: '#495057',
                position: 'relative',
                lineHeight: '1.5'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '-20px',
                  color: currentTier.color,
                  fontWeight: 'bold'
                }}>
                  •
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: `${currentTier.color}15`,
            borderRadius: '8px',
            border: `1px solid ${currentTier.color}30`
          }}>
            <div style={{
              fontSize: '13px',
              color: currentTier.color,
              fontWeight: '600',
              textAlign: 'center'
            }}>
              🛡️ Zero-Knowledge Proof will verify you have {currentTier.threshold}+ passes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VIPTiers;