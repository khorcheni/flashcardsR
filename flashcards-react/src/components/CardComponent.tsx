import React, { useState } from "react";

export interface Card {
  id: string;
  front: string;
  back: string;
}

interface Props {
  card: Card;
  onEdit: (card: Card) => void;
  deleteCard: (cardId: string) => void;
}

const CardComponent: React.FC<Props> = ({ card, onEdit, deleteCard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ width: 200, height: 120, perspective: 1000, margin: 10 }}
      onClick={(e) => {
        if (!(e.target as HTMLElement).matches("button")) setFlipped(!flipped);
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 10,
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 16,
            color: "#333",
            backgroundColor: "#ffeb3b",
            padding: 10,
          }}
        >
          {card.front}
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 16,
            color: "#fff",
            backgroundColor: "#4caf50",
            padding: 10,
          }}
        >
          <div>{card.back}</div>
          <button
            style={{
              position: "absolute",
              bottom: 5,
              left: 5,
              backgroundColor: "#2196f3",
              border: "none",
              borderRadius: 4,
              color: "#fff",
              padding: "2px 6px",
              cursor: "pointer",
            }}
            onClick={() => onEdit(card)}
          >
            Edit
          </button>
          <button
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              backgroundColor: "#f44336",
              border: "none",
              borderRadius: 4,
              color: "#fff",
              padding: "2px 6px",
              cursor: "pointer",
            }}
            onClick={() => deleteCard(card.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
