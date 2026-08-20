/**
 * CoachHQ - Admin Seed Script
 * 
 * Run this script to create the initial admin user and sample data.
 * 
 * Prerequisites:
 * 1. Copy .env.example to .env and fill in your Firebase credentials
 * 2. Run: npm install firebase-admin (if not already installed)
 * 3. Run: node scripts/seed-admin.js
 * 
 * WARNING: This script will overwrite existing admin data. Run only once.
 */

const admin = require('firebase-admin');

// Initialize with service account or application default credentials
// For local development, use: GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"
// Or initialize manually with your service account JSON:

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

const ADMIN_EMAIL = 'admin@coachhq.com';
const ADMIN_PASSWORD = 'CoachHQ2025!Admin';
const ADMIN_NAME = 'Super Admin';

async function seed() {
  console.log('CoachHQ Admin Seed Script');
  console.log('========================\n');

  // 1. Create admin user in Firebase Auth
  let userRecord;
  try {
    userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
    console.log(`Admin user already exists: ${userRecord.uid}`);
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      userRecord = await auth.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        displayName: ADMIN_NAME,
        emailVerified: true,
      });
      console.log(`Created admin user: ${userRecord.uid}`);
    } else {
      throw e;
    }
  }

  // 2. Create admin document in Firestore
  await db.collection('admins').doc(userRecord.uid).set({
    email: ADMIN_EMAIL,
    displayName: ADMIN_NAME,
    role: 'super_admin',
    permissions: ['coaches', 'users', 'payments', 'settings'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('Created admin document in Firestore');

  // 3. Create sample coach (demo)
  const coachEmail = 'coach@coachhq.com';
  let coachRecord;
  try {
    coachRecord = await auth.getUserByEmail(coachEmail);
    console.log(`Sample coach already exists: ${coachRecord.uid}`);
  } catch (e) {
    if (e.code === 'auth/user-not-found') {
      coachRecord = await auth.createUser({
        email: coachEmail,
        password: 'CoachHQ2025!',
        displayName: 'Demo Coach',
        emailVerified: true,
      });
      console.log(`Created sample coach: ${coachRecord.uid}`);
    } else {
      throw e;
    }
  }

  await db.collection('coaches').doc(coachRecord.uid).set({
    email: coachEmail,
    displayName: 'Demo Coach',
    phone: '+212 612-345678',
    photoURL: '',
    language: 'fr',
    verificationStatus: 'verified',
    paymentToken: '',
    specialization: 'business',
    bio: 'Demo coach account for testing the platform.',
    bankDetails: {
      bankName: 'Attijariwafa Bank',
      accountNumber: '011 780 0001234567890123 45',
      rib: '011 780 0001234567890123 45',
    },
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('Created sample coach document in Firestore');

  // 4. Create sample course
  const courseRef = await db.collection('courses').add({
    coachId: coachRecord.uid,
    title: 'Business Leadership Mastery',
    description: 'Master the art of business leadership with practical strategies for the Moroccan market.',
    category: 'business',
    videoUrl: '',
    thumbnailUrl: '',
    transcripts: { ar: '', fr: '', en: '' },
    pricing: {
      basePrice: 799,
      vatRate: 0.20,
      vatAmount: 160,
      totalWithVat: 959,
      planType: 'subscription',
    },
    status: 'published',
    students: 23,
    rating: 4.8,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`Created sample course: ${courseRef.id}`);

  console.log('\n========================');
  console.log('Seed complete!');
  console.log('\nAdmin credentials:');
  console.log(`  Email:    ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log('\nCoach credentials:');
  console.log(`  Email:    ${coachEmail}`);
  console.log(`  Password: CoachHQ2025!`);
  console.log('\nIMPORTANT: Change these passwords in production!');
  
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
