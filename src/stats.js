import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

export default async function getDashboardData(userId) {
  try {
    const booksRef = collection(db, "books");

    // Books Donated
    const donatedQuery = query(booksRef, where("donorId", "==", userId));
    const donatedSnap = await getDocs(donatedQuery);

    // Books Borrowed
    const borrowedQuery = query(booksRef, where("borrowerId", "==", userId));
    const borrowedSnap = await getDocs(borrowedQuery);

    // Debugging: list borrowed books
    console.log("Borrowed books docs:", borrowedSnap.docs.map(d => d.data()));

    // Requests Made
    const requestsRef = collection(db, "requests");
    const requestsQuery = query(requestsRef, where("requesterId", "==", userId));
    const requestsSnap = await getDocs(requestsQuery);

    // Requests Fulfilled
    const fulfilled = requestsSnap.docs.filter(doc => doc.data().status === "completed").length;

    return {
      donated: donatedSnap.size || 0,
      borrowed: borrowedSnap.size || 0,
      requests: requestsSnap.size || 0,
      fulfilled: fulfilled || 0,
    };
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    return {
      donated: 0,
      borrowed: 0,
      requests: 0,
      fulfilled: 0,
    };
  }
}
