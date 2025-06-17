import requests


class TransactionsClient:
    def __init__(self, base_url="https://goodbudget.com"):
        self.base_url = base_url
        self.session = self.login_and_get_session()

    def login_and_get_session(self):
        session = requests.Session()
        # Use a valid GBSESS cookie from a browser session
        session.cookies.set(
            "GBSESS", "jo9ikkflemdijtuudl3qf0pj7v", domain="goodbudget.com")
        return session

    def create_transaction(self, payload):
        url = f"{self.base_url}/api/transactions/save?cltVersion=web"
        return self.session.post(url, data=payload)

    def get_transaction(self, transaction_id):
        url = f"{self.base_url}/api/transactions/get/{transaction_id}"
        return self.session.get(url)

    def delete_transaction(self, payload):
        url = f"{self.base_url}/api/transactions/save?cltVersion=web"
        return self.session.post(url, data=payload)
