import Command from '../api/command';

import { Help } from './help';
import { Shutdown } from './shutdown';

import { Sauce } from './sauce';

export const commands: Command[] = [new Help(), new Sauce(), new Shutdown(),];
