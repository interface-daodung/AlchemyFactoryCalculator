/* ========================================================================== 
   SECTION: KNOWLEDGE ALTAR EXP CALCULATOR
   Formula reference: the mirrored calculator for game version 1.0.4963.
   ========================================================================== */

let _knowledgeInitialized = false;

function initKnowledgePage() {
    const settings = DB.settings || {};
    document.getElementById('knowledge-target-exp').value = settings.knowledgeTargetExp ?? 1000;
    document.getElementById('knowledge-current-level').value = settings.knowledgeCurrentLevel ?? 0;
    document.getElementById('knowledge-progress-exp').value = settings.knowledgeProgressExp ?? 0;
    document.getElementById('knowledge-target-level').value = settings.knowledgeTargetLevel ?? 10;
    document.getElementById('knowledge-search').placeholder = t('Search items...');
    _knowledgeInitialized = true;
    renderKnowledgePage();
}

function updateKnowledgeSettings() {
    if (!DB?.settings) return;
    DB.settings.knowledgeTargetExp = Math.max(0, Number(document.getElementById('knowledge-target-exp').value) || 0);
    DB.settings.knowledgeCurrentLevel = Math.max(0, Math.floor(Number(document.getElementById('knowledge-current-level').value) || 0));
    DB.settings.knowledgeProgressExp = Math.max(0, Number(document.getElementById('knowledge-progress-exp').value) || 0);
    DB.settings.knowledgeTargetLevel = Math.max(0, Math.floor(Number(document.getElementById('knowledge-target-level').value) || 0));
    persist();
}

function renderKnowledgePage() {
    if (!DB || !document.getElementById('knowledge-table-body')) return;
    if (!_knowledgeInitialized) initKnowledgePage();

    const level = Math.max(0, Math.floor(Number(document.getElementById('lvlKnowledge').value) || 0));
    DB.settings.lvlKnowledge = level;
    const label = document.getElementById('lvlKnowledge-title');
    if (label) label.innerText = `${t('Relic Knowledge')} (${100 + level * 10}%)`;
    renderKnowledgeResults();
}

function getKnowledgeExp(itemDef) {
    if (!itemDef || itemDef.liquid || itemDef.virtual) return null;
    if (Number.isFinite(itemDef.exp) && itemDef.exp > 0) {
        const knowledgeLevel = Math.max(0, Math.floor(Number(document.getElementById('lvlKnowledge').value) || 0));
        return itemDef.exp * (1 + knowledgeLevel * 0.1);
    }
    return Number.isFinite(itemDef.baseCost) && itemDef.baseCost > 0 ? itemDef.baseCost * 0.0002 : null;
}

function getKnowledgeAltarSeconds(itemDef, itemName = '') {
    if (!itemDef) return null;
    const speedMult = AlchemyCalcEngine.getSpeedMult(Math.max(0, Number(document.getElementById('lvlSpeed').value) || 0));
    const resolvedName = itemName || Object.keys(DB.items || {}).find(name => DB.items[name] === itemDef);
    const baseSeconds = resolvedName ? AlchemyCalcEngine.computeDecomposeTime(DB, resolvedName) : null;
    return baseSeconds == null ? null : baseSeconds / speedMult;
}

function getKnowledgeBeltRate(itemDef) {
    const logisticsLevel = Math.max(0, Number(document.getElementById('lvlBelt').value) || 0);
    const currencyName = t('Currency', 'categories');
    const isCurrency = itemDef.category === 'Currency' || itemDef.category === currencyName;
    return AlchemyCalcEngine.getBeltSpeed(logisticsLevel) * (isCurrency ? 50 : 1);
}

function getKnowledgeRows() {
    const targetExp = Math.max(0, Number(document.getElementById('knowledge-target-exp').value) || 0);
    return Object.entries(DB.items || {}).map(([item, itemDef]) => {
        const exp = getKnowledgeExp(itemDef);
        const altarSeconds = getKnowledgeAltarSeconds(itemDef, item);
        if (!(exp > 0) || !(altarSeconds > 0)) return null;

        const naturalItemsPerMin = 60 / altarSeconds;
        const itemsPerMinPerAltar = Math.min(naturalItemsPerMin, getKnowledgeBeltRate(itemDef));
        const expPerMinPerAltar = itemsPerMinPerAltar * exp;
        const requiredItemsPerMin = targetExp > 0 ? targetExp / exp : 0;
        const altars = requiredItemsPerMin > 0 ? Math.ceil(requiredItemsPerMin / itemsPerMinPerAltar - 1e-9) : 0;
        return {
            item,
            itemDef,
            exp,
            altarSeconds,
            expPerMinPerAltar,
            requiredItemsPerMin,
            altars,
            beltLimited: itemsPerMinPerAltar + 1e-9 < naturalItemsPerMin,
            isRelic: Number.isFinite(itemDef.exp) && itemDef.exp > 0
        };
    }).filter(Boolean);
}

