import { collection, addDoc } from "firebase/firestore";
import { db } from " C:/Users/madhuravalli akshaya/OneDrive/Desktop/Mentis/myapp/src/firebase/firebaseConfig"; // make sure this points to your firebaseConfig

const receivers = [
  {
    name: "ED Foundation Orphanage",
    type: "Orphanage",
    city: "Palakol",
    description: "Shelter and education for orphaned children",
    needs: ["10th textbooks", "School bags"],
    verified: false
  },
  {
    name: "Raju Family",
    type: "Poor Family",
    city: "West Godavari",
    description: "Daily wage family struggling to afford school books",
    needs: ["8th class books", "Stationery"],
    verified: false
  },
  {
    name: "Government High School",
    type: "Government School",
    city: "Bhimavaram",
    description: "Rural government school with limited resources",
    needs: ["Science textbooks", "Lab manuals"],
    verified: false
  },
  {
    name: "Sneha Shelter Home",
    type: "Shelter Home",
    city: "Palakol",
    description: "Temporary shelter for homeless children",
    needs: ["Story books", "Notebooks"],
    verified: false
  }
];

async function seedReceivers() {
  for (let r of receivers) {
    try {
      await addDoc(collection(db, "receivers"), r);
      console.log(`Added: ${r.name}`);
    } catch (err) {
      console.error("Error adding document:", err);
    }
  }
}

seedReceivers();
