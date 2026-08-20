/**
 * Firestore Data Models for CoachHQ
 * Based on SOP Section 3.2 - Data Architecture
 */

// ============================================================
// COACH MODEL
// ============================================================
/**
 * @typedef {Object} Coach
 * @property {string} coachId - Auto-generated Firestore ID
 * @property {string} email - Encrypted email
 * @property {string} displayName - Full name
 * @property {string} phone - Moroccan format (+212)
 * @property {string} photoURL - Profile photo URL
 * @property {string} language - Preferred language (ar/fr/en)
 * @property {string} verificationStatus - 'pending' | 'verified' | 'rejected'
 * @property {string} paymentToken - PayMob reference token
 * @property {string} specialization - 'life' | 'business' | 'career' | 'health'
 * @property {string} bio - Multilingual bio
 * @property {Object} bankDetails - Payout information
 * @property {Date} createdAt - Account creation date
 * @property {Date} updatedAt - Last update date
 */

export const createCoachData = ({
  email,
  displayName,
  phone,
  language = 'fr',
  specialization = 'life',
  bio = '',
}) => ({
  email,
  displayName,
  phone,
  photoURL: '',
  language,
  verificationStatus: 'pending',
  paymentToken: '',
  specialization,
  bio,
  bankDetails: {
    bankName: '',
    accountNumber: '',
    rib: '',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});

// ============================================================
// CLIENT MODEL (Anonymized)
// ============================================================
/**
 * @typedef {Object} Client
 * @property {string} clientId - Anonymized ID (Client_XY7)
 * @property {string} coachId - Reference to coach
 * @property {string} displayName - Anonymized name
 * @property {string} email - Encrypted email
 * @property {string} subscriptionPlan - Current plan
 * @property {string} accessLevel - 'basic' | 'premium' | 'vip'
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

export const generateAnonymizedId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'Client_';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createClientData = ({
  coachId,
  displayName,
  email,
  subscriptionPlan = 'basic',
}) => ({
  clientId: generateAnonymizedId(),
  coachId,
  displayName,
  email,
  subscriptionPlan,
  accessLevel: 'basic',
  createdAt: new Date(),
  updatedAt: new Date(),
});

// ============================================================
// CONTENT MODEL
// ============================================================
/**
 * @typedef {Object} Content
 * @property {string} contentId - Auto-generated ID
 * @property {string} coachId - Reference to coach
 * @property {string} title - Course title
 * @property {string} description - Course description
 * @property {string} category - 'life' | 'business' | 'career' | 'health'
 * @property {string} videoUrl - Vimeo URL
 * @property {string} thumbnailUrl - Thumbnail URL
 * @property {Object} transcripts - { ar: '', fr: '', en: '' }
 * @property {Object} pricing - { basePrice: number, vatRate: 0.20, planType: string }
 * @property {string} status - 'draft' | 'published' | 'archived'
 * @property {number} students - Enrolled student count
 * @property {number} rating - Average rating
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

export const createContentData = ({
  coachId,
  title,
  description = '',
  category = 'life',
  videoUrl = '',
  basePrice = 0,
  planType = 'subscription',
}) => ({
  contentId: '',
  coachId,
  title,
  description,
  category,
  videoUrl,
  thumbnailUrl: '',
  transcripts: { ar: '', fr: '', en: '' },
  pricing: {
    basePrice,
    vatRate: 0.20,
    vatAmount: Math.round(basePrice * 0.20),
    totalWithVat: Math.round(basePrice * 1.20),
    planType,
  },
  status: 'draft',
  students: 0,
  rating: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// ============================================================
// SESSION MODEL
// ============================================================
/**
 * @typedef {Object} Session
 * @property {string} sessionId - Auto-generated ID
 * @property {string} coachId - Reference to coach
 * @property {string} clientId - Anonymized client ID
 * @property {Date} scheduledTime - Session date/time
 * @property {number} duration - Duration in minutes
 * @property {string} timezone - Client timezone
 * @property {string} status - 'scheduled' | 'completed' | 'cancelled'
 * @property {boolean} isRamadanAdjusted - Ramadan scheduling flag
 * @property {string} notes - Session notes
 * @property {Date} createdAt
 */

export const createSessionData = ({
  coachId,
  clientId,
  scheduledTime,
  duration = 60,
  timezone = 'Africa/Casablanca',
  isRamadanAdjusted = false,
}) => ({
  sessionId: '',
  coachId,
  clientId,
  scheduledTime,
  duration,
  timezone,
  status: 'scheduled',
  isRamadanAdjusted,
  notes: '',
  createdAt: new Date(),
});

// ============================================================
// PAYMENT MODEL
// ============================================================
/**
 * @typedef {Object} Payment
 * @property {string} paymentId - Auto-generated ID
 * @property {string} coachId - Reference to coach
 * @property {string} clientId - Anonymized client ID
 * @property {string} contentId - Reference to content
 * @property {number} amount - Base amount in MAD
 * @property {number} vatAmount - VAT amount (20%)
 * @property {number} totalAmount - Total with VAT
 * @property {string} currency - 'MAD'
 * @property {string} status - 'pending' | 'completed' | 'failed' | 'refunded'
 * @property {string} paymobReference - PayMob transaction reference
 * @property {Date} createdAt
 */

export const createPaymentData = ({
  coachId,
  clientId,
  contentId,
  amount,
  paymobReference = '',
}) => ({
  paymentId: '',
  coachId,
  clientId,
  contentId,
  amount,
  vatAmount: Math.round(amount * 0.20),
  totalAmount: Math.round(amount * 1.20),
  currency: 'MAD',
  status: 'pending',
  paymobReference,
  createdAt: new Date(),
});

// ============================================================
// ADMIN MODEL
// ============================================================
/**
 * @typedef {Object} Admin
 * @property {string} adminId - Firestore UID
 * @property {string} email - Admin email
 * @property {string} displayName - Admin name
 * @property {string} role - 'super_admin' | 'admin' | 'moderator'
 * @property {string[]} permissions - Array of permission strings
 * @property {Date} createdAt
 * @property {Date} lastLogin
 */

export const createAdminData = ({
  email,
  displayName,
  role = 'admin',
  permissions = [],
}) => ({
  email,
  displayName,
  role,
  permissions,
  createdAt: new Date(),
  lastLogin: new Date(),
});

// ============================================================
// VAT UTILITIES
// ============================================================
export const VAT_RATE = 0.20;

export const calculateVAT = (basePrice) => {
  const vatAmount = Math.round(basePrice * VAT_RATE);
  return {
    basePrice,
    vatAmount,
    totalWithVat: basePrice + vatAmount,
  };
};