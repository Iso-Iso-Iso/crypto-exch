export type Currency = { [key: string]: number };

export interface CurrenciesData {
    base_currency: string;
    currencies: Currency;
}
