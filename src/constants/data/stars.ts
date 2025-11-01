export const SELECT_STARS = [
  {
    label: "No seleccionado",
    value: "none",
  },
  {
    label: "5 Estrellas",
    value: "five_stars",
  },
  {
    label: "4 Estrellas",
    value: "four_stars",
  },
  {
    label: "3 Estrellas",
    value: "three_stars",
  },
  {
    label: "2 Estrellas",
    value: "two_stars",
  },
  {
    label: "1 Estrella",
    value: "one_star",
  },
];

export const STARS_ENUM = [
  "none",
  "five_stars",
  "four_stars",
  "three_stars",
  "two_stars",
  "one_star",
] as const;

export const STARS_COLORS: Record<string, string> = {
  five_stars: "after:bg-five-star",
  four_stars: "after:bg-four-star",
  three_stars: "after:bg-three-star",
  two_stars: "after:bg-two-star",
  one_star: "after:bg-one-star",
};
