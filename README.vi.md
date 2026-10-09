[English](README.md) | [Tiếng Việt](README.vi.md)

# Máy Tính Nhà Máy Giả Kim

Công cụ tính toán kế hoạch sản xuất trên trình duyệt cho trò chơi **Alchemy Factory**.
Tính toán chính xác tiêu hao nguyên liệu, số lượng máy, tải nhiệt/dinh dưỡng và lợi nhuận cho bất kỳ chuỗi sản xuất nào.

**Phiên bản trực tuyến:** [https://interface-daodung.github.io/AlchemyFactoryCalculator/](https://interface-daodung.github.io/AlchemyFactoryCalculator/)

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
| 💾 **Lưu Trữ Bền Vững** | Tất cả cài đặt, công thức và danh sách tự động lưu vào `localStorage` của trình duyệt |
| 🌐 **Giao Diện Song Ngữ** | Chuyển đổi giữa tiếng Anh và tiếng Việt; nội dung dịch hoàn toàn có thể tùy chỉnh |
| 🔗 **Liên Kết Chia Sẻ** | Vật phẩm và tốc độ hiện tại được phản ánh trong URL để dễ chia sẻ |

---

## 🚀 Bắt Đầu Nhanh

#### Trực tuyến
Mở [https://interface-daodung.github.io/AlchemyFactoryCalculator/](https://interface-daodung.github.io/AlchemyFactoryCalculator/) trong bất kỳ trình duyệt hiện đại nào. Không cần cài đặt.

#### Cục bộ
1. Tải xuống hoặc clone kho lưu trữ này.
2. Mở `index.html` trực tiếp trong trình duyệt.
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
- Trong cửa sổ quản lý có thể **kéo để sắp xếp**, **đổi tên tại chỗ** (nhấp để xuất hiện ô nhập), **sao chép**, **xóa**, hoặc **xuất** từng kế hoạch thành tệp `.json`. **Kế hoạch mới** tạo kế hoạch trống, **⭱ Nhập** tải tệp `.json` đã xuất trước đó.
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

- **Vạc hắc kim thường (3 ô):** `T = (Cost₁ + Cost₂ + Cost₃) × Ratio`
  - Tất cả khác nhau → ×1.0, hai giống → ×0.65, ba giống → ×0.5
  - Đầu ra là vật phẩm `cauldronTarget` gần giá trị T nhất.
- **Vạc hắc kim nâng cao (2 ô):**
  - Giống + Giống → `T = Cost₁`, khớp sản phẩm gần nhất **lên trên**.
  - A + B (khác nhau) → `T = |Cost₁ − Cost₂|`, khớp sản phẩm gần nhất (và giá trị mục tiêu của nó nhỏ hơn giá trị hắc kim lớn nhất trong hai).

Chuyển đổi loại giữa các nút chuyển **Vạc hắc kim / Vạc hắc kim nâng cao** ở trên cùng.

### Nguyên Liệu Ứng Viên

Bảng bên trái liệt kê tất cả vật phẩm có thể dùng làm nguyên liệu hắc kim (phải có `cauldronCost` và không phải lỏng). Đánh dấu/bỏ đánh dấu vật phẩm để quyết định có đưa vào tìm kiếm hay không.

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
- **Xuất** — lưu tất cả yêu thích thành tệp `.txt` (định dạng: `vật phẩm1 + vật phẩm2 (+ vật phẩm3) = sản phẩm`)
- **Nhập** — tải tệp `.txt` để nhập hàng loạt công thức
- **Đồng bộ dữ liệu** — tiêm tất cả công thức vạc hắc kim đã lưu vào cơ sở dữ liệu sản xuất chính, máy tính có thể lập kế hoạch chuỗi sản xuất đầy đủ bao gồm công đoạn vạc hắc kim
- **Hiển thị chi phí ước tính** sẽ hiển thị chi phí ước tính trong kết quả một bước, **Sắp xếp theo chi phí ước tính** sắp xếp theo chi phí đó.

### Cửa Sổ Chỉnh Sửa Công Thức Vạc Hắc Kim Nhanh

Trong trình chọn công thức của máy tính, vật phẩm có `cauldronTarget` sẽ hiển thị nút nhanh, mở **cửa sổ chỉnh sửa công thức vạc hắc kim nhanh**:
- Chỉ định nguyên liệu cho mỗi ô thông qua trình chọn vật phẩm hoặc mũi tên **+/−**.
- Hiển thị thời gian thực giá trị T, phạm vi hiệu lực `[dưới, trên]` và khoảng cách đến mỗi biên.
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
- **Translations** — Đối tượng `ALCHEMY_I18N` điều khiển tất cả chuỗi giao diện và tên vật phẩm/máy
- **Settings** — Tùy chọn người dùng hiện tại (định dạng JSON)
- **(\*BACKUP)** biến thể — Phiên bản trước đó được tự động lưu trước mỗi lần áp dụng

Chỉnh sửa JSON trực tiếp trong vùng văn bản, nhấp **Áp dụng thay đổi** để tải lại ngay. Dùng **Xuất ra tệp** để lưu bản sao.

> **Lưu ý:** Áp dụng dữ liệu mới sẽ tải lại trang và ghi đè bản sao cục bộ. Hãy xuất bản sao trước khi áp dụng.

---

## 🌐 Ngôn Ngữ và Bản Địa Hóa

Nhấp **🌐 EN/Tiếng Việt** ở đầu trang để chuyển đổi giữa tiếng Anh và tiếng Việt.

Lớp dịch (`alchemy_i18n.js`) ánh xạ tất cả tên vật phẩm, tên máy, danh mục và chuỗi giao diện. Có thể tùy chỉnh thông qua **Trình chỉnh sửa dữ liệu → Translations**, kết quả sửa đổi được lưu vào `localStorage`.

---

## 🔗 Tham Số URL

URL phản ánh trạng thái hiện tại, có thể đánh dấu hoặc chia sẻ:

| Tham Số | Mô Tả | Ví Dụ |
|---|---|---|
| `item` | Tên vật phẩm mục tiêu | `?item=Steel%20Ingot` |
| `rate` | Tốc độ sản xuất (vật phẩm/phút) | `&rate=60` |
| `tab` | Tab kích hoạt khi tải | `&tab=cauldron` |
| `lang` | Ép buộc ngôn ngữ (`en` ép buộc tiếng Anh) | `&lang=en` |
| `fuel` | Ghi đè nguồn nhiên liệu | `&fuel=Coke` |
| `fert` | Ghi đè nguồn phân bón | `&fert=Basic%20Fertilizer` |
| `setupgrades` | Cấp nâng cấp phân cách bằng dấu phẩy (chỉ mục 0–9) | `&setupgrades=5,0,3,2,1,1,0,0,0,0` |

> Chỉ mục `setupgrades` tương ứng: `[0]` hiệu quả hậu cần, `[1]` (không dùng), `[2]` hiệu quả nhà máy, `[3]` kỹ năng giả kim, `[4]` hiệu quả nhiên liệu, `[5]` hiệu quả phân bón, `[6]` kỹ năng bán hàng, `[7–9]` (không dùng).

---

## ⚙️ Tùy Chọn Đặt Lại

| Nút | Hiệu Ứng |
|---|---|
| **Đặt lại công thức** | Xóa dữ liệu cục bộ, khôi phục phiên bản tích hợp (tự động sao lưu phiên bản hiện tại) |
| **Đặt lại bản dịch** | Xóa ghi đè bản dịch cục bộ (tự động sao lưu phiên bản hiện tại) |
| **Đặt lại tất cả** | Xóa tất cả dữ liệu `localStorage` và tải lại với giá trị mặc định |

Khi dữ liệu tích hợp (`alchemy_db.js`) có phiên bản mới hơn phiên bản cục bộ, **biểu ngữ cập nhật** sẽ hiển thị ở đầu trang. Chọn **Cập nhật ngay** (ghi đè dữ liệu cục bộ nhưng giữ cài đặt người dùng) hoặc **Bỏ qua cập nhật**.

---

## 🏗️ Cấu Trúc Dự Án

```
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
```

Không có công cụ dựng, trình đóng gói hay phụ thuộc bên ngoài. Thuần HTML + CSS + JavaScript thuần.

### Vì sao cần `alchemy_readme.js`

Tab Wiki → **Tài liệu đầy đủ** hiển thị chính tệp này dưới dạng Markdown. Nội dung được lấy theo hai
bước, và `alchemy_readme.js` tồn tại để phục vụ bước thứ hai:

1. Trước tiên nó tìm `window.ALCHEMY_README[lang]` trong `alchemy_readme.js` — một object JS thuần
   chứa một template literal cho mỗi ngôn ngữ:

   ```js
   window.ALCHEMY_README = {
       en: `[EN](README.md) | ...`,
       vi: `[English](README.md) | ...`,
   };
   ```

2. Chỉ khi không tìm thấy key đó, nó mới `fetch()` tệp `.md` từ đĩa.

Lý do tồn tại bản nhúng là giao thức `file://`. Trình duyệt chặn `fetch()` đối với tài nguyên cục bộ
dưới giao thức này, nên người dùng tải repo về rồi mở thẳng `index.html` sẽ thấy tab tài liệu trống.
Đường dẫn `fetch` vẫn được giữ lại cho bản deploy online, vì vậy tệp Markdown vẫn là nguồn sự thật và
file JS chỉ là bản sao.

Đổi lại, không có bước build nào tự sinh lại bản sao, nên hai bên có thể lệch nhau. Khi sửa tài liệu,
cần cập nhật **cả bốn** nơi:

| Vị trí | Ngôn ngữ |
|---|---|
| `README.md` | Tiếng Anh |
| `js/alchemy_readme.js` → `en` | Tiếng Anh |
| `README.vi.md` | Tiếng Việt |
| `js/alchemy_readme.js` → `vi` | Tiếng Việt |

Script sau giúp đồng bộ nhanh bản nhúng:

```js
// sinh lại README.vi.md từ bản nhúng
const vm = require('vm'), fs = require('fs');
const s = { window: {} }; vm.createContext(s);
vm.runInContext(fs.readFileSync('js/alchemy_readme.js', 'utf8'), s);
fs.writeFileSync('README.vi.md', s.window.ALCHEMY_README.vi, 'utf8');
```

---

## 🤝 Đóng Góp và Tùy Chỉnh

- **Hoan nghênh Fork.** Tất cả dữ liệu và logic đều là tệp văn bản thuần.
- Thêm vật phẩm hoặc công thức mới: chỉnh sửa `alchemy_db.js`, hoặc dùng trình chỉnh sửa dữ liệu trong trình duyệt.
- Sửa bản dịch: chỉnh sửa `alchemy_i18n.js`, hoặc dùng trình chỉnh sửa dữ liệu → Translations.
- Sửa tài liệu: chỉnh sửa các tệp Markdown **và** block tương ứng trong `alchemy_readme.js` — xem [Vì sao cần `alchemy_readme.js`](#vì-sao-cần-alchemy_readme-js).
- Engine tính toán (`alchemy_calc_engine.js`) tách biệt hoàn toàn khỏi UI, có thể dùng độc lập.

---

*Máy tính này là fork của bản gốc [AlchemyFactoryCalculator](https://joejoesgit.github.io/AlchemyFactoryCalculator/) bởi JoeJoesGit, với bản địa hóa tiếng Việt, máy tính vạc hắc kim, wiki, trình lập kế hoạch, thông báo cập nhật dữ liệu tăng dần và nhiều cải tiến UI.*
*Dữ liệu từ [AlchemyFactoryData](https://github.com/faultyd3v/AlchemyFactoryData) bởi faultyd3v.*
