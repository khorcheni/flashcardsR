export type Card = {
  id: string;
  front: string;  // matches backend
  back: string;   // matches backend
};

export type Deck = {
  id: string;
  name: string;
  cards: Card[];
};
