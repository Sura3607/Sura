# Phase 06 - Vận Hành Lâu Dài

## Mục Tiêu Phase

Thiết lập nhịp vận hành portfolio sau go-live: cập nhật project/CV/blog, kiểm tra link, theo dõi search, và backup nội dung.

## Trạng Thái Hiện Tại Cần Kiểm Tra Trước Khi Làm

- Đọc mục `21. Checklist Trước Khi Go-Live` và `17. Giai đoạn 6` trong plan chính.
- Kiểm tra domain production đã live.
- Kiểm tra quyền truy cập Sanity, Vercel, Google Search Console.
- Kiểm tra contact/resume/social links.
- Cập nhật `implementation-notes.html` trước khi thêm tài liệu vận hành.

## Phạm Vi Trong Phase

- Quy trình cập nhật project thật.
- Quy trình cập nhật CV.
- Quy trình viết blog/notes.
- Lịch kiểm tra broken links.
- Theo dõi Google Search Console.
- Backup/export Sanity content định kỳ nếu cần.

## Ngoài Phạm Vi

- Không xây feature lớn mới.
- Không đổi stack hosting/CMS.
- Không thêm database riêng nếu chưa có yêu cầu mới.
- Không thay đổi domain nếu site đang ổn.

## Checklist Triển Khai

### Checkpoint 1 - Content maintenance

- [ ] Document cách thêm project mới trong Sanity.
- [ ] Document checklist project: problem, solution, tech stack, screenshot, GitHub/demo, lessons learned.
- [ ] Document cách cập nhật CV PDF.
- [ ] Document tiêu chuẩn blog/notes nếu viết bài.

Điều kiện hoàn thành: người dùng có thể tự cập nhật content mà không sửa code.

### Checkpoint 2 - Monthly health checks

- [ ] Kiểm tra broken links.
- [ ] Kiểm tra contact link/form.
- [ ] Kiểm tra resume download.
- [ ] Kiểm tra page quan trọng trên mobile.

Điều kiện hoàn thành: có checklist lặp lại được mỗi tháng.

### Checkpoint 3 - Search and analytics

- [ ] Theo dõi Google Search Console indexing.
- [ ] Kiểm tra sitemap vẫn hợp lệ.
- [ ] Kiểm tra traffic cơ bản nếu dùng Vercel Analytics hoặc Google Analytics.

Điều kiện hoàn thành: có nơi xem vấn đề index/traffic.

### Checkpoint 4 - Backup and recovery

- [ ] Document cách export Sanity content.
- [ ] Ghi lịch backup đề xuất.
- [ ] Ghi cách restore hoặc import lại nếu cần.

Điều kiện hoàn thành: có hướng dẫn backup đủ rõ cho personal portfolio.

## Quy Tắc Chống Hết Token

- Phase này chủ yếu là tài liệu/quy trình, không kéo feature mới vào.
- Nếu phát hiện nhu cầu feature mới, ghi thành backlog riêng thay vì làm ngay.
- Giữ mỗi quy trình đủ ngắn để người dùng làm lại được mà không cần đọc toàn bộ codebase.

## Deliverables

- Checklist vận hành định kỳ.
- Quy trình cập nhật content/CV/blog.
- Quy trình theo dõi search/analytics.
- Quy trình backup Sanity.

## Verification

- Kiểm tra docs vận hành có link đúng tới `/admin`, Vercel, Search Console nếu có.
- Kiểm tra không có thông tin nhạy cảm trong docs.
- Không cần chạy build nếu chỉ sửa tài liệu.

## Handoff Notes Cho Phase Kế Tiếp

Sau Phase 06, mọi yêu cầu mới nên được xem như feature/backlog riêng, có spec riêng và `implementation-notes.html` riêng cho quá trình triển khai.
