# Phase 03 - Frontend Pages

## Mục Tiêu Phase

Xây các route public chính của portfolio, lấy dữ liệu từ Sanity khi có thể, và giữ UI thống nhất với `docs/DESIGN.md` cùng phong cách setup đã chọn.

## Trạng Thái Hiện Tại Cần Kiểm Tra Trước Khi Làm

- Đọc `docs/DESIGN.md` và mục `8. UI / Design System` trong plan chính.
- Đọc các schema/query đã hoàn thiện ở Phase 02.
- Kiểm tra các route hiện có trong `app/`.
- Kiểm tra component base trong `components/`.
- Cập nhật `implementation-notes.html` trước khi sửa UI.

## Phạm Vi Trong Phase

- Home page.
- About page.
- Projects list.
- Project detail page.
- Skills page.
- Resume page.
- Blog list.
- Blog detail page.
- Contact page.
- 404 page và layout/navigation/footer cần thiết.

## Ngoài Phạm Vi

- Không làm domain/go-live.
- Không thêm 3D model phức tạp.
- Không xây CMS schema mới nếu không thật sự cần cho UI.
- Không tối ưu SEO nâng cao ngoài metadata cơ bản đã cần cho page.

## Checklist Triển Khai

### Checkpoint 1 - Layout shell và Home/About

- [ ] Hoàn thiện `Navbar`, `Footer`, layout responsive.
- [ ] Home thể hiện được workflow năng lực: problem -> approach -> project evidence -> contact.
- [ ] About render bio, education/direction, experience/certificate nếu có dữ liệu.
- [ ] Fallback UI rõ ràng khi Sanity chưa có content.

Điều kiện hoàn thành: `/` và `/about` render đẹp trên mobile/desktop và không hard-code thông tin nhạy cảm.

### Checkpoint 2 - Projects

- [ ] Projects list có card screenshot-first, tag/status metadata, filter cơ bản nếu dữ liệu hỗ trợ.
- [ ] Project detail render problem, solution, architecture, tech stack, screenshots, links, lessons learned.
- [ ] Slug không tồn tại trả 404.

Điều kiện hoàn thành: `/projects` và `/projects/[slug]` hoạt động với dữ liệu hoặc fallback.

### Checkpoint 3 - Blog

- [ ] Blog list render published posts.
- [ ] Blog detail render Portable Text.
- [ ] Cover image/metadata có fallback.

Điều kiện hoàn thành: `/blog` và `/blog/[slug]` không crash khi thiếu bài viết.

### Checkpoint 4 - Resume, Skills, Contact, 404

- [ ] Skills group theo category và dùng level dạng kinh nghiệm, không dùng proficiency bar.
- [ ] Resume có HTML summary và nút download PDF.
- [ ] Contact ưu tiên mailto hoặc form nếu Phase 04 đã bật Resend.
- [ ] 404 có link quay về Home.

Điều kiện hoàn thành: các route còn lại render đầy đủ và không overlap UI.

## Quy Tắc Chống Hết Token

- Giữ Phase 3 trong một file, nhưng khi triển khai phải làm tuần tự theo checkpoint.
- Sau mỗi checkpoint, chạy kiểm tra phù hợp và cập nhật `implementation-notes.html`.
- Nếu token gần hết, hoàn thành checkpoint hiện tại, ghi handoff rõ: route đã xong, route chưa xong, test đã chạy.
- Không kéo SEO/contact backend/domain vào phase này trừ phần tối thiểu để page không lỗi.

## Deliverables

- Tất cả route public chính có UI hoàn chỉnh.
- Component layout/section/card tái sử dụng được.
- UI bám `docs/DESIGN.md`.
- Fallback state cho dữ liệu thiếu.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Kiểm tra responsive mobile/tablet/desktop nếu có browser local.
- Kiểm tra không có text tràn/overlap ở các trang chính.

## Handoff Notes Cho Phase Kế Tiếp

Phase 04 sẽ bổ sung SEO chi tiết, revalidation và contact backend. Nếu Phase 03 chỉ dùng mailto hoặc metadata placeholder, ghi rõ trong `implementation-notes.html` để Phase 04 thay thế đúng chỗ.
