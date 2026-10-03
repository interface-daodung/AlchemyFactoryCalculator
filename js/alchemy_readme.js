// alchemy_readme.js: Embedded README content (EN + VI) so the "Full Documentation"
// wiki view works even when the app is opened locally via file:// (fetch() is
// blocked by browsers under file:// for local resources).
// NOTE: Keep this in sync manually with README.md / README.vi.md when those change.

window.ALCHEMY_README = {

en: `[EN](README.md) | [Tiếng Việt](README.vi.md)

# Alchemy Factory Calculator

A browser-based production planning tool for the game **Alchemy Factory**.
Precisely calculates raw material consumption, machine counts, heat/nutrient loads, and profitability for any production chain.

**Live version:** [https://starfi5h.github.io/AlchemyFactoryCalculator](https://starfi5h.github.io/AlchemyFactoryCalculator)

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🌲 **Production Tree** | Recursive tree from raw ore to finished product, with per-node machine counts and rates |
| 🔄 **Recipe Switching** | Swap between alternative recipes per node; Advanced Athanor catalyst selection |
| ♻️ **Byproduct Recycling** | Route byproducts back into the chain to reduce imports |
| 📦 **Multi-target Mode** | Plan multiple production goals simultaneously with shared infrastructure |
| 🗺️ **Planner** | Free-form node-graph editor for designing factory layouts, with modules, auto-layout, and live flow resolution |
| ⚗️ **Cauldron Calculator** | Brute-force cauldron combination search with favorites and DB sync |
| 📖 **Wiki** | Built-in item and machine database browser with recipe cross-references |
| 🛠️ **Database Editor** | Edit recipes, items, and translations directly in the browser |
| 💾 **Persistent Storage** | All settings, recipes, and lists auto-saved to browser \`localStorage\` |
| 🌐 **Bilingual UI** | Toggle between English and Simplified Chinese; fully customizable translations |
| 🔗 **Shareable URLs** | Current item and rate are reflected in the URL for easy sharing |

---

## 🚀 Getting Started

#### Online
Open [https://starfi5h.github.io/AlchemyFactoryCalculator](https://starfi5h.github.io/AlchemyFactoryCalculator) in any modern browser. No installation required.

#### Local
1. Download or clone this repository.
2. Open \`index.html\` directly in your browser.
3. No server, build step, or dependencies required.

---

## 📐 Calculator Tab

### Setting a Target

Type an item name into the search box (supports partial match) or click **☰** to open the **Item Picker**. The picker supports category browsing, a Tier slider, and attribute filters for Sell Price, Wholesale Price, and Cauldron Target.

**Single-target mode**:
- Use the **Belt Load Fraction** slider to set the target as a fraction of belt capacity (1/12 to Full).
- Or enter a precise **Rate (Items/Min)** directly.
- Toggle **Set by Machine Count** to reverse the calculation — enter a number of machines and the rate is computed for you.

**Multi-target mode**:
- Add as many target rows as needed; each is independent, and rows can be reordered by dragging the handle.
- Use **💾 Save List / 📂 Load List** to persist multi-target sets in the browser.
- Enable **Self-Fuel** or **Self-Fert** to automatically deduct factory consumption from the net output of the fuel/fertilizer item itself. The engine iterates to a stable equilibrium.
- **⚡ Fuel/Fert 1-Machine Quick Set** instantly fills the list with two rows (the selected fuel and fertilizer items), each set to a single fully-loaded machine's rate.
- If Self-Fuel or Self-Fert cannot converge because supply is too low or the calculation diverges, an equilibrium warning is shown above the production tree.

### Upgrades

Enter your current research levels in the **Upgrades** panel on the right:

| Field | Effect |
|---|---|
| **Logistics Efficiency** | Increases belt speed (items/min per belt) |
| **Factory Efficiency** | Multiplies all machine processing speeds |
| **Alchemy Skill** | Increases yield on Extractors, Alembics, and Thermal Extractors |
| **Fuel Efficiency** | Increases the heat value of fuel |
| **Fert Efficiency** | Increases the nutrient value of fertilizer |

Upgrade levels and logistics settings are saved automatically whenever they change; no manual save button is required.

### Logistics

| Setting | Description |
|---|---|
| **Heating Device** | Choose the furnace type (Stone Furnace / Blast Furnace / Steam Heating Pad); affects slot sharing and heat output |
| **Fuel Source** | The item used as fuel; also used to express total heat load as item counts |
| **Fertilizer Source** | The item used as fertilizer; used for nursery calculations |
| **Manage Custom Costs** | Set a custom gold cost per item, used in place of buy price / to price external inputs that have no buy price |
| **Node Size** | Scale the production tree cards up or down |
| **Show Belt Count** | Display belt usage alongside each node's rate |
| **Show Machine Usage** | Display fuel/fertilizer consumption on each node |
| **Show Machine Max Cap** | Show maximum capacity of the ceiled machine count |
| **Show Machine Heat & Nutr** | Show per-machine heat (P/s) and nutrient (V/s) on each node |
| **Show Raw Machine Count** | Show fractional machine counts (up to two decimals) instead of rounded-up counts |

### Reading the Production Tree

Each node shows:
- **Rate** (items/min) — click this number to open the **Scale Modal**
- **Belt count** (if enabled)
- **Machine count** (ceiled) with a tooltip showing cycle time, throughput, and speed multiplier
- **Byproducts** in purple
- **Heat** and **Nutrient** costs in their respective colors
- **Gold cost** for purchased raw materials
- Catalyst nodes may show a toggle to expand or collapse their catalyst input subtree.
- Click an item name to open a drill-down in a new tab with that item and rate as URL parameters.

Rate numbers shown in **red** mean belt capacity is exceeded.

**Controls on each node:**
- **▼/▶ arrow** — collapse/expand the subtree (state is remembered)
- **🔄 button** — open the recipe selector to switch production methods
- **♻️ button** — enable byproduct recycling for that node (appears when a byproduct is consumed elsewhere in the chain)
- **☐ checkbox** — mark demand as **External Input**; the node will not be produced internally and appears in the External Inputs summary instead

Use **Recycle All / Un-recycle All** at the top of each production chain section to toggle all recyclers at once, and the **💠** icon to expand/collapse the whole first level at once.

Below the tree, a **Common Nodes** section lists any item+machine combination that appears more than once across the chain (e.g. shared intermediates), with links back to every occurrence, and a **Byproducts** section summarises unconsumed byproducts with links to their producers.

### Switching Recipes & Catalysts

Click **🔄** on any node to open the recipe selector:
- Choose an alternative recipe (e.g., Athanor vs. Advanced Athanor for Coke).
- For **Advanced Athanor** recipes, select one or more **catalysts** (Unstable / Fertile / Resonant / Eternal) to change output ratios or input requirements.
- For the **Paradox Crucible**'s custom-input recipe, pick which item to feed in via the Item Picker.
- Recipe overrides can be applied **Globally** or **This Node Only**, via the scope toggle at the top of the modal (only shown when switching a recipe on a specific tree node).
- Items with a \`cauldronTarget\` also show an **+ Add Cauldron Recipe** button to open the [Cauldron Recipe Modal](#cauldron-recipe-modal).

### Scale Modal

Click any **rate number** to open the Scale Modal. Three linked fields update each other in real time:
- **Output Rate (/min)**
- **Belt Count** — at current belt speed
- **Machine Count**

Edit any field; the **Scaling Ratio** updates automatically. Click **Apply** to rescale the entire production tree proportionally.

### Summary Box

The bar above the tree shows four blocks:

| Block | Content |
|---|---|
| **Gross Output** | Total production rate before internal consumption |
| **Total Load** | Factory heat (P/min) and nutrient (V/min) demand, plus fuel/fert item equivalents |
| **Unit Cost** | Coin, heat, and nutrient cost per output item (or, with exactly two multi-targets set to the fuel and fertilizer items, the solved gold-equivalent value of the fuel/fertilizer itself) |
| **Unit Value** | Conversion cost vs. Retail Price and Wholesale Price, as a ratio |

### Construction List

The right panel lists every machine type and count required. Click a machine name to expand and see the **total raw materials** needed to build all machines of that type. The **Total Materials Required** section at the bottom also shows estimated **inventory slot** counts based on max stack sizes, plus total machine count and flat/compact footprint tile counts.

### Send to Planner

The **Send to Planner** button (in the Save/Reset panel) exports the current calculator production tree straight into the Planner tab as a node graph — see [Importing from the Calculator](#importing-from-the-calculator) below.

---

## 🗺️ Planner Tab

The Planner is a free-form, Satisfactory-Modeler-style node-graph editor: instead of a single recursive tree rooted at one target item, you place recipe nodes freely, wire their input/output ports together, and the tool resolves how much of each item actually flows across every connection.

### Plan Library

The Planner can hold multiple independent **plans**, each with its own set of nodes and connections.

- The dropdown in the toolbar switches between plans; **📁 Manage Plans** opens a modal listing every plan.
- In the manager you can **drag to reorder**, **rename in place** (double-click the name field that appears), **duplicate**, **delete**, or **export** a single plan as a \`.json\` file. **New Plan** creates a blank plan, and **⭱ Import** loads a previously exported \`.json\`.
- **📦 Import as Module** inserts a selected existing plan directly as a module node in the current canvas.
- Every plan keeps its own **undo/redo history** and remembers the **viewport** (pan/zoom) you last left it at for the current browser session.

### Canvas Basics

- **+ Add Node** or **right-click** an empty area of the canvas opens the Item Picker; picking an item with a recipe drops a new node there.
- **Drag a node's header** to move it; drag empty canvas to pan the view.
- **▭ Select Mode** switches the canvas into box-select: drag a rectangle to select multiple nodes, then drag any selected node's header to move the whole group together, or press **Delete/Backspace** to remove them all at once.
- **Ctrl/Cmd+click** toggles a single node selection outside Select Mode. **Shift+drag** on empty canvas temporarily box-selects without changing modes.
- **Zoom** with the mouse wheel, pinch-to-zoom on touch devices, or the **+ / −** buttons; **⤢ Fit to View** (or the **F** key) frames all nodes.
- The **⊞ Grid Snap** button cycles node-dragging snap between three grid sizes and off.
- **↺ Undo / ↻ Redo** (or **Ctrl+Z / Ctrl+Y**) step through that plan's edit history.

### Nodes & Ports

Each node represents one recipe at a chosen **machine count** (which can be fractional) and shows its input ports on the left and output ports on the right:

- **Port dot colors** — gray: unconnected; green: connected and balanced; yellow (output): surplus beyond what's connected; red (input): still short of what's needed after connections.
- Hovering a node's header shows a tooltip with that recipe's full input/output/fuel/fertilizer rates **per single machine**.
- Drag from a port's dot to another compatible port (same item, opposite direction) to connect them; dragging onto empty canvas instead opens a small recipe picker (filtered to recipes that produce/consume that item) and creates a new connected node in one step.
- Clicking a connection's flow-rate label opens an **Edge Modal** showing source/target, current flow, and lets you type an exact target flow (which resizes the machine counts on both ends to match) or delete the connection.
- The Edge Modal lets you reorder multiple connections on the same port with source/target priority ▲/▼ controls, and set or reset an edge color.

### Node Settings (⚙)

Opens a modal with:
- The current recipe's full input/output breakdown, plus **catalyst toggles** for Advanced Athanor recipes or an **input-item picker** for the Paradox Crucible's custom recipe.
- A **recipe-switch list**, grouped by the node's main output item, to swap to any alternative recipe for that item.
- A **Port Balance** section (only shown when at least one connected port is unbalanced) with one-click buttons per item to adjust the node's machine count so a specific connected input/output exactly matches what its connections need.
- **Graph Tools**: Select All Upstream, Auto-Layout Upstream (tidies all upstream nodes into a tree layout), Populate All Upstream (recursively auto-generates missing upstream production, see below), and Clear All Upstream.

### Auto-Generating Upstream Production

The **⚡ button** on a node's machine-count row inspects that node's unmet input demand and auto-creates one upstream node per missing input (using its preferred recipe), sized and pre-connected to exactly cover the shortfall, laid out to the node's left. **Populate All Upstream** (in the Node Settings modal) repeats this recursively until the whole upstream chain has no more shortages, skipping recipes that would recurse into themselves.

### Linking Machine Counts

The chain-link button next to a node's machine-count input toggles **Link Mode**. While active, changing one node's machine count (or setting an exact flow value in the Edge Modal) proportionally scales the machine counts of every node connected to it, so an entire sub-chain can be resized together instead of one node at a time.

### Module Nodes

A node can also reference an entire other plan as a **module**: it exposes that plan's *net* unconnected inputs/outputs as its own ports (i.e. whatever that plan doesn't already produce/consume internally), plus its total fuel/fertilizer draw. Its Node Settings modal shows a **📦 Load Module** button that switches the Planner to that referenced plan. The tool detects circular module references and flags them as an error on the node instead of resolving them.

Select a group of nodes and click **📦 Encapsulate** to create a new plan from the selection and replace it with a module node. The internal connections are retained inside the new module.

Use **🔀 Optimize Port Order** in the lower-right canvas controls to optimize all port orders; dropping a node also performs a single-node port-order optimization.

### Portal Nodes

The **+ 🌀 Portal** tool adds a portal node for external item movement. Set its item by clicking its title and use **⇄** to switch the visual input/output direction.

### Summary Panel

A collapsible floating panel (top-left of the canvas) totals the whole current plan into four sections: **Total Load** (gold/fuel/fertilizer consumption), **Output** (unconnected output surplus), **Input** (unmet input shortage), and **Machines** (machine counts by type). Each section can be collapsed independently, and the whole panel can be minimized to a small button.

### Importing from the Calculator

The Calculator tab's **Send to Planner** button converts its current production tree into a Planner node graph inside the active plan: recipe nodes are aggregated by recipe id (with machine counts summed), parent/child edges are created for the main flows, and any byproduct recycling in the calculator is translated into extra recycle edges. New nodes are laid out automatically (upstream tree layout) and the view is fit to show them; edges left with essentially zero flow after resolution are dropped.

---

## ⚗️ Cauldron Tab

### Cauldron Types

- **Standard Cauldron (3-slot):** \`T = (Cost₁ + Cost₂ + Cost₃) × Ratio\`
  - All different → ×1.0, Two same → ×0.65, All same → ×0.5
  - Output is the item whose \`cauldronTarget\` is nearest to T.
- **Advanced Cauldron (2-slot):**
  - Same + Same → \`T = Cost₁\`, searches **upward** for the nearest product.
  - A + B (different) → \`T = |Cost₁ − Cost₂|\`, searches for the nearest product whose target value is less than the maximum of the two cauldron costs.

Switch type with the **Cauldron / Advanced Cauldron** toggle at the top.

### Candidate Pool & Profiles

The left panel lists all items eligible as cauldron ingredients (must have a \`cauldronCost\` and not be a liquid). Check or uncheck items to include them in the search.

Three independent **Profiles** let you store different candidate sets:
- **Profile 1** — All valid ingredients (default)
- **Profile 2** — Herb-chain items (auto-generated from herbal production chains)
- **Profile 3** — Gold/currency-based items

Use **Select All / Deselect All** to bulk-configure the active profile. The **🌿** button resets the pool to a herb-focused preset, and **💰** resets it to a gold/currency-focused preset.

Sort the pool by cauldron cost with **Sort by Value** and toggle ascending/descending with **🔼/🔽**.

### Slot Filters & Search

Lock up to three **Set Input** slots to restrict the search to combinations containing a specific item at a fixed position. Use the **+/−** arrows below each slot to cycle through items in cost order. **Set Target Output** can restrict results to one selected product.

Filter by ratio type with the checkboxes: **2 Diff, 3 Diff, 2 Same, 3 Same**.

Results recalculate immediately whenever a filter or slot condition changes.

### Results & Favorites

Results are grouped by output item and collapsed by default. Click an item to expand its compatible ingredient combinations. Items that cannot be produced by any combination appear in the **Unattainable Targets** section.

Click **★** on any recipe row to save it to **Saved Recipes** (right panel). From there:
- **Export** — save all favorites as a \`.txt\` file (format: \`Item1 + Item2 (+ Item3) = Product\`)
- **Import** — load a \`.txt\` file to bulk-import recipes
- **Sync DB** — inject all saved cauldron recipes into the main production database so the Calculator can include cauldron steps in full production chains
- **Show Estimated Cost** displays estimated costs in single-step results, and **Order by Est. Cost** sorts them by that estimate.

### Cauldron Recipe Modal

From the Calculator's recipe selector, items with a \`cauldronTarget\` show a shortcut button to open the **Cauldron Recipe Modal**. Here you can:
- Pick ingredients for each slot with the Item Picker or cycle with **+/−** arrows.
- See the computed T value, valid range \`[lower, upper]\`, and distance to each bound in real time.
- Green = combination hits the target; Red = it does not.
- Click **★** to save to favorites, or **Apply** (only enabled on a hit) to instantly register the recipe in the Calculator and set it as preferred.

### Multi-Step Optimization

Switch to **Multiple Steps** (next to **Single Step** at the top of the Cauldron tab) to search for cheaper *multi-stage* cauldron chains — recipes that themselves consume the output of an earlier cauldron combination — instead of a single combination search.

- The table shows one row per item and one column per optimization round (**Step 0** through **Step 4**). **Step 0** is the base cost of each candidate item; each subsequent step re-runs the cauldron search using the previous step's items as ingredients, keeping only combinations that are *cheaper* than what's already known for that item.
- Costs that didn't improve over the previous step are grayed out, so you can see at a glance which items actually benefited from another round of optimization.
- Click the **▲** button on any cell to highlight and filter the table down to just that item and its full upstream ingredient chain — every cell that was actually used to reach that result lights up. Click the same **▲** again to clear the filter.
- Click **★** on any cell to save that step's recipe to **Saved Recipes**, same as the Single Step results.
- Hover the cost number for a per-item **Ingredients Cost** / **Heat Cost** breakdown (in coins), and hover an ingredient icon to see its name and the cost value used in that calculation.
- **⚙ Cost Settings** lets you set the Heat-to-coin and Nutrient-to-coin conversion rates used to estimate costs throughout the Cauldron tab (also shown as an editable, searchable list of every item's estimated base cost).
- **Max Intermediate Items** (1–3) limits the number of intermediate products retained in multi-step optimization chains.

---

## 📖 Wiki Tab

Four sub-views accessible from the top navigation:

| View | Description |
|---|---|
| **Items** | Searchable icon grid of all items, with chip-based filters (Category, Tier, Sell Price, Wholesale Price, Cauldron Target); click any item for stats, production recipes, and usage |
| **Machines** | Searchable machine list; click any machine for properties, build cost, and all associated recipes |
| **Contracts** | Contract reward and production limits calculator with configurable daily work time and upgrade boosts |
| **Full Documentation** | Embedded README viewer with the complete documentation, rendered by the built-in Markdown renderer |

Both Items and Machines views provide chip filters; Machines can be filtered by Tier and Heat Cost. In the Items view, click **★** next to any recipe to set it as the preferred recipe for that item (synced with the Calculator).
Click any item in a recipe row to navigate directly to its detail page.

### Contracts View

The **Contracts** view lists the available contract items and calculates their daily limits and revenue. It provides three saved parameters:

- **Working Hours / Day** — the number of hours available for contract work (1 hour in-game = 1 minute real time). this controls **Units/min**.
- **Contract Amount Boost (%)** — increases the base daily contract limit.
- **Contract Profit Boost (%)** — increases each contract's base reward. The resulting reward is rounded down to a whole number before revenue is calculated.

The table shows the item, units per contract, reward coin type, daily maximum, units per minute, maximum daily revenue, required level, and dispatch requirement. Click any **Units/min** value to send that item and rate to the Calculator tab as the current target.

---

## 🛠️ Database Editor Tab

Select a target from the dropdown:
- **Database** — full item, machine, and recipe data
- **Translations** — the \`ALCHEMY_I18N\` object controlling all UI strings and item/machine names
- **Settings** — current user preferences as JSON
- **(\\*BACKUP)** variants — previous versions automatically saved before each apply

Edit the JSON directly in the textarea, then click **Apply Changes** to reload immediately. Use **Export to File** to save a copy.

> **Warning:** Applying a new Database reloads the page and overwrites the local copy. Keep backups via Export before applying.

---

## 🌐 Language & Localization

Click **🌐 EN/Tiếng Việt** in the header to toggle between English and Vietnamese.

The translation layer (\`alchemy_i18n.js\`) maps every item name, machine name, category, and UI string. You can customize it in the **Database Editor → Translations**. Changes persist in \`localStorage\`.

---

## 🔗 URL Parameters

The URL reflects the current state and can be bookmarked or shared:

| Parameter | Description | Example |
|---|---|---|
| \`item\` | Target item name | \`?item=Steel%20Ingot\` |
| \`rate\` | Production rate (items/min) | \`&rate=60\` |
| \`tab\` | Active tab on load | \`&tab=cauldron\` |
| \`lang\` | Force language (\`en\` to force English) | \`&lang=en\` |
| \`fuel\` | Override fuel source | \`&fuel=Coke\` |
| \`fert\` | Override fertilizer source | \`&fert=Basic%20Fertilizer\` |
| \`setupgrades\` | Comma-separated upgrade levels (indices 0–9) | \`&setupgrades=5,0,3,2,1,1,0,0,0,0\` |

> The \`setupgrades\` indices map to: \`[0]\` Logistics, \`[1]\` (unused), \`[2]\` Factory Efficiency, \`[3]\` Alchemy Skill, \`[4]\` Fuel Efficiency, \`[5]\` Fert Efficiency, \`[6]\` Sales Ability, \`[7–9]\` (unused).

---

## ⚙️ Reset Options

| Button | Effect |
|---|---|
| **Reset Recipes** | Clear the local database, restoring the bundled version (backup saved automatically) |
| **Reset Translations** | Clear local translation overrides (backup saved automatically) |
| **All Data Reset** | Clear all \`localStorage\` entries and reload with defaults |

When the bundled database (\`alchemy_db.js\`) has a newer version than your local copy, an **update banner** appears at the top. You can choose to **Update Now** (overwrites local data but preserves your settings) or **Skip Update**.

---

## 🏗️ Project Structure

\`\`\`
AlchemyFactoryCalculator/
├── index.html                      # Main HTML shell, tab layout, modals
├── style.css                       # All styles (CSS custom properties, dark theme)
├── js/
│   ├── alchemy_db.js              # Game data — items, machines, recipes
│   ├── alchemy_i18n.js            # Translation table (EN/VI) + t() helper
│   ├── alchemy_state.js           # Global application state, default settings, persistence and localStorage
│   ├── alchemy_main.js            # Application entry point, initialization, URL state, module coordination
│   ├── alchemy_ui.js              # Shared UI logic: settings, combobox, item picker, slider, and modals
│   ├── alchemy_calc_engine.js     # Pure calculation engine (tree building, aggregation)
│   ├── alchemy_calc.js            # Calculator UI renderer (DOM, modals, tree nodes)
│   ├── alchemy_cauldron.js        # Cauldron simulation, favorites, sync
│   ├── alchemy_help.js            # Wiki (guides, item browser, machine browser)
│   ├── alchemy_readme.js          # README.md / README.vi.md embedded as JS, so the wiki works under file://
│   ├── alchemy_planner.js         # Planner core: canvas, nodes, edges, plan library, view controls
│   ├── alchemy_planner_calc.js    # Planner flow-resolution engine, auto-layout, module/import logic
│   └── alchemy_planner_overlays.js # Planner overlays: plan manager, node settings, edge modal, summary panel
\`\`\`

No build tools, bundlers, or external dependencies. Pure HTML + CSS + vanilla JavaScript.

### Why \`alchemy_readme.js\` exists

The Wiki → **Full Documentation** tab renders this very file as Markdown. It resolves the content
in two steps, and \`alchemy_readme.js\` exists to cover the second one:

1. It first looks for \`window.ALCHEMY_README[lang]\` in \`alchemy_readme.js\` — a plain JS object with
   one template literal per language:

   \`\`\`js
   window.ALCHEMY_README = {
       en: \`[EN](README.md) | ...\`,
       vi: \`[English](README.md) | ...\`,
   };
   \`\`\`

2. Only if that key is missing does it \`fetch()\` the \`.md\` file from disk.

The reason for the embedded copy is the \`file://\` scheme. Browsers block \`fetch()\` for local
resources there, so a user who downloads the repo and just double-clicks \`index.html\` would see an
empty documentation tab. The \`fetch\` path still exists for the hosted version, so the Markdown
file remains the source of truth and the JS is a mirror.

The trade-off is that there is no build step to regenerate the mirror, so the two can drift apart.
When editing documentation, update **all** of:

| Location | Language |
|---|---|
| \`README.md\` | English |
| \`js/alchemy_readme.js\` → \`en\` | English |
| \`README.vi.md\` | Vietnamese |
| \`js/alchemy_readme.js\` → \`vi\` | Vietnamese |

A one-line script keeps the embedded copy honest:

\`\`\`js
// regenerate README.vi.md from the embedded copy
const vm = require('vm'), fs = require('fs');
const s = { window: {} }; vm.createContext(s);
vm.runInContext(fs.readFileSync('js/alchemy_readme.js', 'utf8'), s);
fs.writeFileSync('README.vi.md', s.window.ALCHEMY_README.vi, 'utf8');
\`\`\`

---

## 🤝 Contributing & Customization

- **Fork freely.** All data and logic are in plain text files.
- To add a new item or recipe, edit \`alchemy_db.js\` (or use the Database Editor in the browser).
- To add or fix a translation, edit \`alchemy_i18n.js\` or use Database Editor → Translations.
- To change the documentation, edit the Markdown files **and** the matching blocks in \`alchemy_readme.js\` — see [Why \`alchemy_readme.js\` exists](#why-alchemy_readme-js-exists).
- The calculation engine (\`alchemy_calc_engine.js\`) is fully decoupled from the UI and can be used independently.

---

*This calculator is a fork of the original [AlchemyFactoryCalculator](https://joejoesgit.github.io/AlchemyFactoryCalculator/) by JoeJoesGit, with added Vietnamese localization, the Cauldron Calculator, the Wiki, the Planner, incremental database update notifications, and various UI enhancements.*  
*The data is from [AlchemyFactoryData](https://github.com/faultyd3v/AlchemyFactoryData) by faultyd3v.*  
`,

vi: `[English](README.md) | [Tiếng Việt](README.vi.md)

# Máy Tính Nhà Máy Giả Kim

Công cụ tính toán kế hoạch sản xuất trên trình duyệt cho trò chơi **Alchemy Factory**.
Tính toán chính xác tiêu hao nguyên liệu, số lượng máy, tải nhiệt/dinh dưỡng và lợi nhuận cho bất kỳ chuỗi sản xuất nào.

**Phiên bản trực tuyến:** [https://starfi5h.github.io/AlchemyFactoryCalculator](https://starfi5h.github.io/AlchemyFactoryCalculator)

---

## ✨ Tính Năng Nổi Bật

| Tính Năng | Mô Tả |
|---|---|
| 🌲 **Cây Sản Xuất** | Cây đệ quy từ quặng thô đến thành phẩm, hiển thị số máy và tốc độ từng nút |
| 🔄 **Chuyển Đổi Công Thức** | Chuyển đổi giữa các công thức thay thế tại mỗi nút; lò giả kim nâng cao hỗ trợ chọn chất xúc tác |
| ♻️ **Tái Chế Phế Phẩm** | Đưa phế phẩm trở lại chuỗi sản xuất để giảm đầu vào bên ngoài |
| 📦 **Chế Độ Đa Mục Tiêu** | Lập kế hoạch nhiều mục tiêu sản xuất cùng lúc với cơ sở hạ tầng dùng chung |
| 🗺️ **Trình Lập Kế Hoạch** | Trình chỉnh sửa đồ thị nút tự do để thiết kế bố cục nhà máy, hỗ trợ mô-đun, tự động bố cục và tính dòng thời gian thực |
| ⚗️ **Máy Tính Vạc Hắc Kim** | Tìm kiếm tổ hợp công thức vạc hắc kim theo phương pháp vét cùng, hỗ trợ lưu và đồng bộ với máy tính |
| 📖 **Wiki** | Cơ sở dữ liệu vật phẩm và máy có sẵn với tra cứu chéo công thức |
| 🛠️ **Trình Chỉnh Sửa Dữ Liệu** | Chỉnh sửa công thức, vật phẩm và bản dịch trực tiếp trong trình duyệt |
| 💾 **Lưu Trữ Bền Vững** | Tất cả cài đặt, công thức và danh sách tự động lưu vào \`localStorage\` của trình duyệt |
| 🌐 **Giao Diện Song Ngữ** | Chuyển đổi giữa tiếng Anh và tiếng Việt; nội dung dịch hoàn toàn có thể tùy chỉnh |
| 🔗 **Liên Kết Chia Sẻ** | Vật phẩm và tốc độ hiện tại được phản ánh trong URL để dễ chia sẻ |

---

## 🚀 Bắt Đầu Nhanh

#### Trực tuyến
Mở [https://starfi5h.github.io/AlchemyFactoryCalculator](https://starfi5h.github.io/AlchemyFactoryCalculator) trong bất kỳ trình duyệt hiện đại nào. Không cần cài đặt.

#### Cục bộ
1. Tải xuống hoặc clone kho lưu trữ này.
2. Mở \`index.html\` trực tiếp trong trình duyệt.
3. Không cần máy chủ, bước dựng hoặc bất kỳ phụ thuộc nào.

---

## 📐 Trang Máy Tính

### Đặt Mục Tiêu Sản Xuất và Tốc Độ

Nhập tên vật phẩm vào **ô tìm kiếm** (hỗ trợ khớp mờ) hoặc nhấp vào **☰** để mở **trình chọn vật phẩm**. Trình chọn hỗ trợ duyệt theo danh mục và lọc theo thuộc tính.

**Chế độ một mục tiêu:**
- Kéo **thanh tỷ lệ tải băng tải** đặt thành một phần của sức chở băng tải (1/12 đến Full).
- Hoặc nhập trực tiếp **tốc độ (vật phẩm/phút)** chính xác.
- Bật **đặt theo số lượng máy** để tính ngược—nhập số máy, tự động suy ra tốc độ sản xuất.

**Chế độ đa mục tiêu:**
- Có thể thêm bất kỳ số lượng hàng mục tiêu, mỗi hàng đặt độc lập và có thể kéo để sắp xếp lại.
- Dùng **💾 Lưu danh sách / 📂 Tải danh sách** để lưu đa mục tiêu vào trình duyệt.
- Bật **tự cung nhiên liệu** hoặc **tự cung phân bón**, engine sẽ tự động lặp đến cân bằng ổn định, trừ tiêu thụ nội bộ của nhà máy khỏi sản lượng ròng.
- **⚡ Đặt nhanh nhiên liệu/phân bón (1 máy)** sẽ tạo ngay hai hàng mục tiêu (vật phẩm nhiên liệu và phân bón đã chọn), tốc độ mỗi hàng đặt bằng sản lượng một máy tải đầy.
- Khi tự cung nhiên liệu hoặc tự cung phân bón không hội tụ do thiếu nguồn hoặc phát tán, cảnh báo cân bằng sẽ hiển thị phía trên cây sản xuất.

### Cấp Độ Nâng Cấp

Điền cấp độ nghiên cứu hiện tại trong trò chơi vào bảng **Nâng cấp** bên phải:

| Trường | Hiệu Ứng |
|---|---|
| **Hiệu quả hậu cần** | Tăng tốc độ băng tải (vật phẩm/phút) |
| **Hiệu quả nhà máy** | Tăng tốc độ xử lý của tất cả máy |
| **Kỹ năng giả kim** | Tăng sản lượng máy trích xuất, bình chưng cất và máy trích nhiệt |
| **Hiệu quả nhiên liệu** | Tăng giá trị nhiệt của nhiên liệu |
| **Hiệu quả phân bón** | Tăng giá trị dinh dưỡng của phân bón |

Cấp độ nâng cấp và cài đặt hậu cần được tự động lưu khi thay đổi, không cần lưu thủ công.

### Cài Đặt Hậu Cần

| Cài Đặt | Mô Tả |
|---|---|
| **Thiết bị sưởi ấm** | Chọn loại nguồn nhiệt (lò đá / lò cao / đệm sưởi hơi nước), ảnh hưởng chia sẻ ô và sản lượng nhiệt |
| **Nguồn nhiên liệu** | Vật phẩm dùng làm nhiên liệu; tải nhiệt cũng được quy đổi thành tiêu thụ vật phẩm này |
| **Nguồn phân bón** | Vật phẩm dùng làm phân bón; dùng cho tính toán vường ươm |
| **Quản lý chi phí tùy chỉnh** | Đặt chi phí xu tùy chỉnh cho vật phẩm, dùng để thay thế giá mua hoặc định giá đầu vào bên ngoài không có giá mua |
| **Kích thước giao diện** | Thu phóng kích thước hiển thị thẻ cây sản xuất |
| **Hiển thị số băng tải** | Hiển thị số băng tải chiếm dụng cạnh mỗi nút |
| **Hiển thị mức sử dụng máy** | Hiển thị mức tiêu thụ nhiên liệu/phân bón tại mỗi nút |
| **Hiển thị giới hạn tối đa máy** | Hiển thị sản lượng tối đa của số máy đã làm tròn |
| **Hiển thị nhiệt & dinh dưỡng máy** | Hiển thị tiêu thụ nhiệt (P/s) và dinh dưỡng (V/s) mỗi máy tại mỗi nút |
| **Hiển thị số máy thô** | Hiển thị số máy với tối đa hai chữ số thập phân, thay vì làm tròn lên |

### Đọc Cây Sản Xuất

Mỗi nút hiển thị:
- **Tốc độ** (vật phẩm/phút)—nhấp vào số này để mở **cửa sổ thu phóng tỷ lệ**
- **Số băng tải chiếm dụng** (khi bật)
- **Số lượng máy** (đã làm tròn), rê chuột để xem thời gian chu kỳ, sản lượng mỗi máy và hệ số tốc độ
- **Phế phẩm** màu tím
- Tiêu thụ **nhiệt** và **dinh dưỡng** với màu tương ứng
- **Chi phí xu** mua nguyên liệu thô
- Nút chất xúc tác có thể hiển thị công tắc để mở rộng hoặc thu gọn cây con đầu vào chất xúc tác.
- Nhấp vào tên vật phẩm để mở trang chi tiết vật phẩm và tốc độ trong tab mới.

Số tốc độ hiển thị màu **đỏ** nghĩa là đã vượt quá giới hạn băng tải.

**Thao tác tại mỗi nút:**
- **▼/▶ mũi tên** — thu gọn/mở rộng cây con (trạng thái thu gọn được ghi nhớ)
- **🔄 nút** — mở trình chọn công thức, chuyển phương pháp sản xuất
- **♻️ nút** — bật tái chế phế phẩm tại nút này (xuất hiện khi phế phẩm được sản xuất ở nơi khác trong chuỗi)
- **☐ hộp kiểm** — đánh dấu làm **đầu vào bên ngoài**; nút này sẽ không được sản xuất nội bộ, tổng hợp vào khu vực "đầu vào bên ngoài"

Dùng nút **tất cả tái chế / tất cả không tái chế** ở đầu mỗi chuỗi sản xuất để chuyển đổi trạng thái tất cả bộ tái chế cùng lúc, biểu tượng **💠** có thể mở rộng/thu gọn toàn bộ nút tầng đầu tiên cùng lúc.

Khối **Nút chung** dưới cây sản xuất liệt kê các tổ hợp vật phẩm+máy xuất hiện nhiều hơn một lần trong chuỗi sản xuất (ví dụ: sản phẩm trung gian dùng chung), kèm liên kết nhảy đến mỗi vị trí xuất hiện; khối **Phế phẩm** tổng hợp các phế phẩm chưa được tiêu thụ, kèm liên kết nhảy đến nút nguồn sản xuất.

### Chuyển Đổi Công Thức và Chất Xúc Tác

Nhấp vào **🔄** tại bất kỳ nút nào để mở trình chọn công thức:
- Chọn công thức thay thế (ví dụ: dùng lò giả kim hay lò giả kim nâng cao để sản xuất than cốc).
- Đối với công thức **lò giả kim nâng cao**, có thể chọn một hoặc nhiều **chất xúc tác** (bất ổn / màu mỡ / cộng hưởng / vĩnh cửu), thay đổi tỷ lệ đầu ra hoặc yêu cầu nguyên liệu đầu vào.
- Đối với công thức đầu vào tùy chỉnh của **nung chảy nghịch lý**, có thể chỉ định vật phẩm cần đưa vào thông qua trình chọn vật phẩm.
- Chuyển đổi công thức có thể chọn áp dụng phạm vi **toàn cục** hoặc **chỉ nút này**, đặt thông qua công tắc chuyển phạm vi phía trên cửa sổ (chỉ hiển thị khi chuyển công thức từ nút cây sản xuất).
- Vật phẩm có thể hắc kim còn hiển thị nút **+ Thêm công thức vạc hắc kim** để mở [cửa sổ chỉnh sửa công thức vạc hắc kim nhanh](#cửa-sổ-chỉnh-sửa-công-thức-vạc-hắc-kim-nhanh).

### Cửa Sổ Thu Phóng Tỷ Lệ

Nhấp vào **số tốc độ** tại bất kỳ nút nào để mở cửa sổ thu phóng tỷ lệ. Ba trường liên kết thời gian thực:
- **Sản lượng (/phút)**
- **Số băng tải** (quy đổi theo tốc độ băng tải hiện tại)
- **Số lượng máy**

Sửa đổi bất kỳ trường nào, **tỷ lệ thu phóng** tự động cập nhật. Nhấp **Áp dụng** sau đó, toàn bộ cây sản xuất được thu phóng tỷ lệ theo.

### Thanh Tổng Quan

Phía trên cây sản xuất hiển thị bốn khối dữ liệu:

| Khối Dữ Liệu | Nội Dung |
|---|---|
| **Tổng sản lượng** | Tốc độ sản xuất tổng trước khi trừ tiêu thụ nội bộ |
| **Tổng tải** | Tiêu thụ nhiệt (P/min) và dinh dưỡng (V/min) của nhà máy, quy đổi thành lượng nhiên liệu/phân bón |
| **Chi phí đơn vị** | Chi phí xu, nhiệt và dinh dưỡng cần cho mỗi vật phẩm đầu ra (nếu chế độ đa mục tiêu chỉ định đúng hai mục tiêu nhiên liệu và phân bón, sẽ hiển thị giá trị xu tương đương của nhiên liệu/phân bón đã giải) |
| **Giá trị đơn vị** | So sánh tổng chi phí chuyển đổi với giá bán lẻ/bán buôn, hiển thị dưới dạng phần trăm |

### Danh Sách Xây Dựng

Bảng bên phải liệt kê tất cả loại máy cần thiết cho kế hoạch hiện tại cùng số lượng. Nhấp vào tên máy để mở rộng, xem **tổng nguyên liệu** cần thiết để xây dựng các máy đó. Khối **Tổng nguyên liệu cần thiết** ở dưới cùng còn ước tính **số ô kho** cần thiết dựa trên giới hạn đống.

### Gửi Đến Trình Lập Kế Hoạch

Nút **Gửi đến trình lập kế hoạch** (nằm trong bảng Lưu/Đặt lại) sẽ chuyển cây sản xuất hiện tại của máy tính trực tiếp sang tab trình lập kế hoạch và chuyển đổi thành đồ thị nút—xem chi tiết bên dưới [Nhập từ máy tính](#nhập-từ-máy-tính).

---

## 🗺️ Trang Trình Lập Kế Hoạch

Trình lập kế hoạch là trình chỉnh sửa đồ thị nút tự do tương tự Satisfactory Modeler: khác với cây sản xuất đệ quy gốc từ một mục tiêu, bạn có thể tự do đặt các nút công thức, nối các cổng đầu vào/đầu ra của chúng với nhau, công cụ sẽ giải tính dòng thực tế trên mỗi kết nối dựa trên quan hệ nối.

### Quản Lý Kế Hoạch (Thư Viện Kế Hoạch)

Trình lập kế hoạch có thể lưu nhiều **kế hoạch (Plan)** độc lập cùng lúc, mỗi kế hoạch có bộ nút và kết nối riêng.

- Menu thả xuống trên thanh công cụ để chuyển đổi giữa các kế hoạch; **📁 Quản lý kế hoạch** mở cửa sổ liệt kê tất cả kế hoạch.
- Trong cửa sổ quản lý có thể **kéo để sắp xếp**, **đổi tên tại chỗ** (nhấp để xuất hiện ô nhập), **sao chép**, **xóa**, hoặc **xuất** từng kế hoạch thành tệp \`.json\`. **Kế hoạch mới** tạo kế hoạch trống, **⭱ Nhập** tải tệp \`.json\` đã xuất trước đó.
- Mỗi kế hoạch có **lịch sử hoàn tác/làm lại (Undo/Redo)** độc lập riêng, và sẽ ghi nhớ **góc nhìn** (pan/zoom) khi bạn rời kế hoạch đó trong phiên trình duyệt hiện tại.

### Thao Tác Cơ Bản Trên Vùng Vẽ

- **+ Thêm nút**, hoặc **nhấp chuột phải** vào vùng vẽ trống, sẽ mở trình chọn vật phẩm; chọn vật phẩm có công thức để tạo nút mới tại đó.
- **Kéo thanh tiêu đề nút** để di chuyển nút; kéo vùng vẽ trống để pan góc nhìn.
- **▭ Chế độ chọn** chuyển vùng vẽ sang trạng thái khung chọn: kéo một hình chữ nhật để chọn nhiều nút, sau đó kéo thanh tiêu đề bất kỳ nút đã chọn nào để di chuyển cả nhóm, hoặc nhấn **Delete/Backspace** để xóa tất cả cùng lúc.
- Ở chế độ không chọn dùng **Ctrl/Cmd+nhấp** để chuyển trạng thái chọn nút đơn; trên vùng vẽ trống **Shift+kéo** để khung chọn tạm thời.
- Dùng con lăn chuột, cử chỉ chụm trên thiết bị cảm ứng, hoặc nút **+ / −** để **thu phóng**; **⤢ Thu phóng vừa tất cả** (hoặc nhấn phím **F**) tự động đưa tất cả nút vào tầm nhìn.
- Nút **⊞ Lưới bám** chuyển đổi giữa ba kích thước lưới và tắt hành vi bám lưới khi kéo nút.
- **↺ Hoàn tác / ↻ Làm lại** (hoặc **Ctrl+Z / Ctrl+Y**) di chuyển trong lịch sử chỉnh sửa của kế hoạch đó.
- **📦 Nhập làm mô-đun** chèn trực tiếp kế hoạch hiện có đã chọn làm nút mô-đun vào vùng vẽ hiện tại.

### Nút và Cổng (Ports)

Mỗi nút đại diện cho một công thức, kèm **số lượng máy** có thể là số thập phân, bên trái hiển thị cổng đầu vào, bên phải hiển thị cổng đầu ra:

- **Màu chấm cổng** — xám: chưa kết nối; xanh lá: đã kết nối và cân bằng cung cầu; vàng (đầu ra): vẫn còn sản lượng dư sau khi kết nối; đỏ (đầu vào): vẫn còn thiếu hụt chưa được đáp ứng sau khi kết nối.
- Rê chuột lên thanh tiêu đề nút sẽ hiển thị tooltip tốc độ đầu vào/đầu ra/nhiên liệu/phân bón đầy đủ cho **mỗi máy** của công thức đó.
- Kéo từ chấm cổng này đến chấm cổng khác có hướng ngược lại, cùng vật phẩm hợp lệ để tạo kết nối; nếu kéo thả vào vùng vẽ trống, sẽ mở menu công thức đã lọc theo "sản xuất/tiêu thụ vật phẩm đó", chọn xong sẽ tạo nút mới và tự động nối.
- Nhấp vào nhãn dòng trên kết nối sẽ mở **cửa sổ kết nối (Edge Modal)**, hiển thị nút nguồn/đích, dòng hiện tại, và có thể nhập trực tiếp dòng đích chính xác (sẽ điều chỉnh số máy hai đầu liên kết), hoặc xóa kết nối đó.
- Cửa sổ kết nối có thể dùng ưu tiên nguồn/đích ▲/▼ để điều chỉnh thứ tự nhiều kết nối trên cùng một cổng, và có thể đặt hoặc đặt lại màu kết nối.

### Cài Đặt Nút (⚙)

Cửa sổ mở ra chứa:
- Chi tiết đầu vào/đầu ra đầy đủ của công thức hiện tại; công thức lò giả kim nâng cao sẽ hiển thị **công tắc chất xúc tác**, công thức tùy chỉnh của nung chảy nghịch lý sẽ hiển thị **trình chọn vật phẩm đầu vào**.
- Danh sách **chuyển đổi công thức** được nhóm theo vật phẩm đầu ra chính của nút, có thể chuyển sang bất kỳ công thức khác của vật phẩm đó.
- Khối **Cân bằng cổng (Port Balance)** (chỉ hiển thị khi có ít nhất một cổng đã kết nối không cân bằng cung cầu), cung cấp nút một nhấp cho mỗi vật phẩm để điều chỉnh số máy nút cho khớp với lượng cần thiết của kết nối đầu vào/đầu ra đó.
- **Công cụ đồ thị**: chọn tất cả nút thượng nguồn, tự động bố cục nút thượng nguồn (sắp xếp tất cả nút thượng nguồn thành bố cục cây), tạo tất cả dây chuyền thượng nguồn (tự động tạo đệ quy sản xuất thượng nguồn còn thiếu, xem bên dưới), xóa tất cả nút thượng nguồn.

### Tự Động Tạo Dây Chuyền Thượng Nguồn

Nút **⚡** cạnh cột số lượng máy sẽ kiểm tra nhu cầu đầu vào chưa được đáp ứng của nút đó, và theo công thức ưu tiên của nó, tự động tạo một nút thượng nguồn cho mỗi vật phẩm đầu vào còn thiếu (đặt số máy theo lượng thiếu và nối sẵn), sắp xếp bên trái nút đó. Nút **Tạo tất cả dây chuyền thượng nguồn** trong cửa sổ cài đặt nút sẽ lặp lại quá trình này một cách đệ quy cho đến khi toàn bộ dây chuyền thượng nguồn không còn thiếu, quá trình này sẽ bỏ qua công thức tạo thành vòng lặp tự thân.

### Số Máy Liên Kết (Chế Độ Liên Kết)

Nút biểu tượng chuỗi cạnh ô nhập số lượng máy có thể chuyển đổi **chế độ liên kết (Link Mode)**. Khi bật, thay đổi số lượng máy của một nút (hoặc đặt dòng chính xác trong cửa sổ kết nối), sẽ tỷ lệ thu phóng số máy của tất cả nút liên kết với nó, thuận tiện cho việc điều chỉnh cả một chuỗi con cùng lúc mà không cần sửa từng nút một.

### Nút Mô-đun (Module Nodes)

Nút cũng có thể tham chiếu toàn bộ một kế hoạch khác làm **mô-đun**: nó sẽ phơi bày các đầu vào/đầu ra "ròng" không được tiêu thụ/sản xuất nội bộ của kế hoạch đó (tức là phần kế hoạch đó không thể tự cung tự cấp) thành cổng của chính nó, và cộng dồn tổng nhiên liệu/phân bón tiêu thụ. Cửa sổ cài đặt nút của nút này sẽ hiển thị nút **📦 Tải mô-đun**, nhấp để chuyển trình lập kế hoạch sang kế hoạch được tham chiếu. Nếu phát hiện tham chiếu vòng lặp giữa các mô-đun, công cụ sẽ đánh dấu lỗi trực tiếp trên nút mà không cố gắng giải.

Chọn một nhóm nút và nhấp **📦 Đóng gói**, có thể tạo kế hoạch mới từ nội dung đã chọn, và thay thế tại chỗ bằng nút mô-đun; kết nối nội bộ được giữ trong mô-đun mới.

Dùng **🔀 Tối ưu hóa thứ tự cổng** ở góc dưới bên phải vùng vẽ để tối ưu hóa thứ tự tất cả cổng; sau khi kéo thả nút cũng tự động thực hiện tối ưu hóa từng nút.

### Nút Cổng Dịch Chuyển

Công cụ **+ 🌀 Cổng dịch chuyển** có thể thêm nút cổng dịch chuyển cho vận chuyển vật phẩm bên ngoài. Nhấp vào tiêu đề để đặt vật phẩm, dùng **⇄** để chuyển đổi hướng đầu vào/đầu ra trực quan.

### Bảng Tổng Quan (Summary Panel)

Góc trên bên trái vùng vẽ có bảng nổi có thể thu gọn, tổng hợp toàn bộ kế hoạch hiện tại: **Tổng tải** (tiêu thụ xu/nhiên liệu/phân bón), **Đầu ra** (sản lượng dư chưa kết nối), **Đầu vào** (thiếu hụt chưa được đáp ứng), **Máy** (số máy theo loại). Mỗi khối có thể thu gọn riêng, toàn bộ bảng cũng có thể thu nhỏ thành một nút nhỏ.

### Nhập Từ Máy Tính

Nút **Gửi đến trình lập kế hoạch** trong tab máy tính sẽ chuyển cây sản xuất hiện tại thành đồ thị nút trong trình lập kế hoạch, nhập vào kế hoạch đang hoạt động: nút công thức được tổng hợp theo id công thức (cộng số máy), quy trình cha-con chính sẽ tạo kết nối tương ứng, tái chế phế phẩm đã bật trong máy tính cũng được chuyển đổi thành kết nối tái chế bổ sung. Nút mới được tự động bố cục (bố cục cây thượng nguồn) và góc nhìn được điều chỉnh để nhìn thấy tất cả nút mới; kết nối có dòng tiến về 0 sau khi giải sẽ tự động bị xóa.

---

## ⚗️ Trang Vạc Hắc Kim

### Loại Vạc Hắc Kim

- **Vạc hắc kim thường (3 ô):** \`T = (Cost₁ + Cost₂ + Cost₃) × Ratio\`
  - Tất cả khác nhau → ×1.0, hai giống → ×0.65, ba giống → ×0.5
  - Đầu ra là vật phẩm \`cauldronTarget\` gần giá trị T nhất.
- **Vạc hắc kim nâng cao (2 ô):**
  - Giống + Giống → \`T = Cost₁\`, khớp sản phẩm gần nhất **lên trên**.
  - A + B (khác nhau) → \`T = |Cost₁ − Cost₂|\`, khớp sản phẩm gần nhất (và giá trị mục tiêu của nó nhỏ hơn giá trị hắc kim lớn nhất trong hai).

Chuyển đổi loại giữa các nút chuyển **Vạc hắc kim / Vạc hắc kim nâng cao** ở trên cùng.

### Nguyên Liệu Ứng Viên

Bảng bên trái liệt kê tất cả vật phẩm có thể dùng làm nguyên liệu hắc kim (phải có \`cauldronCost\` và không phải lỏng). Đánh dấu/bỏ đánh dấu vật phẩm để quyết định có đưa vào tìm kiếm hay không.

Ba **hồ sơ nguyên liệu** độc lập có thể lưu các tập ứng viên khác nhau:
- **Hồ sơ 1** — Tất cả nguyên liệu hợp lệ (mặc định)
- **Hồ sơ 2** — Vật phẩm chuỗi thảo mộc (tự động tạo từ chuỗi sản xuất thảo mộc)
- **Hồ sơ 3** — Vật phẩm nền tảng xu/tiền tệ

Dùng **Chọn tất cả / Bỏ chọn tất cả** để cấu hình hàng loạt. Nút **🌿** đặt lại hồ sơ ứng viên thành preset hướng thảo mộc, nút **💰** đặt lại thành preset hướng xu/tiền tệ.

Bật **Sắp xếp theo giá trị hắc kim**, dùng **🔼/🔽** để chuyển thứ tự tăng/giảm.

### Điều Kiện Lọc và Tìm Kiếm

Khóa tối đa ba ô **nguyên liệu chỉ định**, giới hạn tìm kiếm thành tổ hợp vật phẩm cụ thể ở vị trí cố định. Mũi tên **+/−** cạnh mỗi ô xoay vòng vật phẩm theo thứ tự chi phí. **Đặt đầu ra mục tiêu** có thể giới hạn kết quả thành một sản phẩm đã chọn.

Dùng hộp kiểm để lọc theo loại công thức: **2 khác nhau, 3 khác nhau, 2 giống nhau, 3 giống nhau**.

Bất kỳ thay đổi điều kiện lọc hoặc ô nào, kết quả đều được tính toán lại ngay lập tức.

### Kết Quả và Lưu

Kết quả được nhóm theo vật phẩm đầu ra, mặc định thu gọn. Nhấp vào hàng vật phẩm để mở rộng và xem tất cả tổ hợp nguyên liệu tương thích. Vật phẩm không thể được tổ hợp nào sản xuất xuất hiện trong khu vực **Mục tiêu không đạt được**.

Nhấp vào **★** tại bất kỳ hàng công thức nào để lưu vào **Công thức đã lưu** (bảng bên phải). Trong bảng đó:
- **Xuất** — lưu tất cả yêu thích thành tệp \`.txt\` (định dạng: \`vật phẩm1 + vật phẩm2 (+ vật phẩm3) = sản phẩm\`)
- **Nhập** — tải tệp \`.txt\` để nhập hàng loạt công thức
- **Đồng bộ dữ liệu** — tiêm tất cả công thức vạc hắc kim đã lưu vào cơ sở dữ liệu sản xuất chính, máy tính có thể lập kế hoạch chuỗi sản xuất đầy đủ bao gồm công đoạn vạc hắc kim
- **Hiển thị chi phí ước tính** sẽ hiển thị chi phí ước tính trong kết quả một bước, **Sắp xếp theo chi phí ước tính** sắp xếp theo chi phí đó.

### Cửa Sổ Chỉnh Sửa Công Thức Vạc Hắc Kim Nhanh

Trong trình chọn công thức của máy tính, vật phẩm có \`cauldronTarget\` sẽ hiển thị nút nhanh, mở **cửa sổ chỉnh sửa công thức vạc hắc kim nhanh**:
- Chỉ định nguyên liệu cho mỗi ô thông qua trình chọn vật phẩm hoặc mũi tên **+/−**.
- Hiển thị thời gian thực giá trị T, phạm vi hiệu lực \`[dưới, trên]\` và khoảng cách đến mỗi biên.
- Xanh lá = trúng mục tiêu; đỏ = không trúng.
- Nhấp **★** để thêm vào yêu thích, hoặc nhấp **Áp dụng** (chỉ khả dụng khi trúng) để ghi công thức trực tiếp vào máy tính và đặt làm ưu tiên.

### Tối Ưu Hóa Đa Bước

Nhấp **Tìm kiếm nhiều bước** (cạnh **Tìm kiếm một bước**) phía trên tab vạc hắc kim để chuyển sang chế độ tìm kiếm đa giai đoạn: khác với tìm kiếm tổ hợp một lần, chế độ này sẽ lặp lại dùng công thức vạc hắc kim để tổng hợp, tìm xem "dùng sản phẩm thượng tầng tổng hợp thêm một lần" có thể tạo ra chuỗi chi phí thấp hơn không.

- Mỗi cột trong bảng đại diện cho một vật phẩm, mỗi hàng đại diện cho một vòng tối ưu hóa (**Tầng 0** đến **Tầng 4**). **Tầng 0** là chi phí gốc của mỗi vật phẩm ứng viên; sau đó mỗi tầng sẽ dùng vật phẩm của tầng trước làm nguyên liệu tìm kiếm lại, chỉ giữ lại tổ hợp có chi phí thấp hơn chi phí đã biết hiện tại.
- Nếu chi phí của một tầng không thấp hơn tầng trước, ô đó sẽ hiển thị màu xám, thuận tiện nhìn ra vật phẩm nào thực sự được lợi từ tối ưu hóa thêm một tầng.
- Nhấp vào nút **▲** tại bất kỳ ô nào, có thể lọc bảng chỉ hiển thị vật phẩm đó và toàn bộ chuỗi nguyên liệu thượng nguồn của nó, và mỗi ô thực sự được sử dụng trên chuỗi đều được tô sáng; nhấp lại **▲** cùng một ô để bỏ lọc.
- Nhấp vào **★** tại bất kỳ ô nào có thể lưu công thức của giai đoạn đó vào **Công thức đã lưu**, hành vi giống chức năng lưu trong kết quả tìm kiếm một bước.
- Rê chuột lên số chi phí để xem chi tiết **chi phí nguyên liệu** / **chi phí nhiệt** của ô đó (tính bằng xu); rê chuột lên biểu tượng nguyên liệu sẽ hiển thị tên nguyên liệu đó và giá trị chi phí được dùng trong tính toán này.
- **⚙ Cài đặt chi phí** có thể điều chỉnh tỷ lệ quy đổi nhiệt và dinh dưỡng thành xu, dùng cho ước tính chi phí trên toàn bộ tab vạc hắc kim (đồng thời cũng liệt kê danh sách chi phí cơ bản ước tính cho từng vật phẩm để chỉnh sửa trực tiếp).
- **Số vật phẩm trung gian tối đa** (1–3) giới hạn số vật phẩm trung gian được giữ trong chuỗi tối ưu hóa đa bước.

---

## 📖 Trang Wiki

Thanh điều hướng trên cùng cung cấp bốn tab con:

| Tab | Mô Tả |
|---|---|
| **Vật phẩm** | Lưới biểu tượng vật phẩm có thể tìm kiếm, hỗ trợ lọc theo danh mục, cấp, giá bán, giá bán buôn, mục tiêu hắc kim; nhấp vào bất kỳ vật phẩm nào để xem thuộc tính, công thức sản xuất và nơi sử dụng |
| **Máy** | Danh sách máy có thể tìm kiếm; nhấp vào bất kỳ máy nào để xem thuộc tính, vật liệu xây dựng và tất cả công thức liên quan |
| **Hợp đồng** | Máy tính phần thưởng và giới hạn sản lượng hợp đồng, có thể đặt giờ làm việc hàng ngày và tăng nâng cấp |
| **Tài liệu đầy đủ** | Trình xem README tích hợp, dùng trình kết xuất Markdown tích hợp để hiển thị tài liệu đầy đủ |

Tab vật phẩm và máy đều cung cấp thanh chip lọc; tab máy có thể lọc theo cấp và chi phí nhiệt. Trong tab vật phẩm, nhấp **★** cạnh công thức có thể đặt làm công thức ưu tiên cho vật phẩm đó (đồng bộ với máy tính).
Nhấp vào bất kỳ vật phẩm nào trong hàng công thức có thể nhảy trực tiếp đến trang chi tiết vật phẩm đó.

### Trang Hợp Đồng

Trang **Hợp đồng** liệt kê vật phẩm hợp đồng có sẵn và tính toán giới hạn hàng ngày và doanh thu tối đa. Trang cung cấp ba tham số được lưu:

- **Giờ làm việc mỗi ngày** — Số giờ game mỗi ngày dùng cho công việc hợp đồng (1 giờ game = 1 phút thực tế), dùng để tính **đơn vị/phút**.
- **Tăng số lượng hợp đồng (%)** — Tăng giới hạn số hợp đồng hàng ngày cơ bản.
- **Tăng lợi nhuận hợp đồng (%)** — Tăng phần thưởng cơ bản mỗi hợp đồng; phần thưởng tính toán sẽ được làm tròn xuống trước khi tính doanh thu tối đa.

Bảng hiển thị vật phẩm, đơn vị mỗi hợp đồng, loại tiền tệ phần thưởng, giới hạn hàng ngày, đơn vị/phút, doanh thu tối đa hàng ngày, cấp yêu cầu và yêu cầu phân phối. Nhấp vào bất kỳ số **đơn vị/phút** nào có thể đặt vật phẩm và tốc độ đó thành mục tiêu hiện tại của máy tính và nhảy đến trang máy tính.

---

## 🛠️ Trang Trình Chỉnh Sửa Dữ Liệu

Chọn đối tượng chỉnh sửa từ menu thả xuống:
- **Database** — Dữ liệu vật phẩm, máy, công thức đầy đủ
- **Translations** — Đối tượng \`ALCHEMY_I18N\` điều khiển tất cả chuỗi giao diện và tên vật phẩm/máy
- **Settings** — Tùy chọn người dùng hiện tại (định dạng JSON)
- **(\\*BACKUP)** biến thể — Phiên bản trước đó được tự động lưu trước mỗi lần áp dụng

Chỉnh sửa JSON trực tiếp trong vùng văn bản, nhấp **Áp dụng thay đổi** để tải lại ngay. Dùng **Xuất ra tệp** để lưu bản sao.

> **Lưu ý:** Áp dụng dữ liệu mới sẽ tải lại trang và ghi đè bản sao cục bộ. Hãy xuất bản sao trước khi áp dụng.

---

## 🌐 Ngôn Ngữ và Bản Địa Hóa

Nhấp **🌐 EN/Tiếng Việt** ở đầu trang để chuyển đổi giữa tiếng Anh và tiếng Việt.

Lớp dịch (\`alchemy_i18n.js\`) ánh xạ tất cả tên vật phẩm, tên máy, danh mục và chuỗi giao diện. Có thể tùy chỉnh thông qua **Trình chỉnh sửa dữ liệu → Translations**, kết quả sửa đổi được lưu vào \`localStorage\`.

---

## 🔗 Tham Số URL

URL phản ánh trạng thái hiện tại, có thể đánh dấu hoặc chia sẻ:

| Tham Số | Mô Tả | Ví Dụ |
|---|---|---|
| \`item\` | Tên vật phẩm mục tiêu | \`?item=Steel%20Ingot\` |
| \`rate\` | Tốc độ sản xuất (vật phẩm/phút) | \`&rate=60\` |
| \`tab\` | Tab kích hoạt khi tải | \`&tab=cauldron\` |
| \`lang\` | Ép buộc ngôn ngữ (\`en\` ép buộc tiếng Anh) | \`&lang=en\` |
| \`fuel\` | Ghi đè nguồn nhiên liệu | \`&fuel=Coke\` |
| \`fert\` | Ghi đè nguồn phân bón | \`&fert=Basic%20Fertilizer\` |
| \`setupgrades\` | Cấp nâng cấp phân cách bằng dấu phẩy (chỉ mục 0–9) | \`&setupgrades=5,0,3,2,1,1,0,0,0,0\` |

> Chỉ mục \`setupgrades\` tương ứng: \`[0]\` hiệu quả hậu cần, \`[1]\` (không dùng), \`[2]\` hiệu quả nhà máy, \`[3]\` kỹ năng giả kim, \`[4]\` hiệu quả nhiên liệu, \`[5]\` hiệu quả phân bón, \`[6]\` kỹ năng bán hàng, \`[7–9]\` (không dùng).

---

## ⚙️ Tùy Chọn Đặt Lại

| Nút | Hiệu Ứng |
|---|---|
| **Đặt lại công thức** | Xóa dữ liệu cục bộ, khôi phục phiên bản tích hợp (tự động sao lưu phiên bản hiện tại) |
| **Đặt lại bản dịch** | Xóa ghi đè bản dịch cục bộ (tự động sao lưu phiên bản hiện tại) |
| **Đặt lại tất cả** | Xóa tất cả dữ liệu \`localStorage\` và tải lại với giá trị mặc định |

Khi dữ liệu tích hợp (\`alchemy_db.js\`) có phiên bản mới hơn phiên bản cục bộ, **biểu ngữ cập nhật** sẽ hiển thị ở đầu trang. Chọn **Cập nhật ngay** (ghi đè dữ liệu cục bộ nhưng giữ cài đặt người dùng) hoặc **Bỏ qua cập nhật**.

---

## 🏗️ Cấu Trúc Dự Án

\`\`\`
AlchemyFactoryCalculator/
├── index.html                      # Khung HTML chính, bố cục tab, hộp thoại
├── style.css                       # Tất cả kiểu (CSS custom properties, theme tối)
├── js/
│   ├── alchemy_db.js               # Dữ liệu game—vật phẩm, máy, công thức
│   ├── alchemy_i18n.js             # Bảng dịch (tiếng Anh/tiếng Việt) và hàm hỗ trợ t()
│   ├── alchemy_state.js            # Trạng thái ứng dụng toàn cục, cài đặt mặc định, lưu trữ và localStorage
│   ├── alchemy_main.js             # Điểm vào ứng dụng, khởi tạo, trạng thái URL và phối hợp module
│   ├── alchemy_ui.js               # Logic UI chung: cài đặt, menu thả xuống, trình chọn vật phẩm, thanh trượt và hộp thoại
│   ├── alchemy_calc_engine.js      # Engine tính toán thuần túy (xây dựng cây, tính tổng hợp)
│   ├── alchemy_calc.js             # Kết xuất UI máy tính (DOM, hộp thoại, nút cây)
│   ├── alchemy_cauldron.js         # Mô phỏng vạc hắc kim, quản lý yêu thích, đồng bộ
│   ├── alchemy_help.js             # Wiki (hướng dẫn, trình duyệt vật phẩm, trình duyệt máy)
│   ├── alchemy_readme.js           # README.md / README.vi.md nhúng dạng JS, để wiki chạy được cả khi mở bằng file://
│   ├── alchemy_planner.js          # Trình lập kế hoạch lõi: vùng vẽ, nút, kết nối, thư viện kế hoạch, điều khiển góc nhìn
│   ├── alchemy_planner_calc.js     # Engine giải dòng trình lập kế hoạch, tự động bố cục, mô-đun/nhập logic
│   └── alchemy_planner_overlays.js # Hộp thoại trình lập kế hoạch: quản lý kế hoạch, cài đặt nút, hộp thoại kết nối, bảng tổng quan
\`\`\`

Không có công cụ dựng, trình đóng gói hay phụ thuộc bên ngoài. Thuần HTML + CSS + JavaScript thuần.

### Vì sao cần \`alchemy_readme.js\`

Tab Wiki → **Tài liệu đầy đủ** hiển thị chính tệp này dưới dạng Markdown. Nội dung được lấy theo hai
bước, và \`alchemy_readme.js\` tồn tại để phục vụ bước thứ hai:

1. Trước tiên nó tìm \`window.ALCHEMY_README[lang]\` trong \`alchemy_readme.js\` — một object JS thuần
   chứa một template literal cho mỗi ngôn ngữ:

   \`\`\`js
   window.ALCHEMY_README = {
       en: \`[EN](README.md) | ...\`,
       vi: \`[English](README.md) | ...\`,
   };
   \`\`\`

2. Chỉ khi không tìm thấy key đó, nó mới \`fetch()\` tệp \`.md\` từ đĩa.

Lý do tồn tại bản nhúng là giao thức \`file://\`. Trình duyệt chặn \`fetch()\` đối với tài nguyên cục bộ
dưới giao thức này, nên người dùng tải repo về rồi mở thẳng \`index.html\` sẽ thấy tab tài liệu trống.
Đường dẫn \`fetch\` vẫn được giữ lại cho bản deploy online, vì vậy tệp Markdown vẫn là nguồn sự thật và
file JS chỉ là bản sao.

Đổi lại, không có bước build nào tự sinh lại bản sao, nên hai bên có thể lệch nhau. Khi sửa tài liệu,
cần cập nhật **cả bốn** nơi:

| Vị trí | Ngôn ngữ |
|---|---|
| \`README.md\` | Tiếng Anh |
| \`js/alchemy_readme.js\` → \`en\` | Tiếng Anh |
| \`README.vi.md\` | Tiếng Việt |
| \`js/alchemy_readme.js\` → \`vi\` | Tiếng Việt |

Script sau giúp đồng bộ nhanh bản nhúng:

\`\`\`js
// sinh lại README.vi.md từ bản nhúng
const vm = require('vm'), fs = require('fs');
const s = { window: {} }; vm.createContext(s);
vm.runInContext(fs.readFileSync('js/alchemy_readme.js', 'utf8'), s);
fs.writeFileSync('README.vi.md', s.window.ALCHEMY_README.vi, 'utf8');
\`\`\`

---

## 🤝 Đóng Góp và Tùy Chỉnh

- **Hoan nghênh Fork.** Tất cả dữ liệu và logic đều là tệp văn bản thuần.
- Thêm vật phẩm hoặc công thức mới: chỉnh sửa \`alchemy_db.js\`, hoặc dùng trình chỉnh sửa dữ liệu trong trình duyệt.
- Sửa bản dịch: chỉnh sửa \`alchemy_i18n.js\`, hoặc dùng trình chỉnh sửa dữ liệu → Translations.
- Sửa tài liệu: chỉnh sửa các tệp Markdown **và** block tương ứng trong \`alchemy_readme.js\` — xem [Vì sao cần \`alchemy_readme.js\`](#vì-sao-cần-alchemy_readme-js).
- Engine tính toán (\`alchemy_calc_engine.js\`) tách biệt hoàn toàn khỏi UI, có thể dùng độc lập.

---

*Máy tính này là fork của bản gốc [AlchemyFactoryCalculator](https://joejoesgit.github.io/AlchemyFactoryCalculator/) bởi JoeJoesGit, với bản địa hóa tiếng Việt, máy tính vạc hắc kim, wiki, trình lập kế hoạch, thông báo cập nhật dữ liệu tăng dần và nhiều cải tiến UI.*
*Dữ liệu từ [AlchemyFactoryData](https://github.com/faultyd3v/AlchemyFactoryData) bởi faultyd3v.*
`

};
