# Nuxt UI MCP Server & Antigravity Setup

Source: https://ui.nuxt.com/docs/getting-started/ai/mcp · https://ui.nuxt.com/docs/getting-started/ai/skills

Nuxt UI ships an official **MCP server** at `https://ui.nuxt.com/mcp` giving agents live, structured, always-current access to component docs, props/slots/events, examples, and templates — more reliable than relying on a model's memorized knowledge of props. Pair it with this skill: the skill teaches *when/how* to build; the MCP gives *exact current API details*.

## Google Antigravity setup (primary target for this skill)

1. Open the MCP store via the **"..."** dropdown at the top of the editor's agent panel.
2. Click **"Manage MCP Servers"**.
3. Click **"View raw config"**.
4. Add this to `mcp_config.json`:
   ```json
   {
     "mcpServers": {
       "nuxt-ui": {
         "serverUrl": "https://ui.nuxt.com/mcp"
       }
     }
   }
   ```
5. Return to the "Manage MCP Servers" tab and click **"Refresh"**. The `nuxt-ui` server should now appear and its tools become available to the agent.

Once connected, prefer these MCP tools over guessing from memory:

| Tool | Use for |
|---|---|
| `search_components` | Find components by name/description/category (no params = list all) |
| `search_composables` | Find composables by name/description (no params = list all) |
| `search_icons` | Find Iconify icon names (defaults to `lucide`), returns `i-{prefix}-{name}` |
| `get_component` | Full component doc; pass `sections: ["usage","examples","api","theme","changelog"]` to fetch only what's needed |
| `get_component_metadata` | Lightweight props/slots/events only, no prose |
| `search_documentation` | Search all doc pages; filter with `section` (e.g. `"getting-started"`, `"components"`) |
| `get_documentation_page` | Fetch a doc page by path; `headings` param narrows to specific h2 sections |
| `list_templates` / `get_template` | Discover/inspect official starter templates |
| `list_examples` / `get_example` | Discover/inspect real usage-example code |
| `get_migration_guide` | v2→v3 / v3→v4 migration instructions |

Resources (browsable via `@` in agents that support it): `resource://nuxt-ui/components`, `resource://nuxt-ui/composables`, `resource://nuxt-ui/examples`, `resource://nuxt-ui/templates`, `resource://nuxt-ui/documentation-pages`.

Guided prompts (via `/` in agents that support it): `find_component_for_usecase`, `implement_component_with_props`, `setup_project_with_template`.

## Installing the official Nuxt UI *skill* (complements this one)

Nuxt UI also publishes its own maintained skill on GitHub (`nuxt/ui`, path `skills/nuxt-ui`). This local skill you're reading now is a superset built for comprehensiveness and Antigravity workflows; installing the official one too is optional but keeps you aligned with upstream changes:

```bash
npx skills add nuxt/ui             # via the skills.sh CLI (supports 35+ agents)
npx skills add nuxt/ui --agent cursor
npx skills add nuxt/ui --agent claude-code
npx skills add nuxt/ui --global    # available across all projects
```
If GitHub cloning is slow: `npx skills add https://ui.nuxt.com`. Once installed elsewhere, it's typically invoked with `/nuxt-ui` in that agent's chat.

## MCP setup for other tools (reference)

**Claude Code:**
```bash
claude mcp add --transport http nuxt-ui https://ui.nuxt.com/mcp
```

**Claude Desktop** (`claude_desktop_config.json`, via Settings → Developer → Edit Config):
```json
{
  "mcpServers": {
    "nuxt-ui": { "command": "npx", "args": ["mcp-remote", "https://ui.nuxt.com/mcp"] }
  }
}
```

**Cursor** (`.cursor/mcp.json`):
```json
{ "mcpServers": { "nuxt-ui": { "type": "http", "url": "https://ui.nuxt.com/mcp" } } }
```

**VS Code** (`.vscode/mcp.json`, requires GitHub Copilot + Copilot Chat extensions):
```json
{ "servers": { "nuxt-ui": { "type": "http", "url": "https://ui.nuxt.com/mcp" } } }
```

**Windsurf** (Settings → Cascade → Manage MCPs → View raw config):
```json
{ "mcpServers": { "nuxt-ui": { "serverUrl": "https://ui.nuxt.com/mcp" } } }
```

**Zed** (settings.json):
```json
{ "context_servers": { "nuxt-ui": { "url": "https://ui.nuxt.com/mcp" } } }
```

**Gemini CLI** (`~/.gemini/settings.json`):
```json
{ "mcpServers": { "nuxt-ui": { "httpUrl": "https://ui.nuxt.com/mcp" } } }
```

**GitHub Copilot CLI:** run `/mcp add`, Server Type `HTTP`, URL `https://ui.nuxt.com/mcp`, Tools `*`.

**ChatGPT** (Pro/Plus, web): Settings → Connectors → Advanced settings → Developer mode → new connector, name `Nuxt UI`, URL `https://ui.nuxt.com/mcp`, Authentication `None`.

## If MCP isn't available in a session

Fall back to direct fetches (no auth required):
- Full component index: `https://ui.nuxt.com/llms.txt` (~5K tokens, links to every page)
- Everything, including full prose/examples: `https://ui.nuxt.com/llms-full.txt` (~1M+ tokens — only pull this if the tool supports very large contexts and you need deep implementation detail)
- Any single doc page as clean markdown: `https://ui.nuxt.com/raw/docs/components/<kebab-case-name>.md` (e.g. `.../raw/docs/components/button.md`)
