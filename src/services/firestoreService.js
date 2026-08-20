import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// ============================================================
// COACH OPERATIONS
// ============================================================
export async function getCoachProfile(coachId) {
  const docRef = doc(db, 'coaches', coachId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function updateCoachProfile(coachId, data) {
  const docRef = doc(db, 'coaches', coachId);
  return updateDoc(docRef, { ...data, updatedAt: new Date() });
}

// ============================================================
// CONTENT OPERATIONS
// ============================================================
export async function createContent(coachId, contentData) {
  const docRef = await addDoc(collection(db, 'content'), {
    ...contentData,
    coachId,
    status: 'draft',
    students: 0,
    rating: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateContent(contentId, data) {
  const docRef = doc(db, 'content', contentId);
  return updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteContent(contentId) {
  return deleteDoc(doc(db, 'content', contentId));
}

export async function getCoachContent(coachId) {
  const q = query(
    collection(db, 'content'),
    where('coachId', '==', coachId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export function subscribeToCoachContent(coachId, callback) {
  const q = query(
    collection(db, 'content'),
    where('coachId', '==', coachId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const content = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(content);
  });
}

// ============================================================
// SESSION OPERATIONS
// ============================================================
export async function createSession(sessionData) {
  const docRef = await addDoc(collection(db, 'sessions'), {
    ...sessionData,
    status: 'scheduled',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateSession(sessionId, data) {
  const docRef = doc(db, 'sessions', sessionId);
  return updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

export async function cancelSession(sessionId) {
  return updateSession(sessionId, { status: 'cancelled' });
}

export async function completeSession(sessionId, notes = '') {
  return updateSession(sessionId, { status: 'completed', notes });
}

export async function getCoachSessions(coachId, status = null) {
  let q;
  if (status) {
    q = query(
      collection(db, 'sessions'),
      where('coachId', '==', coachId),
      where('status', '==', status),
      orderBy('scheduledTime', 'asc')
    );
  } else {
    q = query(
      collection(db, 'sessions'),
      where('coachId', '==', coachId),
      orderBy('scheduledTime', 'asc')
    );
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ============================================================
// CLIENT OPERATIONS
// ============================================================
export async function addClient(clientData) {
  const docRef = await addDoc(collection(db, 'clients'), {
    ...clientData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getCoachClients(coachId) {
  const q = query(
    collection(db, 'clients'),
    where('coachId', '==', coachId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ============================================================
// PAYMENT OPERATIONS
// ============================================================
export async function recordPayment(paymentData) {
  const docRef = await addDoc(collection(db, 'payments'), {
    ...paymentData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getCoachPayments(coachId) {
  const q = query(
    collection(db, 'payments'),
    where('coachId', '==', coachId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ============================================================
// FILE UPLOAD
// ============================================================
export async function uploadVideo(coachId, file, onProgress) {
  const storageRef = ref(storage, `videos/${coachId}/${Date.now()}_${file.name}`);
  
  // Upload with progress tracking
  const uploadTask = uploadBytes(storageRef, file);
  
  const snapshot = await uploadTask;
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return {
    url: downloadURL,
    path: snapshot.ref.fullPath,
  };
}

export async function uploadThumbnail(coachId, file) {
  const storageRef = ref(storage, `thumbnails/${coachId}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}