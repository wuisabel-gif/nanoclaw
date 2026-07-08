import { describe, it, expect } from 'bun:test';

import { failedMcpServers } from './mcp-status.js';

describe('failedMcpServers', () => {
  it('flags every server not in the connected state', () => {
    const failed = failedMcpServers([
      { name: 'ok', status: 'connected' },
      { name: 'bad', status: 'failed' },
      { name: 'auth', status: 'needs-auth' },
      { name: 'slow', status: 'pending' },
    ]);
    expect(failed.map((s) => s.name)).toEqual(['bad', 'auth', 'slow']);
  });

  it('returns nothing when all servers are connected', () => {
    expect(failedMcpServers([{ name: 'a', status: 'connected' }])).toEqual([]);
  });

  it('tolerates undefined and empty input', () => {
    expect(failedMcpServers(undefined)).toEqual([]);
    expect(failedMcpServers([])).toEqual([]);
  });
});
