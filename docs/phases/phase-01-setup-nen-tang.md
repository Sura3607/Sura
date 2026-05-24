# Phase 01 - Setup Nền Tảng

## Trạng Thái Thực Hiện

- Local foundation: Hoàn tất.
- GitHub/Vercel preview deployment: Chưa thực hiện trong local phase này vì cần tài khoản/project bên ngoài.
- Verification đã chạy: `npm run typecheck`, `npm run lint`, `npm run build`, smoke test `/`, smoke test `/admin`.

## Mục Tiêu Phase

Hoàn thiện nền móng kỹ thuật để portfolio có thể chạy local, deploy skeleton, và có Sanity Studio cơ bản tại `/admin`.

## Trạng Thái Hiện Tại Cần Kiểm Tra Trước Khi Làm

- Repo đang ở root `Sura/`, không nằm trong thư mục con cũ.
- Đọc `AGENTS.md` trước khi sửa code, đặc biệt rule `implementation-notes.html`.
- Đọc `docs/DESIGN.md` trước khi sửa UI.
- Kiểm tra `package.json`, `app/`, `sanity.config.ts`, `.env.example`.
- Chạy kiểm tra nền nếu cần: `npm run typecheck`, `npm run lint`.

## Phạm Vi Trong Phase

- Next.js App Router + TypeScript + Tailwind chạy được.
- Cấu trúc thư mục chính đúng plan.
- Sanity Studio embed tại `/admin`.
- Environment variables được document trong `.env.example`.
- Skeleton deploy được lên Vercel sau khi có repository GitHub.

## Ngoài Phạm Vi

- Không xây đầy đủ UI từng trang.
- Không nhập dữ liệu thật vào Sanity.
- Không cấu hình domain riêng.
- Không tối ưu SEO chi tiết ngoài metadata mặc định.

## Checklist Triển Khai

### Checkpoint 1 - Project foundation

- [x] Xác nhận app chạy từ root `Sura/`.
- [x] Xác nhận scripts `dev`, `build`, `lint`, `typecheck`, `sanity` tồn tại.
- [x] Xác nhận Tailwind compile được với `app/globals.css`.
- [x] Xác nhận alias `@/*` hoạt động.

Điều kiện hoàn thành: `npm run typecheck` và `npm run lint` không lỗi.

### Checkpoint 2 - Sanity foundation

- [x] Xác nhận `sanity.config.ts` dùng đúng `projectId`, `dataset`, `apiVersion`.
- [x] Xác nhận route `/admin` render Studio mà không làm hỏng build.
- [x] Xác nhận `sanity.cli.ts` có cấu hình CLI.
- [x] Xác nhận `.env.example` có đủ biến theo plan.

Điều kiện hoàn thành: `npm run build` không lỗi ở route `/admin`.

### Checkpoint 3 - Deploy readiness

- [x] Xác nhận `.gitignore` không commit `.env.local`, `.next`, `node_modules`.
- [x] Xác nhận `.gitignore` cho phép commit `.env.example`.
- [x] Xác nhận README có lệnh chạy local và path docs đúng.
- [ ] Nếu deploy thật, kết nối GitHub -> Vercel và tạo preview deployment.

Điều kiện hoàn thành: skeleton có thể chạy local và có checklist rõ để deploy.

## Quy Tắc Chống Hết Token

- Không triển khai nội dung trang thật trong phase này.
- Nếu phát hiện thiếu dependency lớn, chỉ thêm dependency cần cho foundation.
- Nếu deploy/Vercel cần thao tác ngoài local, ghi lại trong `implementation-notes.html` và dừng ở trạng thái local sạch.

## Deliverables

- App Next.js chạy local.
- Sanity Studio truy cập được ở `/admin`.
- `.env.example` đầy đủ.
- README cập nhật.
- `implementation-notes.html` ghi lại quyết định và blocker nếu có.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Smoke test local `/` và `/admin` nếu server chạy được.

## Handoff Notes Cho Phase Kế Tiếp

Phase 02 chỉ bắt đầu khi schema foundation ổn và `/admin` không làm hỏng build. Nếu chưa có Sanity project thật, Phase 02 vẫn có thể hoàn thiện schema local và ghi rõ phần cần projectId thật trong notes.
