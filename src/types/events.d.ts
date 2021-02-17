import type {Message} from "discord.js";

export interface IEventDefinition<IEvent> {
  event: Dict<IEvent>;
}

interface IEvent {
  users?: string[];

  priority?: number;
  disabled?: boolean;

  commandPermissions?: number[];
  userPermissons?: number;

  pmOnly?: boolean;
  noPm?: boolean;

  process: (message: Message) => Promise<Message>;
  onLoad?: void;
}
