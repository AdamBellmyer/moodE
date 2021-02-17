import type {Storage as storageType} from "./storage";
import type {Utilities as utilitiesType} from "./utilities";
import type * as discordConfig from "./discord/config-example";
import type {CommandHandler as commandHandlerType} from "./discord/handlers/commandHandler";
import type {MessageDeleteHandler as messageDeleteHandlerType}
  from "./discord/handlers/messageDeleteHandler";

declare global {
  let __listen: boolean;
  let __reloadInProgress: boolean;
  let __reloadModules: (message: import("discord.js").Message, args: string[]) => Promise<void>;
  const CommandHandler: commandHandlerType;
  const MessageDeleteHandler: messageDeleteHandlerType;
  const DiscordConfig: Partial<typeof discordConfig>;
  const Storage: storageType;
  const Utilities: utilitiesType;
}
