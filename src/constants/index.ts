export const BASE_URL = "https://api-personal-financial.vercel.app/";

const currentYear = new Date().getFullYear();

export let years: string[] = [];

for (let i = 2022; i <= currentYear; i++) {
  years.push(i.toString());
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
