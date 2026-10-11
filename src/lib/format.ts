const unitLabels: Record<string, string> = {
kg: "কেজি",
litre: "লিটার",
liter: "লিটার",
dozen: "ডজন",
piece: "পিস",
};

export const toBn = (n: number) => n.toLocaleString("bn-BD");

export const toBnFixed = (n: number, digits = 1) =>
n.toLocaleString("bn-BD", {
minimumFractionDigits: digits,
maximumFractionDigits: digits,
});

export const unitBn = (unit: string) => unitLabels[unit] ?? unit;
