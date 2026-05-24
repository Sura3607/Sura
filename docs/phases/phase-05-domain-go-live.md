# Phase 05 - Domain Và Go Live

## Mục Tiêu Phase

Đưa portfolio lên domain riêng qua Vercel và Squarespace DNS, kiểm tra HTTPS, redirect, performance cơ bản và preview social.

## Trạng Thái Hiện Tại Cần Kiểm Tra Trước Khi Làm

- Đọc mục `13. Domain & DNS`, `16. Git Branch & Deploy Workflow`, và `21. Checklist Trước Khi Go-Live`.
- Kiểm tra app đã build sạch ở local.
- Kiểm tra Vercel project đã được tạo và link đúng GitHub repo.
- Kiểm tra domain thật người dùng muốn dùng.
- Cập nhật `implementation-notes.html` trước khi ghi cấu hình go-live.

## Phạm Vi Trong Phase

- Add custom domain trong Vercel.
- Lấy DNS record trực tiếp từ Vercel dashboard.
- Cấu hình DNS trong Squarespace.
- Kiểm tra HTTPS, www redirect, canonical URL.
- Test PageSpeed Insights, Open Graph preview, sitemap.
- Submit sitemap lên Google Search Console nếu tài khoản sẵn sàng.

## Ngoài Phạm Vi

- Không hard-code DNS record vào tài liệu.
- Không mua domain mới nếu người dùng chưa yêu cầu.
- Không refactor UI lớn.
- Không thay đổi CMS schema trừ lỗi go-live bắt buộc.

## Checklist Triển Khai

### Checkpoint 1 - Deployment readiness

- [ ] `npm run build` sạch.
- [ ] Env production trên Vercel đầy đủ.
- [ ] Preview deployment hoạt động.
- [ ] `/admin` chỉ dùng cho người có quyền Sanity.

Điều kiện hoàn thành: preview URL hoạt động trước khi trỏ domain.

### Checkpoint 2 - Domain setup

- [ ] Add apex domain và `www` trong Vercel.
- [ ] Copy DNS records từ Vercel tại thời điểm cấu hình.
- [ ] Thêm records vào Squarespace DNS.
- [ ] Chờ DNS propagate.

Điều kiện hoàn thành: Vercel báo domain valid.

### Checkpoint 3 - Go-live checks

- [ ] HTTPS hoạt động.
- [ ] `www` redirect đúng theo cấu hình đã chọn.
- [ ] `NEXT_PUBLIC_SITE_URL` khớp domain production.
- [ ] Sitemap và robots dùng domain production.

Điều kiện hoàn thành: domain public truy cập được và không lỗi SSL.

### Checkpoint 4 - External validation

- [ ] Test PageSpeed Insights.
- [ ] Test Open Graph preview.
- [ ] Submit sitemap lên Google Search Console nếu có quyền.
- [ ] Kiểm tra link social/contact/resume.

Điều kiện hoàn thành: các lỗi go-live quan trọng đã được sửa hoặc ghi blocker.

## Quy Tắc Chống Hết Token

- Làm theo thứ tự preview -> DNS -> HTTPS -> SEO external.
- Nếu DNS chưa propagate, ghi thời điểm kiểm tra và trạng thái vào notes, không đoán.
- Không đổi DNS record theo ví dụ cũ; luôn lấy record hiện tại từ Vercel.

## Deliverables

- Portfolio live trên domain riêng.
- HTTPS và redirect đúng.
- Sitemap submitted hoặc có hướng dẫn submit.
- Notes ghi lại domain, trạng thái DNS, blocker nếu có.

## Verification

- `npm run build`
- Kiểm tra domain apex và `www`.
- Kiểm tra `/sitemap.xml`, `/robots.txt`, OG preview.
- Kiểm tra PageSpeed Insights hoặc ghi rõ nếu chưa chạy được.

## Handoff Notes Cho Phase Kế Tiếp

Phase 06 cần biết domain production, nơi theo dõi analytics/Search Console, lịch backup Sanity và checklist vận hành định kỳ.
