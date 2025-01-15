import { Link } from "react-router";

const Settings = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: 8,
        }}
      >
        <h1>Settings</h1>
        <Link to="/">Go to Home</Link>
      </div>
      <p>Some content goes here</p>
    </div>
  );
};

export default Settings;