function knowledgeExpForLevel(level) {
    const normalized = Math.max(1, Math.min(999, Math.floor(Number(level) || 0)));
    return Math.floor(1.1 * Math.pow(normalized, 2.4) + 10 * Math.pow(normalized, 0.3) + 0.1 * Math.pow(1.09, normalized) - 7);
}

function knowledgeExpBetweenLevels(currentLevel, progressExp, targetLevel) {
    const from = Math.max(0, Math.min(999, Math.floor(Number(currentLevel) || 0)));
    const to = Math.max(0, Math.min(999, Math.floor(Number(targetLevel) || 0)));
    if (to <= from) return 0;
    let total = 0;
    for (let level = from + 1; level <= to; level++) total += knowledgeExpForLevel(level);
    return Math.max(0, total - (Number(progressExp) || 0));
}

function formatKnowledgeNumber(value, maximumFractionDigits = 2) {
    if (!Number.isFinite(value)) return '—';
    return value.toLocaleString(undefined, { maximumFractionDigits });
}

function formatKnowledgeDuration(minutes) {
    if (!Number.isFinite(minutes) || minutes < 0) return '—';
    if (minutes < 60) return `${formatKnowledgeNumber(minutes, 1)} min`;
    const hours = minutes / 60;
    if (hours < 24) return `${formatKnowledgeNumber(hours, 1)} h`;
    return `${formatKnowledgeNumber(hours / 24, 1)} d`;
}

function renderKnowledgeResults() {
    const body = document.getElementById('knowledge-table-body');
    const head = document.getElementById('knowledge-table-head');
    if (!body || !head || !DB) return;

    updateKnowledgeSettings();
    const targetExp = DB.settings.knowledgeTargetExp;
    const query = (document.getElementById('knowledge-search').value || '').trim().toLocaleLowerCase();
    const sort = document.getElementById('knowledge-sort').value;
    let rows = getKnowledgeRows().filter(row => !query || row.item.toLocaleLowerCase().includes(query));

    rows.sort((a, b) => {
        if (sort === 'name') return a.item.localeCompare(b.item);
        if (sort === 'exp') return b.exp - a.exp || a.item.localeCompare(b.item);
        if (sort === 'altars') return a.altars - b.altars || b.expPerMinPerAltar - a.expPerMinPerAltar;
        return b.expPerMinPerAltar - a.expPerMinPerAltar || a.item.localeCompare(b.item);
    });

    head.innerHTML = `<tr>
        <th>${t('Item')}</th>
        <th>${t('EXP/item')}</th>
        <th>${t('Altar time')}</th>
        <th>${t('EXP/min per altar')}</th>
        <th>${t('Items/min')}</th>
        <th>${t('Altars')}</th>
    </tr>`;

    body.innerHTML = rows.map(row => `<tr>
        <td><span class="knowledge-item">
            <img src="img/item${row.itemDef.id ?? 0}.png" alt="">
            <span>${row.item}</span>
            ${row.isRelic ? `<span class="knowledge-relic-tag">${t('Relic', 'categories')}</span>` : ''}
        </span></td>
        <td>${formatKnowledgeNumber(row.exp, 4)}</td>
        <td>${formatKnowledgeNumber(row.altarSeconds, 2)} s${row.beltLimited ? ` · ${t('Belt-limited')}` : ''}</td>
        <td>${formatKnowledgeNumber(row.expPerMinPerAltar, 2)}</td>
        <td>${formatKnowledgeNumber(row.requiredItemsPerMin, 2)}</td>
        <td>${row.altars.toLocaleString()}</td>
    </tr>`).join('');

    const currentLevel = DB.settings.knowledgeCurrentLevel;
    const targetLevel = DB.settings.knowledgeTargetLevel;
    const requiredExp = knowledgeExpBetweenLevels(currentLevel, DB.settings.knowledgeProgressExp, targetLevel);
    const levelResult = document.getElementById('knowledge-level-result');
    if (targetLevel <= currentLevel) {
        levelResult.textContent = t('Target level must be above the current level.');
    } else {
        const minutes = targetExp > 0 ? requiredExp / targetExp : Infinity;
        levelResult.innerHTML = `${t('EXP required')}: ${formatKnowledgeNumber(requiredExp, 0)}<br>${t('Estimated time')}: ${formatKnowledgeDuration(minutes)}`;
    }
}
