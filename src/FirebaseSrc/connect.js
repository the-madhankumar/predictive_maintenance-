import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDo-skDncgltOZ3kOuYx_yIx-1dTqkxnZQ",
    authDomain: "predictive-83210.firebaseapp.com",
    databaseURL: "https://predictive-83210-default-rtdb.firebaseio.com",
    projectId: "predictive-83210",
    storageBucket: "predictive-83210.firebasestorage.app",
    messagingSenderId: "1039093420943",
    appId: "1:1039093420943:web:d503affdb04c87147b71fa"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const machineRef = ref(database, "machine_data");

onValue(machineRef, (snapshot) => {
    const data = snapshot.val();

    // single data
    const entries = Object.entries(data);
    const [latestId, latestValues] = entries
    console.log(latestValues)

    // if (data) {
    //     console.log("✅ All machine data:");
    //     Object.entries(data).forEach(([id, values]) => {
    //         console.log(`Machine ID: ${id}`);
    //         console.log(values);
    //         console.log("----------------------------");
    //     });
    // } else {
    //     console.log("⚠️ No machine data found in database.");
    // }
});