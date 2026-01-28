// PROPERLY FIXED deployment script for TieredTokenGated contract
// Updated with correct contract path and witnesses
import { WalletBuilder, networks } from '@midnight-ntwrk/compact-dev-tools';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function deploy() {
  console.log('🚀 Starting FINAL PROPERLY FIXED deployment...');
  
  try {
    // 1. Load the COMPILED contract (not source!)
    const contractPath = join(__dirname, '../contract/build/contract/index.cjs');
    console.log('📄 Loading COMPILED contract from:', contractPath);
    
    // Import contract
    const ContractModule = require(contractPath);
    
    // 2. Create contract instance with BOTH witness functions
    console.log('🔧 Creating contract with witnesses...');
    const contract = new ContractModule.Contract({
      privateBalance: () => 1000n,    // User's private token balance
      privateTier: () => 2n           // User's private membership tier (2 = Gold)
    });
    
    console.log('✅ Contract created successfully');
    console.log('   Circuits:', Object.keys(contract.circuits).length);
    
    // 3. Create wallet
    console.log('👛 Creating wallet...');
    const wallet = await WalletBuilder.withRandomKey();
    
    // 4. Deploy to devnet
    console.log('🌐 Deploying to devnet...');
    const network = networks.devnet;
    
    const { contractAddress, transactionHash } = await wallet.deployContract({
      contract,
      network
    });
    
    console.log('\n🎉 DEPLOYMENT SUCCESSFUL!');
    console.log('✅ Contract deployed at:', contractAddress);
    console.log('📝 Transaction:', transactionHash);
    
    return { contractAddress, transactionHash };
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
}

// Run deployment
deploy().catch(console.error);
