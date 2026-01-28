import { loadContract } from './simple-contract-loader.mjs';

async function testContract() {
  console.log("🧪 TESTING CONTRACT LOAD (Simple Loader)...");
  try {
    const contract = await loadContract();
    console.log("✅ Contract loaded successfully!");
    console.log(`   Circuits: ${contract.circuits?.length || 'unknown'}`);
    console.log(`   Version: ${contract.version || 'unknown'}`);
    console.log("📋 Available methods:");
    Object.keys(contract).forEach(key => {
      if (typeof contract[key] === 'function' && !key.startsWith('_')) {
        console.log(`   - ${key}()`);
      }
    });
    return true;
  } catch (error) {
    console.error("❌ Failed to load contract:", error.message);
    return false;
  }
}

// Run test if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testContract().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export { testContract };
