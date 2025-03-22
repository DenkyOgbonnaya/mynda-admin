import NaijaStates from 'naija-state-local-government';

export default function useStates() {
  const states = NaijaStates.states();
  return states
    .map((state: string) =>
      state === 'Federal Capital Territory'
        ? {label: 'Abuja', value: state}
        : {label: state, value: state},
    )
    .sort((a: any, b: any) => a.label > b.label);
}
