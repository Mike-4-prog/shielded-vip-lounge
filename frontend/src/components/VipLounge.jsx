import React, { useState, useEffect } from 'react';
import mockMidnightClient from '../utils/MidnightClient';
import VIPTiers from './VIPTiers';
import VerificationError from './VerificationError';

const VipLounge = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [currentTier, setCurrentTier] = useState(null);
    const [privateMessage, setPrivateMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [proofDetails, setProofDetails] = useState(null);
    const [userTokenBalance, setUserTokenBalance] = useState(1);
    const [verificationError, setVerificationError] = useState(null);
    
    const initializeConnection = async () => {
        console.log("🚀 Initializing Midnight Network connection...");
        const connected = await mockMidnightClient.connect();
        setIsConnected(connected);
        
        // Load the membership circuit
        if (connected) {
            await mockMidnightClient.loadCircuit("membership_proof");
        }
    };
    
    useEffect(() => {
        initializeConnection();
    }, []);
    
    const proveMembership = async () => {
        if (!currentTier) {
            alert("Please select a VIP tier first!");
            return;
        }
        
        setLoading(true);
        setProofDetails(null);
        setVerificationError(null);
        
        try {
            console.log(`🛡️ Starting ${currentTier.name} verification...`);
            
            const proofInputs = {
                root: "0x1234567890abcdef1234567890abcdef12345678",
                threshold: currentTier.threshold,
                userSecret: "user_private_identity_12345",
                tokenBalance: userTokenBalance,
                merkleProof: ["0xproof1", "0xproof2", "0xproof3"]
            };
            
            console.log("📊 Tiered proof inputs prepared");
            
            // Use tiered proof generation
            const proof = await mockMidnightClient.generateTieredMembershipProof(
                proofInputs, 
                currentTier.threshold
            );
            setProofDetails(proof);
            
            console.log("✅ Tiered proof generated successfully:", proof);
            
            // Verify with shielded contract
            const verification = await mockMidnightClient.verifyContractCall(
                "0xShieldedLoungeAddress",
                "accessLounge",
                proof
            );
            
            console.log("📝 Contract verification:", verification);
            
            // Success - grant access with tier-specific content
            setIsMember(true);
            setPrivateMessage(getTierSpecificContent(currentTier.id));
            
        } catch (error) {
            console.error("❌ Tier verification failed:", error);
            setVerificationError({
                error,
                tier: currentTier,
                balance: userTokenBalance
            });
        } finally {
            setLoading(false);
        }
    };
    
    const getTierSpecificContent = (tierId) => {
        const content = {
            bronze: "🎉 Welcome to Bronze VIP! You have access to basic exclusive content and our monthly newsletter. Your privacy is protected while enjoying basic VIP privileges.",
            silver: "🌟 Silver VIP Access Granted! Enjoy exclusive events, early access to features, and all Bronze benefits. Your enhanced status remains completely private.",
            gold: "💫 Gold VIP Welcome! Full platform access including private messaging, premium support, and governance rights. Maximum benefits with maximum privacy."
        };
        return content[tierId] || "Welcome to the VIP Lounge!";
    };
    
    const handleRetry = () => {
        setVerificationError(null);
    };
    
    const handleSelectLowerTier = () => {
        console.log("🔄 Try Lower Tier clicked");
        console.log("📊 Current user balance:", userTokenBalance);
        setVerificationError(null);
        
        // Use the full tier definitions including benefits
        const tierDefinitions = [
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
        
        // Sort tiers by threshold (highest to lowest) to find the best match
        const sortedTiers = [...tierDefinitions].sort((a, b) => b.threshold - a.threshold);
        console.log("📈 Sorted tiers (highest first):", sortedTiers);
        
        const suitableTier = sortedTiers.find(tier => userTokenBalance >= tier.threshold);
        console.log("✅ Suitable tier found:", suitableTier);
        
        if (suitableTier) {
            console.log(`🔄 Auto-selecting ${suitableTier.name} for ${userTokenBalance} tokens`);
            handleTierSelect(suitableTier);
        } else {
            console.log("❌ No suitable tier found for current balance");
        }
    };
    
    const handleTierSelect = (tier) => {
        setCurrentTier(tier);
        setIsMember(false);
        setProofDetails(null);
        setPrivateMessage('');
        setVerificationError(null);
    };
    
    const resetVerification = () => {
        setCurrentTier(null);
        setIsMember(false);
        setProofDetails(null);
        setPrivateMessage('');
        setVerificationError(null);
    };
    
    if (!isConnected) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#ffffff' }}>
                <div>🔄 Connecting to Midnight Network...</div>
                <div style={{ fontSize: '14px', color: '#a0a8d6', marginTop: '10px' }}>
                    Initializing privacy-preserving blockchain connection
                </div>
            </div>
        );
    }
    
    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
            {/* Main Card - Changed to dark theme */}
            <div style={{ 
                background: 'rgba(15, 20, 50, 0.9)',
                padding: '30px', 
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                marginBottom: '20px',
                border: '1px solid #2d3a8c',
                backdropFilter: 'blur(10px)'
            }}>
                <h1 style={{ color: '#ffffff', marginBottom: '10px' }}>🛡️ Shielded VIP Lounge</h1>
                <p style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '30px' }}>
                    Prove your VIP status without revealing your identity using Zero-Knowledge Proofs
                </p>
                
                {/* Info Box - Updated with real SDK information */}
                <div style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '15px', 
                    borderRadius: '8px',
                    marginBottom: '20px',
                    borderLeft: '4px solid #3498db',
                    color: '#e2e8f0'
                }}>
                    <strong>Educational Demo:</strong> Demonstrating real Midnight.js SDK patterns from {' '}
                    <a 
                        href="https://github.com/midnightntwrk/midnight-js" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{color: '#fff', textDecoration: 'underline'}}
                    >
                        github.com/midnightntwrk/midnight-js
                    </a>
                    <div style={{fontSize: '12px', opacity: 0.9, marginTop: '4px'}}>
                        (v3.0.0-alpha.6 - Active Development)
                    </div>
                </div>
                
                {!isMember ? (
                    <div>
                        <VIPTiers 
                            currentTier={currentTier}
                            onTierSelect={handleTierSelect}
                        />
                        
                        {/* Error Display */}
                        {verificationError && (
                            <VerificationError 
                                error={verificationError.error}
                                currentTier={verificationError.tier}
                                userBalance={verificationError.balance}
                                onRetry={handleRetry}
                                onSelectLowerTier={handleSelectLowerTier}
                            />
                        )}
                        
                        {currentTier && !verificationError && (
                            <>
                                {/* User Settings Box - Changed to dark theme */}
                                <div style={{ 
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    padding: '15px', 
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    fontSize: '14px',
                                    color: '#e2e8f0',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <strong>Mock User Settings:</strong>
                                    <div style={{ marginTop: '10px' }}>
                                        <label style={{ color: '#e2e8f0' }}>
                                            Your VIP Pass Balance: 
                                            <input 
                                                type="number" 
                                                value={userTokenBalance}
                                                onChange={(e) => setUserTokenBalance(parseInt(e.target.value) || 0)}
                                                min="0"
                                                max="10"
                                                style={{ 
                                                    marginLeft: '10px', 
                                                    padding: '5px',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '4px',
                                                    width: '60px',
                                                    color: '#ffffff'
                                                }}
                                            />
                                        </label>
                                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#a0a8d6' }}>
                                            Current tier requires: <strong>{currentTier.threshold} passes</strong>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={proveMembership} 
                                    disabled={loading}
                                    style={{
                                        padding: '12px 30px',
                                        fontSize: '16px',
                                        background: loading 
                                            ? '#4a5568' 
                                            : 'linear-gradient(135deg, #2d3a8c 0%, #1e2a78 100%)',
                                        color: 'white',
                                        border: loading ? '1px solid #718096' : '1px solid #3a4a9c',
                                        borderRadius: '8px',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        width: '100%',
                                        transition: 'all 0.3s ease',
                                        boxShadow: loading ? 'none' : '0 4px 16px rgba(45, 58, 140, 0.4)'
                                    }}
                                >
                                    {loading ? (
                                        <span>🔐 Generating {currentTier.name} Proof...</span>
                                    ) : (
                                        <span>🎫 Verify {currentTier.name} Access</span>
                                    )}
                                </button>
                                
                                <div style={{ fontSize: '14px', color: '#a0a8d6', marginTop: '15px', textAlign: 'center' }}>
                                    This will generate a zero-knowledge proof for {currentTier.name} without revealing your identity
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div style={{ 
                        background: `linear-gradient(135deg, ${getTierColor(currentTier.id)} 0%, #764ba2 100%)`,
                        color: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                    }}>
                        <h2 style={{ marginBottom: '20px' }}>✅ {currentTier.name} Access Granted!</h2>
                        
                        <div style={{ 
                            background: 'rgba(255,255,255,0.9)', 
                            color: '#2c3e50',
                            padding: '20px', 
                            borderRadius: '8px',
                            margin: '20px 0',
                            textAlign: 'left'
                        }}>
                            <strong>Exclusive {currentTier.name} Content:</strong>
                            <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
                                {privateMessage}
                            </div>
                        </div>
                        
                        {proofDetails && (
                            <div style={{ 
                                background: 'rgba(0,0,0,0.2)', 
                                padding: '15px', 
                                borderRadius: '6px',
                                marginTop: '15px',
                                fontSize: '12px',
                                textAlign: 'left'
                            }}>
                                <strong>Tier Proof Generated:</strong> 
                                <div style={{ wordBreak: 'break-all', marginTop: '5px' }}>
                                    {proofDetails.proofData}
                                </div>
                                <div style={{ marginTop: '8px' }}>
                                    <strong>Tier:</strong> {proofDetails.tier}
                                </div>
                            </div>
                        )}
                        
                        <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.9 }}>
                            🎭 Your identity remains completely private. The network verified that 
                            <strong> someone with {currentTier.threshold}+ VIP Passes</strong> accessed this content, 
                            but doesn't know who you are or which passes you own.
                        </p>
                        
                        <button 
                            onClick={resetVerification}
                            style={{
                                marginTop: '20px',
                                padding: '8px 20px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                            }}
                        >
                            🔄 Try Different Tier
                        </button>
                    </div>
                )}
            </div>
            
            {/* How It Works Section - Changed to dark theme */}
            <div style={{ 
                background: 'rgba(15, 20, 50, 0.9)',
                padding: '20px', 
                borderRadius: '10px',
                fontSize: '14px',
                color: '#e2e8f0',
                border: '1px solid #2d3a8c',
                backdropFilter: 'blur(10px)'
            }}>
                <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>How This Works:</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li>✅ You own VIP Pass NFTs in your wallet</li>
                    <li>🏆 Select your desired VIP tier (Bronze/Silver/Gold)</li>
                    <li>🔒 Generate a zero-knowledge proof of tier eligibility</li>
                    <li>🎯 Proof verifies you meet the threshold without revealing which passes</li>
                    <li>🚪 Shielded contract grants tier-specific access</li>
                    <li>🕵️ Your identity and transaction history remain private</li>
                </ul>
            </div>
        </div>
    );
};

// Helper function for tier colors
const getTierColor = (tierId) => {
    const colors = {
        bronze: '#cd7f32',
        silver: '#c0c0c0', 
        gold: '#ffd700'
    };
    return colors[tierId] || '#667eea';
};

export default VipLounge;
