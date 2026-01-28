// Minimal contract loader that doesn't require external packages
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadContract() {
  console.log("📦 Loading contract from local build...");
  
  try {
    // Load the compiled contract
    const contractPath = join(__dirname, 'contract-build', 'contract', 'index.cjs');
    
    // Since it's a .cjs file, we need to use require
    const contractModule = await import(contractPath);
    
    // Extract the contract instance
    const contract = contractModule.default || contractModule;
    
    if (!contract) {
      throw new Error("Contract not found in module");
    }
    
    console.log("✅ Contract loaded successfully!");
    console.log(`   File: ${contractPath}`);
    
    // Return mock contract structure
    return {
      ...contract,
      circuits: contract.circuits || [],
      version: contract.version || '1.0.0',
      // Add any other expected properties
    };
    
  } catch (error) {
    console.error("❌ Failed to load contract:", error.message);
    throw error;
  }
}

// Test if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  loadContract().then(contract => {
    console.log("🎉 Contract structure:");
    console.log("- Circuits:", contract.circuits?.length || 0);
    console.log("- Version:", contract.version);
    console.log("- Keys:", Object.keys(contract).filter(k => !k.startsWith('_')));
  }).catch(console.error);
}
