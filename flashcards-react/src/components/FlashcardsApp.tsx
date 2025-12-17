import React, { useEffect, useState } from "react";
import DeckComponent from "./DeckComponent";

// Base API URL
const API = "http://127.0.0.1:5000/api";

// ------------------ Types ------------------
export interface Card {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  name: string;
  cards?: Card[];
}

interface FlashcardsAppProps {
  userEmail: string;
  onLogout: () => void;
}

// ------------------ Component ------------------
const FlashcardsApp: React.FC<FlashcardsAppProps> = ({ userEmail, onLogout }) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState("");

  useEffect(() => {
    loadDecks();
  }, []);

  // ------------------ Deck Functions ------------------
  const loadDecks = async () => {
    try {
      const res = await fetch(`${API}/decks/`);
      const data = await res.json();
      setDecks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load decks:", err);
      setDecks([]);
    }
  };

  const addDeck = async () => {
    if (!newDeckName.trim()) return alert("Deck name required");
    try {
      await fetch(`${API}/decks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDeckName }),
      });
      setNewDeckName("");
      loadDecks();
    } catch (err) {
      console.error("Failed to add deck:", err);
      alert("Failed to add deck");
    }
  };

  const editDeck = async (id: string) => {
    const name = prompt("Edit Deck Name");
    if (!name) return;
    try {
      await fetch(`${API}/decks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      loadDecks();
    } catch (err) {
      console.error("Failed to edit deck:", err);
      alert("Failed to edit deck");
    }
  };

  const deleteDeck = async (id: string) => {
    try {
      await fetch(`${API}/decks/${id}`, { method: "DELETE" });
      loadDecks();
    } catch (err) {
      console.error("Failed to delete deck:", err);
      alert("Failed to delete deck");
    }
  };

  // ------------------ Render ------------------
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#f0f4f8", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "12px 24px",
          backgroundColor: "#27ae60",
          color: "white",
          gap: "12px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{userEmail}</span>
        <button
          onClick={onLogout}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#e74c3c",
            color: "white",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Log out
        </button>
      </nav>

      <h1 style={{ textAlign: "center", color: "#333", marginTop: 20 }}>My Flashcards Application</h1>

      <div style={{ maxWidth: 900, margin: "20px auto" }}>
        {/* Add new deck */}
        <div
          style={{
            marginBottom: 20,
            background: "#fff",
            padding: 15,
            borderRadius: 8,
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          <input
            style={{ padding: 8, borderRadius: 5, border: "1px solid #ccc", marginRight: 5 }}
            placeholder="New Deck Name"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
          />
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 5,
              border: "none",
              background: "#4caf50",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={addDeck}
          >
            Add Deck
          </button>
        </div>

        {/* Deck list */}
        {decks.map((deck) => (
          <DeckComponent
            key={deck.id}
            deck={deck}
            loadDecks={loadDecks}
            editDeck={editDeck}
            deleteDeck={deleteDeck}
            api={API}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardsApp;
