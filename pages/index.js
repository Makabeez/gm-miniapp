import { useState, useEffect } from "react";

const chains = [
  { name: "Ethereum", logo: "/logos/ethereum.png" },
  { name: "Base", logo: "/logos/base.png" },
  { name: "Optimism", logo: "/logos/optimism.png" },
  { name: "Arbitrum", logo: "/logos/arbitrum.png" },
  { name: "Polygon", logo: "/logos/polygon.png" },
  { name: "BNB Chain", logo: "/logos/bnb.png" },
  { name: "Solana", logo: "/logos/solana.png" },
  { name: "Avalanche", logo: "/logos/avalanche.png" },
  { name: "Linea", logo: "/logos/linea.png" },
  { name: "Scroll", logo: "/logos/scroll.png" },
  { name: "Zora", logo: "/logos/zora.png" }
];

const gmMessages = [
  "GM ☀️",
  "Good Morning 🌍",
  "Rise & Shine 🌞",
  "Another day in Web3 🚀",
  "GM Frenz 💎",
  "Keep Building 🛠️",
  "Stay DeFi 🔗",
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [gm, setGm] = useState("");

  const handleClick = (chain) => {
    setSelected(chain);
    setGm(gmMessages[Math.floor(Math.random() * gmMessages.length)]);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>GM App 🌐</h1>
      <p>Select a chain to send a GM:</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
        {chains.map((chain) => (
          <div
            key={chain.name}
            onClick={() => handleClick(chain)}
            style={{
              width: "120px",
              padding: "15px 10px",
              border: selected?.name === chain.name ? "2px solid #0070f3" : "1px solid #ddd",
              borderRadius: "12px",
              cursor: "pointer",
              background: selected?.name === chain.name ? "#e0f7fa" : "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img src={chain.logo} alt={chain.name} width={40} height={40} style={{ marginBottom: "8px" }} />
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>{chain.name}</span>
          </div>
        ))}
      </div>

      {gm && selected && (
        <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #eee", borderRadius: "12px", background: "#f9f9f9" }}>
          <h2>{gm} on {selected.name}!</h2>
          <p>
            Support my work ❤️<br />
            Send <b>0.20 USDC</b> on Base to:
          </p>
          <code style={{ 
            background: "#eaeaea", 
            padding: "10px", 
            borderRadius: "6px", 
            display: "inline-block",
            marginTop: "10px",
            fontSize: "12px",
            wordBreak: "break-all"
           }}>
            0xa361F8aBF168b8c84485B86B4656327dF483E053
          </code>
        </div>
      )}
    </div>
  );
}
