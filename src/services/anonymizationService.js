/**
 * Client Anonymization Service
 * SOP Section 3.2: No real client names stored (aliases: Client_ABC123)
 * SOP Section 6: Anonymized client IDs for privacy
 */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Generate a unique anonymized client ID
 * Format: Client_XXXXXX (6 random alphanumeric characters)
 */
export function generateClientId() {
  let result = 'Client_';
  for (let i = 0; i < 6; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

/**
 * Encrypt sensitive data before storage
 * Uses Web Crypto API for AES-256-GCM encryption
 */
export async function encryptData(data, key) {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encoder.encode(JSON.stringify(data))
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
}

/**
 * Decrypt sensitive data
 */
export async function decryptData(encryptedObj, key) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encryptedObj.iv) },
    cryptoKey,
    new Uint8Array(encryptedObj.data)
  );

  return JSON.parse(decoder.decode(decrypted));
}

/**
 * Anonymize client data for storage
 * Strips PII and replaces with anonymized identifiers
 */
export function anonymizeClientData(clientData) {
  return {
    clientId: generateClientId(),
    coachId: clientData.coachId,
    displayName: `Client_${clientData.clientId || generateClientId().slice(-6)}`,
    email: null, // Encrypted separately
    phone: null, // Encrypted separately
    subscriptionPlan: clientData.subscriptionPlan || 'basic',
    accessLevel: 'basic',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Validate Moroccan phone number format
 * Format: +212 6XX-XXXXXX
 */
export function isValidMoroccanPhone(phone) {
  const regex = /^\+212[\s]?\d{3}[\s-]?\d{6}$/;
  return regex.test(phone);
}

/**
 * Validate Moroccan RIB (Releve d'Identite Bancaire)
 * 24 digits
 */
export function isValidRIB(rib) {
  const cleaned = rib.replace(/\s/g, '');
  return /^\d{24}$/.test(cleaned);
}

/**
 * Format phone number for display
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('212')) {
    return `+212 ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}