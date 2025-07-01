import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notifList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h6 className="mb-0">Notifikasi Perubahan Profil</h6>
      </div>
      <div className="card-body" style={{ maxHeight: "200px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <p className="text-muted mb-0">Belum ada notifikasi.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {notifications.map(notif => (
              <li key={notif.id} className="list-group-item">
                {notif.message} <br />
                <small className="text-muted">{new Date(notif.timestamp.seconds * 1000).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
