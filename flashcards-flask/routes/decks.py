from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import uuid

deck_bp = Blueprint('deck_bp', __name__)

def get_db():
    return firestore.client()

# ---------------- Decks ----------------

@deck_bp.route('/', methods=['GET', 'POST'])
def decks():
    db = get_db()

    if request.method == 'GET':
        decks_ref = db.collection('decks')
        decks_docs = decks_ref.stream()
        decks_list = []

        for doc in decks_docs:
            data = doc.to_dict()
            data['id'] = doc.id
            decks_list.append(data)

        return jsonify(decks_list)

    # POST - create new deck
    data = request.json or {}
    new_id = str(uuid.uuid4())

    deck_data = {
        'name': data.get('name', ''),
        'description': data.get('description', ''),
        'cards': []
    }

    db.collection('decks').document(new_id).set(deck_data)
    deck_data['id'] = new_id
    return jsonify(deck_data), 201


@deck_bp.route('/<deck_id>', methods=['GET', 'PUT', 'DELETE'])
def deck_detail(deck_id):
    db = get_db()
    doc_ref = db.collection('decks').document(deck_id)
    doc = doc_ref.get()

    if not doc.exists:
        return jsonify({'error': 'Deck not found'}), 404

    if request.method == 'GET':
        data = doc.to_dict()
        data['id'] = doc.id
        return jsonify(data)

    if request.method == 'PUT':
        update_data = request.json or {}
        doc_ref.update({
            'name': update_data.get('name', doc.to_dict().get('name')),
            'description': update_data.get('description', doc.to_dict().get('description'))
        })

        updated = doc_ref.get().to_dict()
        updated['id'] = deck_id
        return jsonify(updated)

    # DELETE
    doc_ref.delete()
    return '', 204


# ---------------- Cards ----------------

@deck_bp.route('/<deck_id>/cards', methods=['GET', 'POST'])
def cards(deck_id):
    db = get_db()
    deck_ref = db.collection('decks').document(deck_id)
    deck_doc = deck_ref.get()

    if not deck_doc.exists:
        return jsonify({'error': 'Deck not found'}), 404

    if request.method == 'GET':
        return jsonify(deck_doc.to_dict().get('cards', []))

    # POST - add a card
    data = request.json or {}
    new_card = {
        'id': str(uuid.uuid4()),
        'front': data.get('front', ''),
        'back': data.get('back', '')
    }

    deck_ref.update({
        'cards': firestore.ArrayUnion([new_card])
    })

    return jsonify(new_card), 201


@deck_bp.route('/<deck_id>/cards/<card_id>', methods=['PUT', 'DELETE'])
def card_detail(deck_id, card_id):
    db = get_db()
    deck_ref = db.collection('decks').document(deck_id)
    deck_doc = deck_ref.get()

    if not deck_doc.exists:
        return jsonify({'error': 'Deck not found'}), 404

    cards = deck_doc.to_dict().get('cards', [])

    if request.method == 'PUT':
        update_data = request.json or {}
        for card in cards:
            if card['id'] == card_id:
                card['front'] = update_data.get('front', card['front'])
                card['back'] = update_data.get('back', card['back'])
                break

        deck_ref.update({'cards': cards})
        return jsonify(cards)

    # DELETE
    cards = [c for c in cards if c['id'] != card_id]
    deck_ref.update({'cards': cards})
    return '', 204
