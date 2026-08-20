import { createContext, useContext, useState, useEffect } from 'react';
import { isDemo } from '../config/firebase';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [coachData, setCoachData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = !!adminData;

  useEffect(() => {
    if (isDemo) {
      setCurrentUser(null);
      setCoachData(null);
      setAdminData(null);
      setLoading(false);
      return;
    }

    let unsubscribe;
    import('firebase/auth').then(({ onAuthStateChanged, getAuth }) => {
      const auth = getAuth();
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (user) {
          try {
            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('../config/firebase');
            // Check admins collection first
            const adminRef = doc(db, 'admins', user.uid);
            const adminSnap = await getDoc(adminRef);
            if (adminSnap.exists()) {
              setAdminData({ id: user.uid, ...adminSnap.data() });
              setCoachData(null);
            } else {
              setAdminData(null);
              const coachRef = doc(db, 'coaches', user.uid);
              const coachSnap = await getDoc(coachRef);
              if (coachSnap.exists()) {
                setCoachData({ id: user.uid, ...coachSnap.data() });
              }
            }
          } catch (e) {
            console.warn('Failed to load user data:', e);
          }
        } else {
          setCoachData(null);
          setAdminData(null);
        }
        setLoading(false);
      });
    });

    return () => unsubscribe?.();
  }, []);

  async function register(email, password, userData) {
    if (isDemo) throw new Error('Firebase not configured');
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');
    const { auth, db } = await import('../config/firebase');
    const { createCoachData } = await import('../config/models');

    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: userData.fullName });

    const coachDoc = createCoachData({
      email,
      displayName: userData.fullName,
      phone: userData.phone,
      language: userData.language,
    });

    await setDoc(doc(db, 'coaches', result.user.uid), coachDoc);
    setCoachData({ id: result.user.uid, ...coachDoc });

    return result;
  }

  async function login(email, password) {
    if (isDemo) throw new Error('Firebase not configured');
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('../config/firebase');
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    if (isDemo) throw new Error('Firebase not configured');
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const { doc, getDoc, setDoc } = await import('firebase/firestore');
    const { auth, db } = await import('../config/firebase');
    const { createCoachData } = await import('../config/models');

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const docRef = doc(db, 'coaches', result.user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const coachDoc = createCoachData({
        email: result.user.email,
        displayName: result.user.displayName,
        phone: '',
        language: 'fr',
      });
      await setDoc(docRef, coachDoc);
      setCoachData({ id: result.user.uid, ...coachDoc });
    }

    return result;
  }

  async function logout() {
    setCoachData(null);
    setAdminData(null);
    if (isDemo) {
      setCurrentUser(null);
      return;
    }
    const { signOut } = await import('firebase/auth');
    const { auth } = await import('../config/firebase');
    return signOut(auth);
  }

  function loginAsAdmin() {
    setCurrentUser({ uid: 'demo-admin', email: 'admin@coachhq.com', displayName: 'Super Admin' });
    setAdminData({
      id: 'demo-admin',
      email: 'admin@coachhq.com',
      displayName: 'Super Admin',
      role: 'super_admin',
      permissions: ['coaches', 'users', 'payments', 'settings'],
    });
    setCoachData(null);
  }

  function loginAsCoach() {
    setCurrentUser({ uid: 'demo-coach', email: 'coach@coachhq.com', displayName: 'Demo Coach' });
    setCoachData({
      id: 'demo-coach',
      email: 'coach@coachhq.com',
      displayName: 'Demo Coach',
      verificationStatus: 'verified',
      specialization: 'business',
    });
    setAdminData(null);
  }

  async function resetPassword(email) {
    if (isDemo) throw new Error('Firebase not configured');
    const { sendPasswordResetEmail } = await import('firebase/auth');
    const { auth } = await import('../config/firebase');
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    currentUser,
    coachData,
    adminData,
    isAdmin,
    loading,
    isDemo,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    loginAsAdmin,
    loginAsCoach,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
