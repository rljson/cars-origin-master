// @license
// Copyright (c) 2026 Rljson
//
// Use of this source code is governed by terms that can be
// found in the LICENSE file in the root of this package.

import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from 'node:http';

/**
 * Returns the greeting of this package.
 * @returns The line "Hello from cars-origin-master"
 */
export function hello(): string {
  return 'Hello from cars-origin-master';
}

// .............................................................................
/**
 * The master of the origin side, where catalogs are captured originally.
 *
 * - `GET /` answers its greeting as text
 * - `GET /api/hello` answers `{ lines: string[] }` with its greeting
 * - `GET /health` answers `ok`
 */
export class CarsOriginMaster {
  /** Example instance for test purposes */
  static get example(): CarsOriginMaster {
    return new CarsOriginMaster();
  }

  /** The lines `GET /api/hello` answers */
  helloLines(): string[] {
    return [hello()];
  }

  /**
   * Answers one request
   * @param req - The incoming request
   * @param res - The response to write
   */
  handle(req: IncomingMessage, res: ServerResponse): void {
    const path = (req.url ?? '/').split('?')[0];

    if (req.method === 'GET' && path === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }

    if (req.method === 'GET' && path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(hello());
      return;
    }

    if (req.method === 'GET' && path === '/api/hello') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ lines: this.helloLines() }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  }

  /**
   * Starts an HTTP server
   * @param port - The port to listen on; 0 picks a free one
   * @returns The listening server
   */
  listen(port: number): Promise<Server> {
    const server = createServer((req, res) => this.handle(req, res));
    return new Promise((resolve) => {
      server.listen(port, () => resolve(server));
    });
  }
}
