// On définit exactement ce qu'on a le droit d'envoyer
export type NewTransferPayload = {
  amount: number;
  sourceId: number;
  targetId: number;
  date: string;
};