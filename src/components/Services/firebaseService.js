import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import firebaseConfig from "./config.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const readMachineData = async () => {
  try {
    const dbRef = ref(database, "machine_data");
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) {
      console.warn("⚠️ No data found in 'machine_data'");
      return {}; 
    }

    const data = snapshot.val();
    console.log("✅ Data fetched:", data);
    return data;
  } catch (error) {
    console.error("❌ Error reading data:", error);
    return {};
  }
};

export default readMachineData;
