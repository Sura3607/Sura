# Phase 04 - SEO, Revalidation Và Contact

## Mục Tiêu Phase

Hoàn thiện SEO động, sitemap/robots, revalidation từ Sanity webhook và contact flow theo plan.

## Trạng Thái Hiện Tại Cần Kiểm Tra Trước Khi Làm

- Đọc mục `9. SEO Requirements`, `10. Revalidation / Caching`, và `11. Contact Form` trong plan chính.
- Kiểm tra `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`.
- Kiểm tra `app/api/revalidate/route.ts` và `app/api/contact/route.ts`.
- Kiểm tra `.env.example` có đủ biến cần thiết.
- Cập nhật `implementation-notes.html` trước khi sửa API/SEO.

## Phạm Vi Trong Phase

- Dynamic metadata cho page tĩnh và page detail.
- Open Graph fallback.
- Sitemap động từ Sanity slugs nếu credentials/query sẵn sàng.
- Robots configuration.
- `/api/revalidate` kiểm tra secret và revalidate tag/path.
- Contact mailto hoặc Resend form với validation.

## Ngoài Phạm Vi

- Không cấu hình domain DNS thật.
- Không thay đổi schema lớn nếu không cần.
- Không thêm database riêng.
- Không lưu contact message trong repo.

## Checklist Triển Khai

### Checkpoint 1 - SEO metadata

- [ ] Chuẩn hóa helper metadata.
- [ ] Thêm metadata cho Home, About, Projects, Project detail, Skills, Resume, Blog, Blog detail, Contact.
- [ ] Đảm bảo description không quá dài và có fallback.

Điều kiện hoàn thành: metadata không crash khi thiếu Sanity content.

### Checkpoint 2 - Sitemap và robots

- [ ] Sitemap chứa route tĩnh chính.
- [ ] Nếu Sanity sẵn sàng, sitemap bổ sung project/blog slugs published.
- [ ] Robots không block site public và block `/admin`.

Điều kiện hoàn thành: `/sitemap.xml` và `/robots.txt` truy cập được.

### Checkpoint 3 - Revalidation

- [ ] API kiểm tra `SANITY_REVALIDATE_SECRET`.
- [ ] Revalidate theo tag/path an toàn.
- [ ] Document cách cấu hình Sanity webhook.

Điều kiện hoàn thành: request sai secret trả 401, request đúng secret trả success.

### Checkpoint 4 - Contact

- [ ] Nếu dùng MVP, contact page dùng mailto rõ ràng.
- [ ] Nếu dùng Resend, form validate name/email/message/honeypot.
- [ ] Không expose `RESEND_API_KEY` ra client.
- [ ] Hiển thị success/error state rõ ràng.

Điều kiện hoàn thành: contact flow có thể dùng hoặc có fallback mailto.

## Quy Tắc Chống Hết Token

- Ưu tiên SEO và revalidation trước contact nâng cao.
- Nếu thiếu Resend key hoặc domain email, dùng mailto và ghi blocker trong notes.
- Không mở rộng sang analytics hoặc domain trong phase này.

## Deliverables

- Metadata động và fallback ổn định.
- Sitemap/robots hoạt động.
- Revalidation API an toàn.
- Contact flow MVP hoặc Resend form hoàn chỉnh.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Test `/sitemap.xml`, `/robots.txt`.
- Test `/api/revalidate` với secret sai và đúng nếu có env.
- Test contact validation nếu có form.

## Handoff Notes Cho Phase Kế Tiếp

Phase 05 cần biết `NEXT_PUBLIC_SITE_URL`, domain dự kiến, trạng thái Vercel deployment, và email/contact mode đang dùng.
