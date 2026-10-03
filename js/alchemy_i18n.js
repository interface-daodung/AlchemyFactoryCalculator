// Translation helper function
function t(text, category = 'ui') {
    if (!text) return "";
    if (window.ALCHEMY_I18N.enabled === false) return text;
    const i18n = window.ALCHEMY_I18N;
	const translatedText = i18n?.[category]?.[text];
	if (!translatedText && category != 'ui') {
		console.info(`[i18n][${category}] Missing: ${text}`);
	}	
    return translatedText ?? text;
}

// Input item name, return the translated item name. And vice versice
function queryDualItemName(itemName) {
    const i18n = window.ALCHEMY_I18N;
    if (!i18n || !i18n.items) return "";
    const translatedText = i18n.items[itemName];
    if (translatedText) return translatedText;
    for (const [originalName, nameInDb] of Object.entries(i18n.items)) {
        if (nameInDb === itemName) return originalName;
    }
    return "";
}

function getCurrentItemName(originName) {
    const i18n = window.ALCHEMY_I18N;
    if (!i18n || !i18n.items || !i18n.enabled) return originName;
    return i18n.items[originName] ?? originName;
}

function translateDatabase(db, forward) {
    const i18n = window.ALCHEMY_I18N;
    if (!db || !i18n || !i18n.items) return;
    if (i18n.enabled === false) return;

    const item2translate = new Map();
    const translate2item = new Map();
    for (let key in i18n.items) {
        const value = i18n.items[key];
        item2translate.set(key, value);
        translate2item.set(value, key);
    }
    const forwardMap = forward ? item2translate : translate2item;
    const invertedMap = forward ? translate2item : item2translate;
    const missingKeys = new Set();

    const getT = (str) => {
        if (!str) return str; 
        const translated = forwardMap.get(str);
        if (translated === undefined) {
            if (!invertedMap.has(str)) missingKeys.add(str);
            return str;
        }
        return translated;
    };

    // Destructive replace the item keys
    if (db.items) {
        const newItems = {};
        for (let key in db.items) {
            const newKey = getT(key);
            const itemData = db.items[key];
            newItems[newKey] = itemData;
        }
        db.items = newItems;
    }

    if (db.machines) {
        const newMachines = {};
        for (let key in db.machines) {
            const machineData = db.machines[key];        
            if (machineData.buildCost) {
                const newCost = {};
                for (let mat in machineData.buildCost) {
                    newCost[getT(mat)] = machineData.buildCost[mat];
                }
                machineData.buildCost = newCost;
            }
            newMachines[key] = machineData;
        }
        db.machines = newMachines;
    }

    if (db.recipes) {
        db.recipes.forEach(recipe => {        
            const newInputs = {};
            for (let inKey in recipe.inputs) {
                newInputs[getT(inKey)] = recipe.inputs[inKey];
            }
            recipe.inputs = newInputs;

            const newOutputs = {};
            for (let outKey in recipe.outputs) {
                newOutputs[getT(outKey)] = recipe.outputs[outKey];
            }
            recipe.outputs = newOutputs;

            const newOutputs1 = {};
            for (let outKey in recipe.unstableOutputs) {
                newOutputs1[getT(outKey)] = recipe.unstableOutputs[outKey];
            }
            recipe.unstableOutputs = newOutputs1;

            const newOutputs2 = {};
            for (let outKey in recipe.resonantOutputs) {
                newOutputs2[getT(outKey)] = recipe.resonantOutputs[outKey];
            }
            recipe.resonantOutputs = newOutputs2;

            if (recipe.buildCost) {
                recipe.buildCost = getT(recipe.buildCost);
            }
        });
    }
    
    if (db.settings) {
        if (db.settings.defaultFuel) db.settings.defaultFuel = getT(db.settings.defaultFuel);
        if (db.settings.defaultFert) db.settings.defaultFert = getT(db.settings.defaultFert);    
        const newPrefs = {};
        for (let itemKey in db.settings.preferredRecipes) {
            newPrefs[getT(itemKey)] = db.settings.preferredRecipes[itemKey];
        }
        db.settings.preferredRecipes = newPrefs;
        const customCosts = {};
        for (let itemKey in db.settings.customCosts) {
            customCosts[getT(itemKey)] = db.settings.customCosts[itemKey];
        }
        db.settings.customCosts = customCosts;
        if (db.settings.recipeModifiers) {
            for (let recipeId in db.settings.recipeModifiers) {
                const mod = db.settings.recipeModifiers[recipeId];
                if (mod && mod.customInput) mod.customInput = getT(mod.customInput);
            }
        }
    }

    if (missingKeys.size > 0) {
        console.warn(`DB Translate: Missing ${missingKeys.size} keys\n` + [...missingKeys]);
    }
    console.log("Database successfully translated.");
}


