// @license
// Copyright (c) 2026 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import { Server } from 'node:http';

import { CarsOriginMaster } from './cars-origin-master.ts';

/** The port used when the environment sets none */
export const defaultPort = 3000;

/**
 * Starts the master data server as the container runs it
 * @param env - The environment; `PORT` selects the port
 * @param log - Where the start message goes
 * @returns The listening server
 */
export async function start(
  env: Record<string, string | undefined> = process.env,
  log: (message: string) => void = console.log,
): Promise<Server> {
  const port = env['PORT'] ? Number(env['PORT']) : defaultPort;
  const server = await new CarsOriginMaster().listen(port);
  log(`cars-origin-master listens on port ${port}`);
  return server;
}
