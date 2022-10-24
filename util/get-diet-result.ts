import { Diet, Macro, MacroField } from "~~/types";
import { macroToMacroField } from "./macro-to-macro-field";

export function getDietAfterMeal(
  diet: Macro,
  totalMacros: Macro
): MacroField[] {
  return macroToMacroField({
    calories: diet.calories - totalMacros.calories,
    carb: diet.carb - totalMacros.carb,
    prot: diet.prot - totalMacros.prot,
    tfat: diet.tfat - totalMacros.tfat,
    sodium: diet.sodium - totalMacros.sodium,
    fiber: diet.fiber - totalMacros.fiber,
  });
}
