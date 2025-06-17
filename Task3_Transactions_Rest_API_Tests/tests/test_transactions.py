import base64
import json
import uuid
from utils.api_client import TransactionsClient

client = TransactionsClient()


def encode_transaction_data(transaction_dict):
    return base64.b64encode(json.dumps(transaction_dict).encode()).decode()


def test_create_transaction():
    transaction_data = {
        "created": "2025-06-17 09:35:27",
        "uuid": str(uuid.uuid4()),
        "receiver": "Test grocery expense",
        "note": "",
        "envelope": "019777cd-9b2f-8043-8a40-a5e3c4254a66",
        "account": "01977b44-58c2-8082-8440-92695a22e873",
        "amount": "100",
        "type": "DEB",
        "check_num": ""
    }

    encoded = encode_transaction_data(transaction_data)
    payload = {
        "cltVersion": "web",
        "id": transaction_data["uuid"],
        "household_id": "019777cd-9b18-8001-85a7-729ec4248c5a",
        "n": "random_nonce",
        "o": "transaction",
        "d": encoded
    }

    response = client.create_transaction(payload)
    assert response.status_code == 200
    assert response.json().get("status") in [200, 202, 204]


def test_get_transaction():
    transaction_id = "eac14217-502f-46d5-ac83-b07c9b057188"  # use a valid UUID
    response = client.get_transaction(transaction_id)
    assert response.status_code == 200
    data = response.json()
    assert data["uuid"] == transaction_id
    assert float(data["amount"]) < 0


def test_delete_transaction():
    transaction_data = {
        "created": "2025-06-17 09:35:27",
        "uuid": "380bb811-a071-4548-ac79-b6abf4cc8485",
        "receiver": "Test grocery expense",
        "status": "DEL",
        "note": "This is a test note.",
        "envelope": "019777cd-9b2f-8043-8a40-a5e3c4254a66",
        "account": "01977b44-58c2-8082-8440-92695a22e873",
        "amount": "100.00",
        "nonce": "ec516b1077b95a110fe884e51d69e969864620e3",
        "type": "DEB",
        "check_num": ""
    }

    encoded = encode_transaction_data(transaction_data)
    payload = {
        "cltVersion": "web",
        "id": transaction_data["uuid"],
        "household_id": "019777cd-9b18-8001-85a7-729ec4248c5a",
        "n": transaction_data["nonce"],
        "o": "transaction",
        "d": encoded
    }

    response = client.delete_transaction(payload)
    assert response.status_code == 200
    assert response.json()["reason"] in ["Record Deleted",
                                         "Record Already Modified, Skipping."]
