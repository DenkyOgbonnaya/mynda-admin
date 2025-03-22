import NaijaStates from "naija-state-local-government";
interface Option {
  label: string;
  value: string;
}

export default function useLgas(state: string): Option[] {
  if (!state) return [];

  const result = NaijaStates.lgas(state);
  if (!result || !result.lgas) {
    console.warn(`No LGAs found for state: ${state}`);
    return [];
  }

  return result.lgas.map((lga: string) => ({
    label: lga,
    value: lga,
  }));
}

// export default function useLgas(state: string) {
//   if (!state) return [];
//   return NaijaStates.lgas(state).lgas?.map((lga: string) => ({
//     label: lga,
//     value: lga,
//   }));
// }
