# Phase 02 - CMS Schema Và Dữ Liệu Mẫu

## Mục Tiêu Phase

Hoàn thiện schema Sanity và dữ liệu mẫu tối thiểu để frontend có nguồn dữ liệu rõ ràng cho profile, projects, skills, certificates, experiences, blog posts và site settings.

## Trạng Thái Hiện Tại Cần Kiểm Tra Trước Khi Làm

- Đọc schema hiện có trong `sanity/schemas/`.
- Đọc mục `6. CMS Schema` trong `docs/portfolio-nextjs-sanity-vercel-plan.md`.
- Kiểm tra `lib/sanity.queries.ts` để biết frontend sẽ query gì.
- Kiểm tra `types/` để tránh schema và type bị lệch.
- Cập nhật `implementation-notes.html` trước khi sửa schema.

## Phạm Vi Trong Phase

- Hoàn thiện schema `profile`, `project`, `skill`, `certificate`, `experience`, `blogPost`, `siteSettings`.
- Bổ sung preview/order/validation cơ bản nếu cần để Studio dễ nhập liệu.
- Chuẩn hóa query GROQ tương ứng với schema.
- Chuẩn bị dữ liệu mẫu hoặc hướng dẫn nhập dữ liệu mẫu trong Sanity.

## Ngoài Phạm Vi

- Không xây UI đầy đủ cho các page.
- Không tối ưu SEO nâng cao.
- Không deploy domain.
- Không nhập dữ liệu thật nhạy cảm vào repo.

## Checklist Triển Khai

### Checkpoint 1 - Schema completeness

- [ ] So sánh từng schema với mục 6 trong plan chính.
- [ ] Bổ sung field thiếu nhưng không đổi tên field đã được frontend dùng nếu không cần thiết.
- [ ] Đảm bảo `slug` bắt buộc cho project và blog post.
- [ ] Đảm bảo image fields dùng `hotspot` ở những nơi cần crop.

Điều kiện hoàn thành: Studio schema load được và TypeScript không lỗi.

### Checkpoint 2 - Studio usability

- [ ] Thêm preview cho project, blog post, skill, certificate, experience nếu thiếu.
- [ ] Sắp xếp desk structure theo nhóm dễ nhập liệu.
- [ ] Đảm bảo profile/siteSettings có hướng dẫn dùng như single document nếu cần.

Điều kiện hoàn thành: người dùng có thể biết cần nhập tài liệu nào trước.

### Checkpoint 3 - Sample data contract

- [ ] Chuẩn bị danh sách dữ liệu mẫu: 1 profile, 3 projects, 10 skills, tối đa 2 certificates nếu có, 1 blog post.
- [ ] Nếu không thể tạo dữ liệu trực tiếp vì thiếu Sanity credentials, ghi rõ hướng dẫn nhập trong notes hoặc file docs.
- [ ] Đảm bảo query không giả định dữ liệu luôn tồn tại.

Điều kiện hoàn thành: frontend phase sau biết chính xác dữ liệu nào có thể query.

## Quy Tắc Chống Hết Token

- Làm schema trước, data sample sau.
- Không thiết kế UI trong phase này.
- Nếu phát sinh tranh luận về field mới, ghi giả định vào `implementation-notes.html` và chọn field tối thiểu theo plan chính.

## Deliverables

- Schema Sanity đầy đủ theo plan.
- Query GROQ tối thiểu cho các page frontend.
- TypeScript content types đồng bộ ở mức cần thiết.
- Ghi chú rõ cách tạo dữ liệu mẫu.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Mở `/admin` nếu có thể để xác nhận Studio không lỗi schema.

## Handoff Notes Cho Phase Kế Tiếp

Phase 03 cần biết field nào là required, field nào optional, và query nào đã sẵn sàng. Nếu dữ liệu mẫu chưa được nhập thật vào Sanity, Phase 03 phải render fallback UI thay vì giả định có content.
