interface IExchangeRate {
    [key: string]: number;
}

export const exchangeRate: IExchangeRate = {
    "USD": 1,
    "PKR": 223.67,
    "CAD": 1.34,
    "INR": 81.81,
    "EUR": 0.95,
    "SAR": 3.76,
    "AED": 3.67
}

export const supportedCurrencies = [
    "USD - UD Dollar",
    "PKR - Pakistani Rupee",
    "CAD - Canadian Dollar",
    "INR - Indian Rupee",
    "EUR - Euro",
    "SAR - Saudi Riyal",
    "AED - UAE Dirham"
]