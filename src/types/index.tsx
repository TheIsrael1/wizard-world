export interface WizardInterface {
  id: string;
  firstName: string;
  lastName: string;
  elixirs: {
    id: string;
    name: string;
  }[];
}

export interface SpellsInterface {
  id: string;
  name: string;
  incatation: string;
  effect: string;
  canBeVerbal: boolean;
  type: string;
  light: string;
}

export interface ElixirsInterface {
  id: string;
  name: string;
  effect: string;
  sideEffects: string;
  characteristics?: string;
  time?: string;
  difficulty: string;
  ingredients: {
    id: string;
    name: string;
  }[];
}

export interface pageProps {
  wizards: WizardInterface[];
  spells: SpellsInterface[];
  elixirs: ElixirsInterface[];
  wizard: WizardInterface;
  elixir: ElixirsInterface;
  spell: SpellsInterface;
}
