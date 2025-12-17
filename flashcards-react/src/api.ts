const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'


async function request(path:string, options: RequestInit = {}){
const res = await fetch(`${BASE}${path}`, {
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
...options,
})
if (!res.ok) throw new Error(await res.text())
return res.status===204 ? null : res.json()
}


export const api = {
listDecks: () => request('/api/decks'),
getDeck: (id:string) => request(`/api/decks/${id}`),
createDeck: (payload:{name:string;description?:string}) => request('/api/decks',{method:'POST', body:JSON.stringify(payload)}),
updateDeck: (id:string,payload:object) => request(`/api/decks/${id}`,{method:'PUT', body:JSON.stringify(payload)}),
deleteDeck: (id:string) => request(`/api/decks/${id}`,{method:'DELETE'}),
listCards: (deckId:string) => request(`/api/decks/${deckId}/cards`),
createCard: (deckId:string,payload:{front:string;back:string}) => request(`/api/decks/${deckId}/cards`,{method:'POST', body:JSON.stringify(payload)}),
updateCard: (deckId:string, cardId:string, payload:object) => request(`/api/decks/${deckId}/cards/${cardId}`,{method:'PUT', body:JSON.stringify(payload)}),
deleteCard: (deckId:string, cardId:string) => request(`/api/decks/${deckId}/cards/${cardId}`,{method:'DELETE'}),
}
export default api