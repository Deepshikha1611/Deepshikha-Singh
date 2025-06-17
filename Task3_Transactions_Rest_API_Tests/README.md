# GoodBudget Transaction API Test Suite

This repository contains automated tests for the GoodBudget transaction API endpoints. It covers create, get, and delete operations using Python and pytest, following best practices for REST API testing.

## Setup Instructions

1. Clone the Repository

```
git clone https://github.com/yourusername/goodbudget-api-tests.git
cd goodbudget-api-tests
```

2. Create a Virtual Environment

```
python -m venv venv
venv\Scripts\activate   # On Windows
source venv/bin/activate   # On macOS/Linux
```

3. Install Required Dependencies

```
pip install -r requirements.txt
```

4. Configure the Environment

Create a `.env` file in the project root directory and define the following variable:

```
GBSESS=your_valid_GBSESS_cookie
```

The GBSESS value is required for authenticated API access. You can obtain it from browser developer tools after logging into GoodBudget.

## How to Run the Tests

To execute all test cases:

```
pytest
```

To generate an HTML report:

```
pytest --html=reports/test_report.html --self-contained-html
```

Then open `reports/test_report.html` in a browser to view the results.

## Project Structure

```
Task3_Transactions_API_Tests/
├── tests/
│   └── test_transactions.py
├── utils/
│   └── api_client.py
├── .env
├── requirements.txt
├── pytest.ini
└── reports/
    └── test_report.html
```

## Test Approach

The test suite covers the following API operations:

- Create Transaction
- Get Transaction by UUID
- Delete Transaction

Each test validates HTTP status codes and JSON response payloads. Base64 encoding is used for the `d` payload field as required by the API. The suite ensures data consistency and handles both valid and edge-case flows.

## Technology Stack and Rationale

| Tool          | Purpose                         | Rationale                                         |
| ------------- | ------------------------------- | ------------------------------------------------- |
| Python        | Scripting language              | Concise, readable, widely adopted in testing      |
| requests      | HTTP client                     | Reliable, easy to use for REST API calls          |
| pytest        | Test framework                  | Modular, plugin support, rich reporting           |
| python-dotenv | Environment variable management | Secure handling of sensitive session information  |
| pytest-html   | Reporting                       | Generates readable HTML reports for documentation |

This stack provides a balance of simplicity, flexibility, and effectiveness for API testing.

## Notes

- All test data must correspond to valid GoodBudget account, envelope, and transaction identifiers.
- The test suite depends on a valid session cookie (`GBSESS`) to authenticate requests.
- Do not commit the `.env` file or session cookies to public version control.

## License

This project is for demonstration and evaluation purposes only.
