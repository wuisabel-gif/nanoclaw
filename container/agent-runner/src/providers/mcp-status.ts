/**
 * The SDK's init/system message reports each configured MCP server's
 * connection status. Anything other than "connected" means the agent is
 * about to run without that server's tools, a silent capability loss unless
 * something says so. Kept dependency-free so it's trivially testable.
 */
export interface McpServerStatus {
  name: string;
  status: string;
}

/** MCP servers the SDK reports as anything other than connected. */
export function failedMcpServers(servers: McpServerStatus[] | undefined): McpServerStatus[] {
  return (servers ?? []).filter((s) => s.status !== 'connected');
}
