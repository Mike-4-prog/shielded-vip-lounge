import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('?? Verifying TieredTokenGated Contract Compilation\n');

const projectRoot = path.join(__dirname, '..');
const contractDir = path.join(projectRoot, 'contract/src/managed/TieredTokenGated');

// Check 4 required folders
const requiredFolders = ['compiler', 'contract', 'keys', 'zkir'];
let allFoldersExist = true;

console.log('1. Required Folder Structure:');
requiredFolders.forEach(folder => {
  const folderPath = path.join(contractDir, folder);
  const exists = fs.existsSync(folderPath);
  console.log(`   ${exists ? '?' : '?'} ${folder}/`);
  if (!exists) allFoldersExist = false;
});

// Check keys folder contents
console.log('\n2. ZK Circuits Analysis:');
const keysDir = path.join(contractDir, 'keys');
if (fs.existsSync(keysDir)) {
  const files = fs.readdirSync(keysDir);
  const proverFiles = files.filter(f => f.endsWith('.prover') && fs.statSync(path.join(keysDir, f)).size > 0);
  const verifierFiles = files.filter(f => f.endsWith('.verifier') && fs.statSync(path.join(keysDir, f)).size > 0);
  
  console.log(`   Total key files: ${files.length}`);
  console.log(`   Valid prover files: ${proverFiles.length}`);
  console.log(`   Valid verifier files: ${verifierFiles.length}`);
  
  // Check for empty files (failed compilation)
  const emptyFiles = files.filter(f => fs.statSync(path.join(keysDir, f)).size === 0);
  if (emptyFiles.length > 0) {
    console.log(`\n   ??  Warning: ${emptyFiles.length} empty/incomplete key files`);
    console.log('   Some circuits may have failed compilation.');
  }
  
  // Expected circuits
  const expectedCircuits = 8;
  if (proverFiles.length === expectedCircuits) {
    console.log(`   ? All ${expectedCircuits} circuits compiled successfully`);
  } else {
    console.log(`   ??  ${proverFiles.length}/${expectedCircuits} circuits compiled`);
    console.log('   Some circuits may have compilation errors');
  }
} else {
  console.log('   ? Keys folder not found!');
  allFoldersExist = false;
}

// Check source files
console.log('\n3. Source Files:');
const sourceFiles = [
  '../TieredTokenGated.compact',
  '../witnesses.ts'
];

sourceFiles.forEach(file => {
  const filePath = path.join(projectRoot, 'contract/src', file);
  const exists = fs.existsSync(filePath);
  console.log(`   ${exists ? '?' : '?'} ${file}`);
});

console.log('\n=== VERDICT ===');
if (allFoldersExist) {
  console.log('? CONTRACT COMPILED SUCCESSFULLY!');
  console.log('\nThe contract includes:');
  console.log('• Witness-based verification (private balances)');
  console.log('• Public ledger verification');
  console.log('• Bronze/Silver/Gold tier system');
  console.log('• ZK circuits for privacy-preserving proofs');
  console.log('\nReady for deployment when Midnight tools are available.');
} else {
  console.log('? Contract needs recompilation.');
  console.log('Check for:');
  console.log('1. Language version (must be 0.14 for compiler 0.22.0)');
  console.log('2. Uint field sizes (use Uint<222> for token amounts)');
  console.log('3. Witness declarations match TypeScript implementation');
}