window.ALCHEMY_I18N = {    
    "version": 1,
    "enabled": true,
    "ui": {
        // --- 0. Title ---
        "Alchemy Factory Calculator": "Máy Tính Nhà Máy Giả Kim",
        "Game version : ": "Phiên bản game : ",
        "Calculator": "Máy Tính",
        "Cauldron": "Vạc Hắc Kim",
        "Advanced Cauldron": "Vạc Hắc Kim Nâng Cao",
        "Database Editor": "Trình Chỉnh Sửa Dữ Liệu",
        "New database version available": "Đã có phiên bản dữ liệu mới",
        "Current local version:": "Phiên bản hiện tại:",
        "Update Now": "Cập Nhật Ngay",
        "Skip Update": "Bỏ Qua Cập Nhật",
        "Reset All Database?": "Đặt Lại Toàn Bộ Dữ Liệu?",

        // --- 1. Production Goal ---
        "Production Goal": "Mục Tiêu Sản Xuất",
        "Single Target": "Một Mục Tiêu",
        "Multi Target": "Nhiều Mục Tiêu",
        "+ Add Item": "+ Thêm Vật Phẩm",
        "💾 Save List": "💾 Lưu Danh Sách",
        "📂 Load List": "📂 Tải Danh Sách",
        "⚡ Fuel/Fert 1-Machine Quick Set": "⚡ Đặt Nhanh Nhiên Liệu/Phân Bón (1 Máy)",
        "Target Item": "Vật Phẩm Mục Tiêu",
        "Select or Type...": "Chọn hoặc Nhập...",
        "Set by Machine Count": "Đặt Theo Số Lượng Máy",
        "Machine Count": "Số Lượng Máy",
        "Belt Load Fraction": "Tỷ Lệ Tải Băng Tải",
        "Belt": "Băng Tải",
        "Custom Rate": "Tốc Độ Tùy Chỉnh",
        "Rate (Items/Min)": "Tốc Độ (Vật Phẩm/Phút)",
        "Select Item": "Chọn Vật Phẩm",
        "No Item Selected": "Chưa Chọn Vật Phẩm",
        "Expand All": "Mở Rộng Tất Cả",
        "Collapse All": "Thu Gọn Tất Cả",
        "All Items": "Tất Cả Vật Phẩm",
        "Browse Items": "Duyệt Danh Sách Vật Phẩm",

        // --- 2. Logistics ---
        "Logistics": "Hậu Cần",
        "Heating Device": "Thiết Bị Sưởi Ấm",
        "Fuel Source": "Nguồn Nhiên Liệu",
        "Fertilizer Source": "Nguồn Phân Bón",
        "slots": "ô",
        "Self-Fuel": "Tự Cung Nhiên Liệu",
        "Self-Fert": "Tự Cung Phân Bón",
        "Cost (/item):" : "Chi Phí (/vật phẩm):",
        "UI Size": "Kích Thước Giao Diện",
        "Show Belt Count": "Hiển Thị Số Băng Tải",
        "Show Machine Usage": "Hiển Thị Mức Sử Dụng Máy",
        "Show Raw Machine Count": "Hiển Thị Số Máy Thô",
        "Show Machine Max Cap": "Hiển Thị Giới Hạn Tối Đa Máy",        
        "Show Machine Heat & Nutr": "Hiển Thị Nhiệt & Dinh Dưỡng Máy",
         

        // --- 3. Tree & Nodes ---
        "Summary": "Tổng Quan",
        "Gross Output": "Tổng Sản Lượng",
        "Total Load": "Tổng Tải Trọng",
        "Gross Profit": "Lợi Nhuận Gộp",
        "Unit Cost": "Chi Phí Đơn Vị",
        "Unit Value": "Giá Trị Đơn Vị",
        "Coin": "Xu",
        "Heat": "Nhiệt",
        "Steam": "Hơi Nước",
        "Nutr": "Dinh Dưỡng",
        "Net Output": "Sản Lượng Ròng",
        "Converted Cost": "Chi Phí Chuyển Đổi",
        "Retail": "Bán Lẻ",
        "Retail Price": "Giá Bán Lẻ",
        "Retail Price  ": "Giá Bán Lẻ",
        "Wholesale": "Bán Buôn",
        "Wholesale Price": "Giá Bán Buôn",
        "Cost Per Exp   ": "Chi Phí Mỗi Kinh Nghiệm",
        "Fuel Value": "Giá Trị Nhiên Liệu",
        "Fert Value": "Giá Trị Phân Bón",
        "Cost per Heat": "Chi Phí Mỗi Nhiệt",
        "Cost per Nutr": "Chi Phí Mỗi Dinh Dưỡng",

        "Production Chain": "Chuỗi Sản Xuất",
        "Reuse All Byproduct": "Tái Sử Dụng Tất Cả Phế Phẩm",
        "Reset All": "Đặt Lại Tất Cả",
        "Swap Recipe": "Thay Đổi Công Thức",
        "Input": "Đầu Vào",
        "Output": "Đầu Ra",
        "Yields": "Sản Xuất",
        "Avail": "Khả Dụng",
        "Used": "Đã Dùng",
        "Expand": "Mở Rộng",
        "Fold": "Thu Gọn",
        "Raw": "Nguyên Liệu",
        "Raw Input": "Đầu Vào Nguyên Liệu",
        "External Input": "Đầu Vào Bên Ngoài",

        "Recipe": "Công Thức",
        "Base Time": "Thời Gian Cơ Bản",
        "Speed Mult": "Hệ Số Tốc Độ",
        "Throughput": "Năng Suất Thiết Bị",
        "Internal Nutrient Module": "Mô-đun Dinh Dưỡng Nội Bộ",
        "Internal Heat Module": "Mô-đun Nhiệt Nội Bộ",
        "Internal fuel/fert module demand exceeds its own supply.": "Nhu cầu mô-đun nhiên liệu/phân bón nội bộ vượt quá nguồn cung cấp nội bộ.",
        "By-product Recycling: Value Unconverged.": "Tái chế phế phẩm: Giá trị chưa hội tụ.",

        "Common Nodes": "Nút Chung",

        "--- External Inputs ---": "--- Đầu Vào Bên Ngoài ---",
        "Raw Material Cost": "Chi Phí Nguyên Liệu",
        "Fuel Import": "Nhập Nhiên Liệu",
        "Fertilizer Import": "Nhập Phân Bón",

        "--- BYPRODUCTS ---": "--- PHẾ PHẨM ---",
        "None": "Không",
        "recycled": "đã tái chế",

        // --- 4. Construction List ---
        "Construction List": "Danh Sách Xây Dựng",
        "Machine Size": "Kích Thước Máy",
        "Machine Area": "Diện Tích Máy",
        "Sum Area": "Tổng Diện Tích",
        "Sum Volume": "Tổng Thể Tích",
        "On Heat Device": "Trên Thiết Bị Nhiệt",
        "Total Materials Required": "Tổng Nguyên Liệu Cần Thiết",
        "Total Slots": "Tổng Số Ô",
        "Total Machines": "Tổng Số Máy",
        "Flat Footprint Tile": "Ô Chiếm Diện Tích Phẳng",
        "Compact Footprint Tile": "Ô Chiếm Diện Tích Nhỏ Gọn",

        // --- 5. Upgrades ---
        "Upgrades (Levels)": "Nâng Cấp (Cấp Độ)",
        "Logistics Efficiency": "Hiệu Quả Hậu Cần",
        "Factory Efficiency": "Hiệu Quả Nhà Máy",
        "Alchemy Skill": "Kỹ Năng Giả Kim",
        "Fuel Efficiency": "Hiệu Quả Nhiên Liệu",
        "Fert Efficiency": "Hiệu Quả Phân Bón",
        "Sale Price": "Giá Bán",
        "Contract Price": "Giá Hợp Đồng",

        // --- 6. Save/Reset ---
        "Send to Planner": "Gửi Đến Trình Lập Kế Hoạch",
        "Save/Reset": "Lưu/Đặt Lại",
        "Save Upgrades": "Lưu Nâng Cấp",
        "Reset Settings": "Đặt Lại Cài Đặt",
        "Reset Recipes": "Đặt Lại Công Thức",
        "Reset Translations": "Đặt Lại Bản Dịch",
        "All Data Reset": "Đặt Lại Toàn Bộ Dữ Liệu",

        // --- 7. Data Editor ---
        "Apply Changes": "Áp Dụng Thay Đổi",
        "Export to File": "Xuất Ra Tệp",

        // --- Cauldron ---
        "Settings & Candidates": "Cài Đặt & Ứng Viên",
        "Profile 1": "Hồ Sơ 1",
        "Profile 2": "Hồ Sơ 2",
        "Profile 3": "Hồ Sơ 3",
        "Filter Category": "Lọc Danh Mục",
        "Select All": "Chọn Tất Cả",
        "Deselect All": "Bỏ Chọn Tất Cả",
        "Sort by Value": "Sắp Xếp Theo Giá Trị",
        "Result Area": "Khu Vực Kết Quả",
        "Set Target Output": "Đặt Đầu Ra Mục Tiêu",
        "No recipes meet the criteria.": "Không có công thức nào phù hợp.",
        "Selected item is not a valid cauldron target.": "Vật phẩm đã chọn không phải là mục tiêu vạc hắc kim hợp lệ.",
        "Selected item is not a valid cauldron ingredient (no cauldronCost)": "Vật phẩm đã chọn không phải là nguyên liệu vạc hắc kim hợp lệ (không có cauldronCost)",
        "Total count of recipes" : "Tổng số công thức",
        "Show Estimated Cost": "Hiển Thị Chi Phí Ước Tính",
        "Order by Est. Cost": "Sắp Xếp Theo Chi Phí Ước Tính",
        "Estimated Cost": "Chi Phí Ước Tính",
        "⚙ Cost Settings": "⚙ Cài Đặt Chi Phí",
        "Calculate All": "Tính Toàn Bộ",
        "Base Item Cost List": "Danh Sách Chi Phí Vật Phẩm Cơ Bản",
        "Cost" : "Chi Phí",
        "Minimum": "Tối Thiểu",
        "Set Input": "Đặt Đầu Vào",
        "2 Diff": "2 Khác Nhau",
        "3 Diff": "3 Khác Nhau",
        "2 Same": "2 Giống Nhau",
        "3 Same": "3 Giống Nhau",
        "Click: cycle all items\nCtrl+Click: cycle within checked candidates only": "Nhấp: xoay vòng tất cả vật phẩm\nCtrl+Nhấp: xoay vòng trong các ứng viên đã chọn",
        "Unattainable Targets": "Mục Tiêu Không Đạt Được",
        "Single Step Search": "Tìm Kiếm Một Bước",
        "Multiple Steps Search": "Tìm Kiếm Nhiều Bước",
        "Max Intermediate Items": "Vật Phẩm Trung Gian Tối Đa",
        "Item": "Vật Phẩm",
        "Step": "Bước",
        "Ingredients": "Nguyên Liệu",
        "Show Upstream Ingredients": "Hiển Thị Nguyên Liệu Thượng Nguồn",
        "Saved Recipes": "Công Thức Đã Lưu",
        "Toggle Favorite": "Thêm/Xóa Yêu Thích",
        "Import": "Nhập",
        "Export": "Xuất",
        "Sync DB": "Đồng Bộ Dữ Liệu",
        "Calculation result": "Kết quả tính toán",
        "Discount for 3 identical inputs (0.5×)": "Giảm giá cho 3 đầu vào giống nhau (0.5×)",
        "Discount for 2 identical inputs (0.65×)": "Giảm giá cho 2 đầu vào giống nhau (0.65×)",
        "No saved recipes yet.": "Chưa có công thức nào được lưu.",
        "+ Add Cauldron Recipe": "+ Thêm Công Thức Vạc Hắc Kim",
        "Valid Range": "Phạm Vi Hiệu Lực",
        "Target Value": "Giá Trị Mục Tiêu",
        "Distance to lower bound": "Khoảng cách đến giới hạn dưới",
        "Distance to upper bound": "Khoảng cách đến giới hạn trên",
        "Current Product": "Sản Phẩm Hiện Tại",
        "Current Value": "Giá Trị Hiện Tại",

        // Modal
        "Adjust Ratio": "Điều Chỉnh Tỷ Lệ",
        "Output Rate (/min)": "Tốc Độ Đầu Ra (/phút)",
        "Belt Count": "Số Băng Tải",
        "Scaling Ratio": "Tỷ Lệ Thu Phóng",

        "Select Recipe": "Chọn Công Thức",
        "Select Recipe for ": "Chọn Công Thức Cho ",
        "Global": "Toàn Cục",
        "This Node Only": "Chỉ Nút Này",
        "Catalysts": "Chất Xúc Tác",
        "Charge Cost": "Chi Phí Nạp",
        "🧪 Unstable": "🧪 Bất Ổn",
        "🌿 Fertile": "🌿 Màu Mỡ",
        "✨ Resonant": "✨ Cộng Hưởng",
        "♾️ Eternal": "♾️ Vĩnh Cửu",
        "Thermal Extractor Height": "Chiều Cao Máy Trích Nhiệt",
        "Height": "Chiều Cao",
        "Bonus": "Thưởng",
        "output": "đầu ra",

        "Select Input Item": "Chọn Vật Phẩm Đầu Vào",
        "Please select an input item first.": "Vui lòng chọn một vật phẩm đầu vào trước.",
        "Selected item is missing paradoxTime data.": "Vật phẩm đã chọn thiếu dữ liệu paradoxTime.",
        "Cannot select the output item itself as input.": "Không thể chọn chính vật phẩm đầu ra làm đầu vào.",

        "⚙ Manage Custom Costs": "⚙ Quản Lý Chi Phí Tùy Chỉnh",
        "Manage Custom Costs": "Quản Lý Chi Phí Tùy Chỉnh",
        "No custom costs set.": "Chưa đặt chi phí tùy chỉnh nào.",
        "Add Item": "Thêm Vật Phẩm",

        // --- Help ---
        "Guides": "Hướng Dẫn",
        "Items": "Vật Phẩm",
        "Machines": "Máy Móc",
        "Contracts": "Hợp Đồng",
        "Full Documentation": "Tài Liệu Đầy Đủ",
        "Working Hours / Day": "Giờ Làm Việc / Ngày",
        "Contract Amount Boost (%)": "Tăng Số Lượng Hợp Đồng (%)",
        "Contract Profit Boost (%)": "Tăng Lợi Nhuận Hợp Đồng (%)",
        "Units/Contract": "Đơn Vị/Hợp Đồng",
        "Reward": "Phần Thưởng",
        "Daily Max": "Tối Đa Mỗi Ngày",
        "Units/min": "Đơn Vị/phút",
        "Max Revenue/Day": "Doanh Thu Tối Đa/Ngày",
        "Dispatch Requirement": "Yêu Cầu Phân Phối",
        "Loading...": "Đang tải...",
        "Category": "Danh Mục",
        "Tier": "Cấp",
             
        "Properties": "Thuộc Tính",
        "Has Value": "Có Giá Trị",
        "Quick select (exact)": "Chọn nhanh (chính xác)",
        "Buy Price": "Giá Mua",
        "Sell Price": "Giá Bán",
        "Wholesale Price": "Giá Bán Buôn",
        "Heat Value": "Giá Trị Nhiệt",
        "Nutrient Cost": "Chi Phí Dinh Dưỡng",
        "Nutrient Value": "Giá Trị Dinh Dưỡng",
        "Max Fertility": "Độ Màu Mỡ Tối Đa",
        "Cauldron Cost": "Chi Phí Vạc Hắc Kim",
        "Cauldron Target": "Mục Tiêu Vạc Hắc Kim",
        "Decompose Exp": "Kinh Nghiệm Phân Hủy",
        "Decompose Time": "Thời Gian Phân Hủy",
        "Charges": "Lượt Nạp",
        "Max Stack": "Đống Tối Đa",
        "Exp": "Kinh Nghiệm",

        "Production Recipes": "Công Thức Sản Xuất",
        "Used In": "Được Dùng Trong",
        "Used in Machine Construction": "Dùng Để Xây Dựng Máy",
        "Build Cost": "Chi Phí Xây Dựng",
        "Heat Cost": "Chi Phí Nhiệt",
        "Slots Required": "Ô Cần Thiết",
        "Heat Cost (Self)": "Chi Phí Nhiệt (Tự)",
        "Max Slots": "Ô Tối Đa",
        "Type": "Loại",        
        "Fertilizer Device": "Thiết Bị Phân Bón",
         
        "No production recipes": "Không có công thức sản xuất",
        "Not used in any recipe": "Không được dùng trong bất kỳ công thức nào",
        "No build materials": "Không có vật liệu xây dựng",
        "No recipes": "Không có công thức",
        "Set as Preferred": "Đặt Làm Ưu Tiên",
        "Remove Preferred": "Bỏ Ưu Tiên",
        "Search items...": "Tìm kiếm vật phẩm...",
        "Search machines...": "Tìm kiếm máy...",
        "← Select an item": "← Chọn một vật phẩm",
        "← Select a machine": "← Chọn một máy",
        "Item data not found": "Không tìm thấy dữ liệu vật phẩm",
        "Machine data not found": "Không tìm thấy dữ liệu máy",

        "per machine (/min)": "mỗi máy (/phút)",
        "Apply": "Áp Dụng",

        // --- Planner ---
        "Planner": "Trình Lập Kế Hoạch",
        "▭ Select Mode": "▭ Chế Độ Chọn",
        "📦 Encapsulate": "📦 Đóng Gói",        
        "+ Add Node": "+ Thêm Nút",        
        "+ 📝 Note": "+ 📝 Ghi Chú",        
        "+ 🌀 Portal": "+ 🌀 Cổng Dịch Chuyển",
        "↺ Undo": "↺ Hoàn Tác",
        "↻ Redo": "↻ Làm Lại",
        "Clear All": "Xóa Tất Cả",        

        // --- Planner: Node ---        
        "Node Settings": "Cài Đặt Nút",
        "Link machine count changes": "Liên kết thay đổi số lượng máy",
        "This item has no recipe and cannot be added as a Planner node.": "Vật phẩm này không có công thức và không thể thêm làm nút Trình Lập Kế Hoạch.",
        "Auto-generate upstream": "Tự động tạo nút thượng nguồn",
        "Remove Node": "Xóa Nút",
        "Load Module": "Tải Mô-đun",
        "Port Balance": "Cân Bằng Cổng",
        "Graph Tools": "Công Cụ Đồ Thị",
        "Select All Upstream": "Chọn Tất Cả Thượng Nguồn",
        "Auto-Layout Upstream": "Tự Động Bố Cục Thượng Nguồn",
        "Populate All Upstream": "Tạo Tất Cả Thượng Nguồn",
        "Clear All Upstream": "Xóa Tất Cả Thượng Nguồn",
        "Error": "Lỗi",
        "Module": "Mô-đun",
        "NOTE": "GHI CHÚ",
        "Invaild Module": "Mô-đun Không Hợp Lệ",
        "Invaild Recipe": "Công Thức Không Hợp Lệ",
        "Missing Recipe": "Thiếu Công Thức",
        "Missing Reference": "Thiếu Tham Chiếu",
        "Circular Reference": "Tham Chiếu Vòng Lặp",
        "No recipe selected": "Chưa chọn công thức",
        "Missing Custom Input": "Thiếu Đầu Vào Tùy Chỉnh",
        "CONSUME": "TIÊU THỤ",
        "PRODUCE": "SẢN XUẤT",

        // --- Planner: Edge ---
        "Source": "Nguồn",
        "Target": "Đích",
        "Current Flow": "Dòng Hiện Tại",
        "Set Flow": "Đặt Dòng",
        "Priority": "Ưu Tiên",
        "Link mode ON: also scales upstream/downstream nodes": "Chế độ liên kết BẬT: đồng thời thu phóng nút thượng nguồn/hạ nguồn",
        "Link mode OFF: only affects source and target nodes": "Chế độ liên kết TẮT: chỉ ảnh hưởng nút nguồn và đích",
        "Color": "Màu Sắc",
        "Reset": "Đặt Lại",
        "Delete Connection": "Xóa Kết Nối",
         

        // --- Planner: Plan Library ---
        "Manage Plans": "Quản Lý Kế Hoạch",
        "📁 Manage Plans": "📁 Quản Lý Kế Hoạch",        
        "Default Plan": "Kế Hoạch Mặc Định",
        "Imported Plan": "Kế Hoạch Đã Nhập",
        "(Copy)": "(Bản Sao)",
        "Active": "Đang Hoạt Động",
        "Delete this plan?": "Xóa kế hoạch này?",
        "Failed to import plan: ": "Nhập kế hoạch thất bại: ",
        "Uses N modules": "Sử dụng N mô-đun",
        "Used by N plans": "Được N kế hoạch sử dụng",
        "Circular module reference": "Tham chiếu mô-đun vòng lặp",
        "Cycle": "Chu Kỳ",

        "just now": "vừa xong",
        "min ago": "phút trước",
        "hr ago": "giờ trước",
        "days ago": "ngày trước",

        "▶ Load": "▶ Tải",
        "✎ Rename": "✎ Đổi Tên",
        "⧉ Duplicate": "⧉ Nhân Bản",
        "📦 Import as Module": "📦 Nhập Làm Mô-đun",
        "New Plan": "Kế Hoạch Mới",
        "🗑 Delete": "🗑 Xóa",
        "⭳ Export": "⭳ Xuất",
        "⭱ Import": "⭱ Nhập",

        // --- Planner: Empty Canvas Hint ---
        "Planner Controls": "Hướng Dẫn Trình Lập Kế Hoạch",
        "Right-click canvas / + Add Node": "Nhấp chuột phải vào vùng vẽ / + Thêm Nút",
        "Add a new recipe node": "Thêm một nút công thức mới",
        "Drag empty canvas": "Kéo vùng vẽ trống",
        "Pan the view": "Di chuyển khung nhìn",
        "▭ Select Mode + drag": "▭ Chế độ chọn + kéo",
        "Box-select multiple nodes": "Chọn nhiều nút bằng khung",
        "Shift + drag empty canvas": "Shift + kéo vùng vẽ trống",
        "Temporary box-select": "Chọn khung tạm thời",
        "Ctrl/Cmd + click node": "Ctrl/Cmd + nhấp vào nút",
        "Toggle single node selection": "Bật/tắt chọn nút đơn",
        "Ctrl/Cmd + A": "Ctrl/Cmd + A",
        "Select all nodes": "Chọn tất cả nút",
        "Delete / Backspace": "Delete / Backspace",
        "Delete selected nodes": "Xóa các nút đã chọn",
        "Mouse wheel / Pinch": "Con lăn chuột / Chụm ngón tay",
        "Zoom in/out": "Phóng to/thu nhỏ",
        "+ / − / F key": "+ / − / Phím F",
        "Zoom / Fit all nodes to view": "Thu phóng / Vừa tất cả nút với khung nhìn",
        "Ctrl/Cmd + Z / Y": "Ctrl/Cmd + Z / Y",
        "Undo / Redo": "Hoàn tác / Làm lại",
        "Drag port dot to another port": "Kéo chấm cổng đến cổng khác",
        "Connect two ports": "Kết nối hai cổng",
        "Drag port dot to empty canvas": "Kéo chấm cổng đến vùng vẽ trống",
        "Create a new connected node": "Tạo một nút mới đã kết nối"
    },
    "items": {
        // Game version: 1.0.4917
        // Group by meaning

        // --- RAW RESOURCES ---
        "Logs": "Khúc Gỗ",
        "Limestone": "Đá Vôi",
        "Iron Ore": "Quặng Sắt",
        "Pyrite Ore": "Quặng Pyrit",
        "Quartz Ore": "Quặng Thạch Anh",
        "Rock Salt": "Muối Đá",
        "Coal Ore": "Quặng Than",
        "Rotten Log": "Khúc Gỗ Mục",
        "Meteorite": "Thiên Thạch",

        // --- SEEDS ---
        "Flax Seeds": "Hạt Lanh",
        "Sage Seeds": "Hạt Xô Thơm",
        "Redcurrant Seeds": "Hạt Nho Chuông Đỏ",
        "Lavender Seeds": "Hạt Oải Hương",
        "Chamomile Seeds": "Hạt Cúc La Mã",
        "Gentian Seeds": "Hạt Long Đởm",
        "World Tree Seed": "Hạt Cây Thế Giới",

        // --- HERBS ---
        "Flax": "Lanh",
        "Sage": "Xô Thơm",
        "Redcurrant": "Nho Chuông Đỏ",
        "Lavender": "Oải Hương",
        "Chamomile": "Cúc La Mã",
        "Gentian": "Long Đởm",
        "Gentian Nectar": "Mật Long Đởm",
        "Gentian Mixture": "Hỗn Hợp Long Đởm",
        "World Tree Leaf": "Lá Cây Thế Giới",
        "World Tree Core": "Lõi Cây Thế Giới",
        "Gloom Fungus": "Nấm U Ám",

        // --- FUELS & FERTILIZERS---
        "Plank": "Ván Gỗ",
        "Charcoal": "Than Gỗ",
        "Charcoal Powder": "Bột Than Gỗ",
        "Coke": "Than Cốc",
        "Coke Powder": "Bột Than Cốc",
        "Coal": "Than Đá",
        "Black Powder": "Bột Đen",
        "Basic Fertilizer": "Phân Bón Cơ Bản",
        "Advanced Fertilizer": "Phân Bón Nâng Cao",

        // --- SOLIDS & MATERIALS ---
        "Stone": "Đá",
        "Sand": "Cát",
        "Clay": "Đất Sét",
        "Brick": "Gạch",
        "Glass": "Thủy Tinh",
        "Sulfur": "Lưu Huỳnh",
        "Salt": "Muối",

        // --- POWDERS & DUSTS ---
        "Flax Fiber": "Sợi Lanh",
        "Sage Powder": "Bột Xô Thơm",
        "Plant Ash": "Tro Thực Vật",
        "Quicklime": "Vôi Sống",
        "Quicklime Powder": "Bột Vôi",
        "Clay Powder": "Bột Đất Sét",
        "Sulfur Powder": "Bột Lưu Huỳnh",
        "Chamomile Powder": "Bột Cúc La Mã",
        "Gentian Powder": "Bột Long Đởm",
        "Yeast Powder": "Bột Men",
        "Soap Powder": "Bột Xà Phòng",
        "Perfumed Soap Powder": "Bột Xà Phòng Thơm",
        "Volcanic Ash": "Tro Núi Lửa",
        "Star Dust": "Bụi Sao",
        "Fairy Dust": "Bụi Tiên",

        // --- METALS ---
        "Iron Sand": "Cát Sắt",
        "Iron Ingot": "Phôi Sắt",
        "Steel Ingot": "Phôi Thép",
        "Impure Copper Powder": "Bột Đồng Không Tinh",
        "Bronze Ingot": "Phôi Đồng Điếu",
        "Copper Powder": "Bột Đồng",
        "Copper Ingot": "Phôi Đồng",
        "Crude Silver Powder": "Bột Bạc Thô",
        "Impure Silver Powder": "Bột Bạc Không Tinh",
        "Silver Powder": "Bột Bạc",
        "Silver Ingot": "Phôi Bạc",
        "Crude Gold Dust": "Bụi Vàng Thô",
        "Impure Gold Dust": "Bụi Vàng Không Tinh",
        "Gold Dust": "Bụi Vàng",
        "Pure Gold Dust": "Bụi Vàng Tinh Khiết",
        "Gold Ingot": "Phôi Vàng",

        // --- COMPONENTS ---
        "Linen Thread": "Sợi Lanh Mịn",
        "Linen Rope": "Dây Thừng Lanh",
        "Large Wooden Gear": "Bánh Răng Gỗ Lớn",
        "Small Wooden Gear": "Bánh Răng Gỗ Nhỏ",
        "Iron Nails": "Đinh Sắt",
        "Wooden Pulley": "Ròng Rọc Gỗ",
        "Cart": "Xe Đẩy",
        "Steel Gear": "Bánh Răng Thép",
        "Copper Bearing": "Ổ Trục Đồng",
        "Bronze Rivet": "Đinh Tán Đồng Điếu",        
        "Marble": "Cẩm Thạch",

        // --- GOODS & CURRENCY ---
        "Mortar": "Cối Đãi",
        "Linen": "Vải Lanh",
        "Bandage": "Băng Gạc",
        "Soap": "Xà Phòng",
        "Perfumed Soap": "Xà Phòng Thơm",
        "Moonlit Soap": "Xà Phòng Ánh Trăng",
        "Pocket Watch": "Đồng Hồ Bỏ Túi",
        "Clockwork Bird": "Chim Máy",
        "Silver Amulet": "Bùa Bạc",
        "Crown": "Vương Miện",
        "Copper Coin": "Đồng Xu Đồng",
        "Silver Coin": "Đồng Xu Bạc",
        "Gold Coin": "Đồng Xu Vàng",

        // --- LIQUIDS ---
        "Linseed Oil": "Dầu Hạt Lanh",
        "Fruit Wine": "Rượu Trái Cây",
        "Limewater": "Nước Vôi",
        "Brine": "Nước Muối",
        "Lavender Essential Oil": "Tinh Dầu Oải Hương",
        "Brandy": "Rượu Brandy",
        "Sulfuric Acid": "Axit Sunfuric",
        "Quicksilver": "Thủy Ngân",
        "Aqua Vitae": "Nước Sự Sống",
        "Fairy Tear": "Nước Mắt Tiên",
        "Moon Tear": "Nước Mắt Trăng",
        "Steam": "Hơi Nước",

        // --- BEVERAGE ---
        "Whispering Fields": "Đồng Nói Thì Thầm",
        "Strange Tide": "Thủy Triều Kỳ Lạ",
        "Lavender Dream": "Giấc Mơ Oải Hương",
        "World Tree Vintage": "Rượu Vang Cây Thế Giới",
        "Alchemistˈs Sigh": "Tiếng Thở Dài Của Giả Kim Thuật Sĩ",

        // --- POTIONS ---
        "Healing Potion": "Thuốc Hồi Phục",
        "Vitality Potion": "Thuốc Sinh Lực",
        "Transformation Potion": "Thuốc Biến Hình",
        "Blast Potion": "Thuốc Nổ",
        "Growth Potion": "Thuốc Tăng Trưởng",
        "Panacea Potion": "Thuốc Vạn Năng",

        // --- CATALYSTS & MAGIC ---
        "Gloom Spores": "Bào Tử U Ám",
        "Unstable Catalyst": "Chất Xúc Tác Bất Ổn",
        "Fertile Catalyst": "Chất Xúc Tác Màu Mỡ",
        "Resonant Catalyst": "Chất Xúc Tác Cộng Hưởng",
        "Eternal Catalyst": "Chất Xúc Tác Vĩnh Cửu",
        "Oblivion Essence": "Tinh Huyết Quên Lãng",
        "Vitality Essence": "Tinh Huyết Sinh Lực",
        "Philosopherˈs Stone": "Đá Triết Gia",

        // --- GEMS & SHARDS ---
        "Crude Shard": "Mảnh Thô",
        "Broken Shard": "Mảnh Vỡ",
        "Dull Shard": "Mảnh Mờ",
        "Shattered Crystal": "Pha Lê Vỡ",
        "Crude Crystal": "Pha Lê Thô",
        "Polished Crystal": "Pha Lê Đánh Bóng",
        "Adamant": "Đá Cứng",
        "Diamond": "Kim Cương",
        "Perfect Diamond": "Kim Cương Hoàn Hảo",
        "Turquoise": "Ngọc Lam",
        "Malachite": "Ngọc Mã Lật",
        "Topaz": "Topaz",
        "Obsidian": "Đá Hắc Diện Thạch",
        "Lapis Lazuli": "Đá Xanh Lam",
        "Ruby": "Hồng Ngọc",
        "Sapphire": "Lam Bảo",
        "Emerald": "Ngọc Lục Bảo",

        // --- RELICS ---
        "Jupiter": "Sao Mộc",
        "Saturn": "Sao Thổ",
        "Mars": "Sao Hỏa",
        "Venus": "Sao Kim",
        "Mercury": "Sao Thủy",
        "Luna": "Mặt Trăng",
        "Sol": "Mặt Trời",

        // --- SPECIAL ---
        "Portal Sigil": "Ấn Ký Cổng Dịch Chuyển",
        "Grand Portal Sigil": "Ấn Ký Cổng Dịch Chuyển Lớn",
        "Gelatinous Gridlock": "Chất Nhầy Lưới",
        "Automatic Cashier": "Máy Thu Ngân Tự Động"
    },
    "machines": {
        "Table Saw": "Máy Cưa Bàn",
        "Stone Crusher": "Máy Nghiền Đá",
        "Seed Plot": "Luống Giống",
        "Grinder": "Máy Nghiền",
        "Enhanced Grinder": "Máy Nghiền Nâng Cao",
        "Extractor": "Máy Trích Xuất",
        "Thermal Extractor": "Máy Trích Nhiệt",
        "Stone Furnace": "Lò Nung Đá",
        "Blast Furnace": "Lò Nung Cao",
        "Steam Heating Pad": "Đệm Sưởi Hơi Nước",
        "Crucible": "Nung Chảy",
        "Stackable Crucible": "Nung Chảy Xếp Chồng",
        "Paradox Crucible": "Nung Chảy Nghịch Lý",
        "Cauldron": "Vạc Hắc Kim",
        "Advanced Cauldron": "Vạc Hắc Kim Nâng Cao",
        "Steam Boiler": "Nồi Hơi Nước",
        "Kiln": "Lò Nung",
        "Iron Smelter": "Lò Luyện Sắt",
        "Refiner": "Máy Tinh Chế",
        "Processor": "Máy Chế Biến",
        "Arcane Processor": "Máy Chế Biến Huyền Bí",
        "Assembler": "Máy Lắp Ráp",
        "Advanced Assembler": "Máy Lắp Ráp Nâng Cao",
        "Blender": "Máy Trộn",
        "Advanced Blender": "Máy Trộn Nâng Cao",
        "Alembic": "Bình Chưng Cất",
        "Advanced Alembic": "Bình Chưng Cất Nâng Cao",
        "Athanor": "Lò Giả Kim",
        "Advanced Athanor": "Lò Giả Kim Nâng Cao",
        "Shaper": "Máy Định Hình",
        "Advanced Shaper": "Máy Định Hình Nâng Cao",
        "Arcane Shaper": "Máy Định Hình Huyền Bí",
        "Nursery": "Vường Ươm",
        "Miniature World Tree": "Cây Thế Giới Thu Nhỏ",
        "World Tree Nursery": "Vường Ươm Cây Thế Giới",
        "Knowledge Altar": "Bàn Thờ Kiến Thức",
        "Brew Barrel": "Thùng Ủ",
        "Purchasing Portal": "Cổng Mua Hàng",
        "Dispatch Portal": "Cổng Phân Phối",
        "Bank Portal": "Cổng Ngân Hàng"
    },
    "categories": {
        "Raw Materials": "Nguyên Liệu Thô", "Seeds": "Hạt Giống", "Herbs": "Thảo Mộc", "Bio-Based": "Từ Sinh Vật", "Fuel": "Nhiên Liệu", "Fertilizer": "Phân Bón", "Solid": "Rắn", "Crystal": "Pha Lê", "Component": "Linh Kiện", "Liquid": "Lỏng",
        "Mash": "Bột Nhão", "Metal": "Kim Loại", "Potion": "Thuốc", "Catalyst": "Chất Xúc Tác", "Magic": "Phép Thuật", "Jewelry": "Trang Sức", "Relic": "Cổ Vật", "Currency": "Tiền Tệ", "Other": "Khác",
        "[All]": "[ Tất Cả ]", "[Include]": "[ Bao Gồm ]", "[Exclude]": "[ Loại Trừ ]", "[Product]": "[ Sản Phẩm ]"
    }
};
