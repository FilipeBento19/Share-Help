import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB2lWt-tcHKBnefsi1wewG2sniXyUx25Y0",
  authDomain: "sharehelp-5a199.firebaseapp.com",
  projectId: "sharehelp-5a199",
  storageBucket: "sharehelp-5a199.firebasestorage.app",
  messagingSenderId: "960501957214",
  appId: "1:960501957214:web:3d7017f3b6235fa36b2acf"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Authentication
export const auth = getAuth(app)

export default app


