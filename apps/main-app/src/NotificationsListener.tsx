import { useEffect, useState } from "react";

const NotificationsListener = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    function handleNotification(e: Event) {
      const customEvent = e as CustomEvent<{ message: string }>;
      const { message } = customEvent.detail ?? {};
      if (message) {
        setMessages((prev) => [...prev, message]);
      }
    }

    window.addEventListener(
      "app:notifications",
      handleNotification as EventListener,
    );

    return () => {
      window.removeEventListener(
        "app:notifications",
        handleNotification as EventListener,
      );
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <h2>Notifications</h2>
      {messages.length ? (
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationsListener;
