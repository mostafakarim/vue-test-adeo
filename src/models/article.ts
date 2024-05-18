import { Period } from "./period"

export type Article = {
  id: Number,
  numero: Number,
  label: String,
  Rayon: String,
  photo: String,
  periods?: Period[]
}
