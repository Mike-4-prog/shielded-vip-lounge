import { createRequire } from 'module';
const require = createRequire(import.meta.url);

console.log("🔍 Testing NEW compiled contract...");

try {
    // Load NEW compiled contract
    const NewContractModule = require('./build/contract/index.cjs');
    
    console.log("1. Testing contract instance creation...");
    const contract = new NewContractModule.Contract({
        privateBalance: () => 1000n,
        privateTier: () => 2n
    });
    
    console.log("✅ NEW contract loads!");
    console.log("   Circuits:", Object.keys(contract.circuits).length);
    
    // Check version
    const fs = require('fs');
    const newContractCode = fs.readFileSync('./build/contract/index.cjs', 'utf8');
    
    if (newContractCode.includes('0.8.1')) {
        console.log("✅ Version: 0.8.1");
    } else {
        const versionMatch = newContractCode.match(/0\.[0-9]+\.[0-9]+/);
        console.log(`⚠️  Version: ${versionMatch ? versionMatch[0] : 'unknown'}`);
    }
    
    // Check MAX_FIELD
    if (newContractCode.includes('52435875175126190479447740508185965837690552500527637822603658699938581184512')) {
        console.log("✅ MAX_FIELD: Correct");
    } else {
        console.log("⚠️  MAX_FIELD: Might need updating");
    }
    
    console.log("\n🎯 RECOMMENDATION:");
    console.log("If NEW contract passes field check and has correct version,");
    console.log("use it. Otherwise, apply fixes to it.");
    
} catch (error) {
    console.error("❌ NEW contract error:", error.message);
    
    if (error.message.includes('MAX_FIELD')) {
        console.log("\n🔧 Need to fix MAX_FIELD in new contract");
    }
}
