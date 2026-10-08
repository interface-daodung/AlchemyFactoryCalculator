/* ==========================================================================
   SECTION: JS - GLOBAL STATE
   ========================================================================== */
let DB = null;
const STORAGE_KEY = "alchemy_factory_save_v1";
const SOURCE_KEY = "alchemy_source_v1";
const BACKUP_KEY = "alchemy_source_backup_v1";
const I18N_DATA_KEY = "alchemy_i18n_source_v1";
const I18N_BACKUP_KEY = "alchemy_i18n_source_backup_v1";
const SETTINGS_KEY = "alchemy_settings_v1";
const SETTINGS_BACKUP_KEY = "alchemy_settings_backup_v1";
const RECENT_PRODUCTION_PLANS_KEY = "alchemy_recent_production_plans_v1";
const MAX_RECENT_PRODUCTION_PLANS = 5;

/* ==========================================================================
   SECTION: DB.settings FIELD REFERENCE
   ==========================================================================

   preferredRecipes[item] = recipeId
       GLOBAL default: "when producing `item` anywhere with no more specific
       override, use this recipe." Set via Wiki ★ or Recipe Modal "Global" tab.

   nodeRecipeOverrides[pathKey] = recipeId
       CALCULATOR-TAB-ONLY, per tree-node override keyed by pathKey (see
       alchemy_calc_engine.js's pathKey docs). Set via Recipe Modal "This Node
       Only" tab. Falls back to preferredRecipes if absent. Has NO effect on
       the Planner tab (which has its own per-node node.recipeId, an entirely
       separate field on Planner node objects, not this map).

   recipeModifiers[recipeId] = { catalysts: [...] } | { customInput: item }
       GLOBAL, keyed by recipeId (not item name) — stores Advanced Athanor
       catalyst selection or Paradox Crucible custom input, applied via
       applyRecipeModifiers() in alchemy_calc_engine.js. NOTE: Planner nodes
       copy this into their own node.recipeModifiers at creation time and can
       diverge from this global copy afterward — see the recipeModifiers
       cross-reference note in alchemy_planner_calc.js.

   customCosts[item] = number
       User-defined price override. Affects BOTH gold cost calculation
       (in place of buyPrice) AND, when `item` is the selected fuel/fert
       source, the displayed fuel/fert cost-per-min.

   expandCatalystInputs[catalystType] = boolean
       GLOBAL per catalyst-TYPE (unstable/fertile/resonant/eternal), not per
       recipe or per node. Controls whether Advanced Athanor catalyst inputs
       are expanded into their own subtree in the Calculator tab tree, or
       collapsed into an external-input leaf. Toggled via the 🧪 button on
       tree nodes (toggleCatalystExpand).
   ========================================================================== */

const DEFAULT_SETTINGS = {
    lvlBelt: 0,
    lvlSpeed: 0,
    lvlAlchemy: 0,
    lvlFuel: 0,
    lvlFert: 0,
    lvlKnowledge: 0,
    lvlSell: 0,
    lvlContract: 0,
    contractWorkMinutes: 16,
    contractAmountBoost: 0,
    contractProfitBoost: 0,
    defaultFuel: "Blast Potion",
    defaultFert: "Fertile Catalyst",
    selectedHeatingDevice: "Stone Furnace",
    nodeSize: 1,
    showBeltCount: true,
    showFuelFert: true,
    showRawMachineCount: false,
    showMaxCap: false,
    showHeatFert: false,
    targetItem: "",
    targetRate: 60,
    targetMachineCount: 1,
    machineModeToggle: true,
    selfFuel: false,
    selfFert: false,
    preferredRecipes: {},
    nodeRecipeOverrides: {
        ">Copper Coin": "Copper Coin",
        ">Silver Coin": "Silver Coin",
        ">Gold Coin": "Gold Coin",                
    },
    recipeModifiers: {},
    activeRecyclers: {},
    customCosts: {},
    expandCatalystInputs: { unstable: false, fertile: false, resonant: false, eternal: false },
    thermalExtractorHeight: 255,
    knowledgeTargetExp: 1000,
    knowledgeCurrentLevel: 0,
    knowledgeProgressExp: 0,
    knowledgeTargetLevel: 10,
};

/** State API - store DB.settings to localStorage */
function persist() { 
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DB.settings));
}

/* ==========================================================================
   SECTION: RESET PANEL
   ========================================================================== */

function resetSettings() {
    if(confirm(t('Reset Settings', 'ui') + "?")) {
        console.log("Reset Settings");
        const localSettingsData = localStorage.getItem(SETTINGS_KEY);
        localStorage.removeItem(SETTINGS_KEY);
        if (localSettingsData) localStorage.setItem(SETTINGS_BACKUP_KEY, localSettingsData);
        location.reload();
    } 
}

function resetRecips() {
    if(confirm(t('Reset Recipes', 'ui') + "?")) {
        console.log("Reset Recipes");
        const localSourceData = localStorage.getItem(SOURCE_KEY);
        localStorage.removeItem(SOURCE_KEY);
        if (localSourceData) localStorage.setItem(BACKUP_KEY, localSourceData);
        location.reload();
    } 
}

function resetTranslations() {
    if(confirm(t('Reset Translations', 'ui') + "?")) {
        console.log("Reset Translations");
        const localSourceI18NData = localStorage.getItem(I18N_DATA_KEY);
        localStorage.removeItem(I18N_DATA_KEY);
        if (localSourceI18NData) localStorage.setItem(I18N_BACKUP_KEY, localSourceI18NData);
        location.reload();
    } 
}

function resetAllData() {
    if(confirm(t('Reset All Database?', 'ui'))) {
        console.log("Reset All Database");
        const localSourceData = localStorage.getItem(SOURCE_KEY);
        const localSourceI18NData = localStorage.getItem(I18N_DATA_KEY);
        const localSettingsData = localStorage.getItem(SETTINGS_KEY);
        localStorage.clear();
        if (localSourceData) localStorage.setItem(BACKUP_KEY, localSourceData);
        if (localSourceI18NData) localStorage.setItem(I18N_BACKUP_KEY, localSourceI18NData);
        if (localSettingsData) localStorage.setItem(SETTINGS_BACKUP_KEY, localSettingsData);
        location.reload();
    } 
}
