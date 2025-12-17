import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import type { Card } from "./CardComponent";

interface Deck {
  id: string;
  name: string;
}

interface Props {
  deck: Deck;
  api: string;
  loadDecks: () => void;
  editDeck: (id: string) => void;
  deleteDeck: (id: string) => void;
}

const DeckComponent: React.FC<Props> = ({ deck, api, loadDecks, editDeck, deleteDeck }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  const loadCards = async () => {
    const res = await fetch(`${api}/decks/${deck.id}/cards`);
    const data = await res.json();
    setCards(data);
  };

  const addOrEditCard = async () => {
    if (!q.trim() || !a.trim()) return alert("Front & Back required");

    if (editingCardId) {
      // Edit existing card
      await fetch(`${api}/decks/${deck.id}/cards/${editingCardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front: q, back: a }),
      });
      setEditingCardId(null); // clear editing mode
    } else {
      // Add new card
      await fetch(`${api}/decks/${deck.id}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front: q, back: a }),
      });
    }

    setQ("");
    setA("");
    loadCards();
  };

  const deleteCard = async (cardId: string) => {
    await fetch(`${api}/decks/${deck.id}/cards/${cardId}`, { method: "DELETE" });
    if (editingCardId === cardId) setEditingCardId(null);
    loadCards();
  };

  const startEditing = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    setQ(card.front);
    setA(card.back);
    setEditingCardId(card.id);
  };

  useEffect(() => {
    loadDecks();
  }, []);

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div style={{ marginBottom: 30, background: "#fff", padding: 15, borderRadius: 8, boxShadow: "0 3px 6px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
        <b>{deck.name}</b>
        <span>
          <button 
          style={{
            padding: "6px 12px",
  marginRight: 8,
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
  transition: "0.2s",
}}
          onClick={() => editDeck(deck.id)}>Edit</button>  
          <button 
       style={{
  padding: "6px 12px",
  background: "#e53935",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
  transition: "0.2s",
}}
          onClick={() => deleteDeck(deck.id)}>Delete</button> 
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 15, marginBottom: 10 }}>
        {cards.map((c) => (
<CardComponent
  key={c.id}
  card={c}
  deleteCard={deleteCard}
  onEdit={() => startEditing(c.id)} // ✅ pass the required onEdit prop
/>        ))}
      </div>

      {/* Dropdown to select card to edit */}
      <div style={{ marginBottom: 10 }}>
        <select
          value={editingCardId || ""}
          onChange={(e) => startEditing(e.target.value)}
        >
          <option value="">-- Select card to edit --</option>
          {cards.map((c) => (
            <option key={c.id} value={c.id}>
              {c.front} → {c.back}
            </option>
          ))}
        </select>
      </div>

      {/* Inputs for front/back */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          style={{ flex: "1 1 35%", padding: 8, borderRadius: 5, border: "1px solid #ccc" }}
          placeholder="Front (question)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          style={{ flex: "1 1 35%", padding: 8, borderRadius: 5, border: "1px solid #ccc" }}
          placeholder="Back (answer)"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <button
          style={{
            flex: "1 1 15%",
            padding: 8,
            borderRadius: 5,
            border: "none",
            background: "#2196f3",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={addOrEditCard}
        >
          {editingCardId ? "Save Changes" : "Add Card"}
        </button>
      </div>
    </div>
  );
};

export default DeckComponent;
