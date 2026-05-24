# Sanity Sample Data Checklist

Phase 02 không nhập dữ liệu trực tiếp vào Sanity vì môi trường local chưa có `NEXT_PUBLIC_SANITY_PROJECT_ID` thật và chưa có quyền ghi Content Lake. Dùng checklist này để tạo dữ liệu mẫu trong `/admin` sau khi cấu hình Sanity project.

## Thứ Tự Nhập Khuyến Nghị

1. `siteSettings`
2. `profile`
3. `project`
4. `skill`
5. `certificate`
6. `experience`
7. `blogPost`

## `siteSettings` - 1 Document

- `siteTitle`: Sura Portfolio
- `siteDescription`: Mô tả ngắn dưới 160 ký tự, dùng cho SEO mặc định.
- `siteUrl`: URL local hoặc production hiện tại.
- `navbarLinks`: Home, Projects, Skills, Resume, Blog, Contact.
- `footerText`: Một câu ngắn về portfolio.
- `socialLinks`: GitHub, LinkedIn, Facebook nếu dùng.
- `seoKeywords`: Next.js, TypeScript, Backend, AI, Software Engineer.

## `profile` - 1 Document

- `name`: Tên thật hoặc tên hiển thị.
- `title`: Vai trò mục tiêu, ví dụ Backend / AI / Software Engineer.
- `shortBio`: 1-2 câu mô tả năng lực.
- `longBio`: Bio dài hơn cho trang About.
- `location`, `email`, `githubUrl`, `linkedinUrl`, `facebookUrl`.
- `resumeFile` hoặc `resumeUrl`.
- `heroCtaPrimary`, `heroCtaSecondary`.

## `project` - 3 Documents

Mỗi project nên có:

- `title`, `slug`, `summary`.
- `problem`, `solution`, `architecture`.
- `techStack`: ít nhất 1 công nghệ.
- `category`: Backend, AI/ML, Full-stack, Tooling hoặc Academic.
- `status`: `Learning`, `In Progress`, `Completed`, hoặc `Archived`.
- `featured`: bật cho 1-3 project quan trọng.
- `priority`: số nhỏ hơn hiện trước.
- `githubUrl`, `demoUrl` nếu có thể public.
- `screenshots`, `lessonsLearned`, `futureImprovements`.
- `seoTitle`, `seoDescription`, `ogImage` nếu đã có.

## `skill` - 10 Documents

Gợi ý nhóm:

- Language: TypeScript, JavaScript, Python.
- Framework: Next.js, React, Node.js.
- Database: PostgreSQL, MongoDB.
- AI/ML: Prompt Engineering hoặc ML basics.
- Tool/Cloud: Git, Vercel, Docker.

Mỗi skill cần `name`, `category`, `level`, `order`; liên kết `usedInProjects` nếu có project liên quan.

## `certificate` - Tối Đa 2 Documents Nếu Có

- `title`, `issuer`, `issuedDate`.
- `credentialUrl` nếu public.
- `badgeImage` nếu có.
- `description` ngắn.
- `order` để kiểm soát thứ tự.

## `experience` - Ít Nhất 1 Document Nếu Có

- `organization`, `role`, `type`.
- `startDate`, `endDate`, `isCurrent`.
- `description`.
- `technologies`.
- `order`.

## `blogPost` - 1 Document

- `title`, `slug`, `excerpt`.
- `body` với ít nhất 3 phần: bối cảnh, cách làm, điều học được.
- `tags`.
- `publishedAt`, `readingTime`.
- `isPublished`: bật nếu muốn hiển thị public.
- `seoTitle`, `seoDescription`, `ogImage` nếu có.

## Ghi Chú Cho Phase 03

Frontend phải render fallback khi các document này chưa tồn tại hoặc field optional bị trống. Không giả định Sanity đã có đầy đủ dữ liệu mẫu.
