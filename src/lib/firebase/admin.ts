import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: rawPrivateKey?.includes("\\n") ? rawPrivateKey.replace(/\\n/g, "\n") : rawPrivateKey
};

function initAdminApp(): App {
  if (getApps().length) return getApps()[0]!;
  if (!firebaseAdminConfig.projectId || !firebaseAdminConfig.clientEmail || !firebaseAdminConfig.privateKey) {
    throw new Error("Missing Firebase admin credentials");
  }
  return initializeApp({
    credential: cert(firebaseAdminConfig)
  });
}

export const adminApp = initAdminApp();
export const adminAuth = getAuth(adminApp);
