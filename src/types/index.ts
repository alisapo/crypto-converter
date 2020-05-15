export type TCoin = {
    name: string;
    fullName: string;
    imageUrl: string;
    price: number;
    v24h: number;
};

export type TCoinDiff = { [key: string]: string };

export type TSelectedCurrency = {
    name: string;
    price: number;
};