# Kế Hoạch Xây Dựng Portfolio Cá Nhân — Next.js + Sanity CMS + Vercel

> **Mục tiêu:** Portfolio dynamic, hiện đại, dễ cập nhật, tối ưu cho việc ứng tuyển IT / AI / Backend / Software Engineering.  
> **Stack:** Next.js + TypeScript + Tailwind CSS · Sanity CMS · Vercel · Squarespace Domain  
> **Nguyên tắc chi phí:** Chỉ trả tiền domain trên Squarespace. Hosting, CMS, source control, SSL ưu tiên free tier.

---

## 1. Kiến Trúc Tổng Thể

```txt
┌─────────────────────────────────────────────────────────┐
│                    NGƯỜI DÙNG (Browser)                  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    VERCEL HOSTING                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │              NEXT.JS APPLICATION                  │   │
│  │                                                  │   │
│  │   Static / ISR Pages                             │   │
│  │   • /                                            │   │
│  │   • /about                                       │   │
│  │   • /skills                                      │   │
│  │   • /resume                                      │   │
│  │   • /projects                                    │   │
│  │   • /projects/[slug]                             │   │
│  │   • /blog                                        │   │
│  │   • /blog/[slug]                                 │   │
│  │   • /contact                                     │   │
│  │   • /admin  → Sanity Studio embedded             │   │
│  │                                                  │   │
│  │   API Routes / Route Handlers                    │   │
│  │   • /api/contact                                 │   │
│  │   • /api/revalidate                              │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │ Fetch content via Sanity Client
                         ▼
┌─────────────────────────────────────────────────────────┐
│                       SANITY CMS                         │
│  Content Lake + Studio                                   │
│  Collections / Documents:                                │
│  • profile                                               │
│  • projects                                              │
│  • blog_posts                                            │
│  • skills                                                │
│  • certificates                                          │
│  • experiences                                           │
│  • site_settings                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│             SQUARESPACE DOMAIN (yourname.com)            │
│  DNS records trỏ về Vercel                               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Luồng Dữ Liệu CMS

```txt
Bạn truy cập /admin
      ↓
Đăng nhập Sanity Studio
      ↓
Thêm/sửa/xóa profile, skills, projects, blog, certificates, CV
      ↓
Publish content
      ↓
Sanity webhook gọi /api/revalidate trên Next.js
      ↓
Next.js revalidate cache theo tag/path
      ↓
Website public cập nhật nội dung mới
```

### Nguyên tắc

- Code chỉ định nghĩa layout, component, schema, logic fetch data.
- Nội dung cá nhân không hard-code trong component.
- Các dữ liệu như profile, projects, skills, blog, certificates, resume link, SEO metadata lấy từ Sanity CMS.
- Người xem chỉ truy cập trang public.
- Admin cập nhật nội dung qua `/admin`.

---

## 3. Công Nghệ Sử Dụng

| Hạng mục | Công nghệ | Vai trò |
|---|---|---|
| Frontend | Next.js App Router | Render portfolio, dynamic pages, SEO |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | UI nhanh, responsive, dễ maintain |
| UI Components | shadcn/ui hoặc custom components | Card, button, form, dialog, badge |
| CMS | Sanity CMS | Quản lý profile, projects, skills, blog, CV |
| Admin | Embedded Sanity Studio tại `/admin` | Trang quản trị nội dung |
| Hosting | Vercel Hobby | Deploy miễn phí cho personal project |
| Domain | Squarespace Domain | Quản lý tên miền và DNS |
| Source Control | GitHub Free | Lưu source code, deploy tự động qua Vercel |
| Contact | mailto hoặc Resend Free | Gửi email liên hệ |
| Analytics | Vercel Analytics hoặc Google Analytics | Theo dõi truy cập cơ bản |
| SEO Monitor | Google Search Console | Index Google, kiểm tra sitemap |

---

## 4. Chi Phí Thực Tế

| Hạng mục | Gói | Chi phí |
|---|---|---|
| Domain | Squarespace Domain | Trả phí hằng năm |
| Hosting | Vercel Hobby | $0 nếu trong giới hạn free tier |
| CMS | Sanity Free | $0 nếu trong quota free |
| GitHub | Free | $0 |
| SSL | Vercel tự cấp | $0 |
| Contact basic | `mailto:` | $0 |
| Contact nâng cấp | Resend Free | $0 nếu trong quota free |
| Database riêng | Không dùng ở MVP | $0 |

### Kết luận chi phí

```txt
Chi phí bắt buộc: domain Squarespace
Chi phí còn lại: $0 nếu không vượt free tier
```

Nếu portfolio có traffic lớn, nhiều assets, hoặc cần nhiều tính năng backend hơn, có thể phát sinh phí Vercel/Sanity/Resend. Với portfolio cá nhân ứng tuyển, khả năng cao free tier là đủ.

---

## 5. Cấu Trúc Route / Sitemap

```txt
yourname.com/
│
├── /                      → Home
│   ├── Hero section
│   ├── About summary
│   ├── Featured Projects
│   ├── Skills summary
│   ├── Blog/Notes latest
│   └── Contact CTA
│
├── /about                 → About
│   ├── Bio
│   ├── Education
│   ├── Career direction
│   ├── Experiences
│   └── Certificates
│
├── /projects              → Projects list
│   ├── Filter by category
│   ├── Filter by tech stack
│   └── Search optional
│
├── /projects/[slug]       → Project detail dynamic page
│   ├── Problem
│   ├── Solution
│   ├── Architecture / pipeline
│   ├── Tech stack
│   ├── Screenshots
│   ├── GitHub / Demo
│   └── Lessons learned
│
├── /skills                → Skills grouped by category
│
├── /resume                → Online resume + PDF download
│
├── /blog                  → Blog / technical notes
│
├── /blog/[slug]           → Blog post detail dynamic page
│
├── /contact               → Contact info + contact form/mailto
│
└── /admin                 → Sanity Studio, protected by Sanity login
```

---

## 6. CMS Schema — Sanity Documents

### 6.1 `profile`

```ts
profile {
  name: string
  title: string
  avatar: image
  shortBio: string
  longBio: blockContent
  location: string
  email: string
  githubUrl: url
  linkedinUrl: url
  facebookUrl: url
  resumeFile: file
  resumeUrl: url
  heroCtaPrimary: string
  heroCtaSecondary: string
}
```

### 6.2 `project`

```ts
project {
  title: string
  slug: slug
  thumbnail: image
  summary: string
  description: blockContent
  problem: blockContent
  solution: blockContent
  role: string
  architecture: blockContent
  techStack: array<string>
  category: string
  status: "Learning" | "In Progress" | "Completed" | "Archived"
  featured: boolean
  priority: number
  githubUrl: url
  demoUrl: url
  screenshots: array<image>
  startDate: date
  endDate: date
  lessonsLearned: blockContent
  futureImprovements: blockContent
  seoTitle: string
  seoDescription: string
  ogImage: image
}
```

### 6.3 `skill`

Không nên dùng thanh phần trăm 1–100 hoặc 1–5 quá cứng. Dùng mức độ theo kinh nghiệm thực tế sẽ đáng tin hơn.

```ts
skill {
  name: string
  category: "Language" | "Framework" | "Database" | "AI/ML" | "Tool" | "Cloud" | "Other"
  level: "Familiar" | "Working Knowledge" | "Project Experience" | "Strong"
  usedInProjects: array<reference(project)>
  icon: image
  order: number
}
```

### 6.4 `certificate`

```ts
certificate {
  title: string
  issuer: string
  issuedDate: date
  credentialUrl: url
  badgeImage: image
  description: string
  order: number
}
```

### 6.5 `experience`

```ts
experience {
  organization: string
  role: string
  type: "Internship" | "Freelance" | "Academic" | "Personal" | "Volunteer"
  startDate: date
  endDate: date
  isCurrent: boolean
  description: blockContent
  technologies: array<string>
  order: number
}
```

### 6.6 `blogPost`

```ts
blogPost {
  title: string
  slug: slug
  coverImage: image
  excerpt: string
  body: blockContent
  tags: array<string>
  publishedAt: datetime
  readingTime: number
  isFeatured: boolean
  isPublished: boolean
  seoTitle: string
  seoDescription: string
  ogImage: image
}
```

### 6.7 `siteSettings`

```ts
siteSettings {
  siteTitle: string
  siteDescription: string
  siteUrl: url
  defaultOgImage: image
  favicon: image
  navbarLinks: array<object>
  footerText: string
  socialLinks: array<object>
  seoKeywords: array<string>
}
```

---

## 7. Frontend Component System

| Component | Vai trò |
|---|---|
| `Navbar` | Navigation global, responsive |
| `Footer` | Footer global |
| `SectionHeader` | Header cho từng section |
| `ProjectCard` | Card project ở Home và Projects |
| `ProjectDetail` | Template chi tiết project |
| `BlogCard` | Card bài viết |
| `SkillBadge` | Hiển thị skill/tag |
| `TechStackList` | Danh sách tech stack |
| `CertificateCard` | Hiển thị chứng chỉ |
| `ExperienceTimeline` | Timeline học tập/làm việc |
| `ResumeDownloadButton` | Tải CV |
| `ContactForm` | Form liên hệ nếu dùng Resend |
| `SEOJsonLd` | Structured data optional |

---

## 8. UI / Design System

### 8.1 Theme

```txt
Design source of truth: docs/DESIGN.md
Reference style setup: https://air.inc/
Default theme: Light canvas, high-contrast text, restrained blue accent
Style: editorial SaaS/product feel, clean creative-ops layout, modern but practical
Mood: portfolio cho developer / AI / backend, trình bày như một product/workflow system thay vì resume tĩnh
```

### 8.2 Design Tokens

Không tự định nghĩa token rời rạc trong plan. Khi triển khai UI, lấy token từ `docs/DESIGN.md` làm chuẩn:

```txt
Typography:
  Font chính: Control fallback Inter
  Font display: Control Compressed fallback Oswald
  Font accent/script: Control Cursive fallback Dancing Script
  Font code: JetBrains Mono chỉ dùng cho code snippets / technical labels
  Scale chính: 12 / 14 / 20 / 32 / display theo docs/DESIGN.md

Colors:
  Page / canvas:     #ffffff
  Soft surface:      #f5f5f5
  Text primary:      #1b1b1b
  Strong contrast:   #000000, dùng tiết chế
  Accent muted:      #426188
  Primary action:    #2b7fff, ưu tiên outline/accent state

Spacing:
  4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 52 / 64 / 72 / 80 / 120px

Radius:
  Inputs: 4px
  Buttons: 8px
  Images: 11px
  Feature cards: 12-14px
```

### 8.3 Air-Inspired UI Setup

Tham khảo air.inc ở cấp độ bố cục, nhịp nội dung và cảm giác sản phẩm, không copy nguyên nội dung/asset.

```txt
Hero:
  - First viewport phải cho thấy tên, vai trò, CTA và một phần nội dung kế tiếp.
  - Headline lớn, tự tin, ít chữ; tránh paragraph dài trong hero.
  - CTA chính dạng outlined action theo docs/DESIGN.md, không dùng filled button quá nặng.
  - Nên có visual/product preview: project grid, workflow board, terminal/code preview, hoặc case-study snapshot.

Navigation:
  - Sticky/minimal nav, ít mục, ưu tiên clarity.
  - CTA phụ: Resume / Contact / GitHub tùy nội dung profile.

Content rhythm:
  - Chia portfolio thành các cụm hành động giống air.inc:
    Build / Ship / Learn hoặc Design / Engineer / Deploy.
  - Home không chỉ liệt kê section; phải kể được workflow năng lực:
    problem -> approach -> project evidence -> contact.
  - Dùng các block feature rõ vai trò: Featured Projects, Technical Stack, Notes, Experience.

Surfaces:
  - Nền sáng, card/surface xám rất nhẹ, text đen rõ.
  - Hạn chế shadow; phân cấp bằng spacing, border, contrast và typography.
  - Không dùng dark theme làm mặc định trừ khi tạo mode phụ.

Imagery:
  - Ưu tiên screenshot thật của project, diagram kiến trúc, UI preview, hoặc ảnh đại diện chất lượng.
  - Tránh ảnh stock generic, laptop/robot 3D nặng, hoặc background chỉ để trang trí.
```

### 8.4 Component Direction

| Component | UI direction |
|---|---|
| `Navbar` | Minimal sticky nav, ghost links, CTA outline |
| `HeroSection` | Large display headline, short supporting copy, project/workflow preview |
| `ProjectCard` | Clean screenshot-first card, status/tag metadata rõ |
| `SkillBadge` | Compact badge, muted surface, không dùng proficiency bar |
| `SectionHeader` | Short title + one-line context, nhiều khoảng thở |
| `ContactForm` | Soft surface input, 4px radius, clear validation states |
| `ResumeDownloadButton` | Outline action, icon + label |

### 8.5 Responsive

| Breakpoint | Layout |
|---|---|
| Mobile `< 768px` | 1 cột, nav dạng menu |
| Tablet `768–1024px` | 2 cột |
| Desktop `> 1024px` | 3 cột, max-width 1200–1280px |

---

## 9. SEO Requirements

### 9.1 Metadata

Mỗi trang cần có:

```txt
Title
Description ≤ 160 ký tự
Canonical URL
Open Graph image
Twitter card image
Robots index/follow nếu cần index
```

### 9.2 Dynamic SEO từ Sanity

```txt
project.title          → title
project.summary        → description
project.ogImage        → og:image
project.slug           → canonical

blogPost.title         → title
blogPost.excerpt       → description
blogPost.ogImage       → og:image
blogPost.slug          → canonical
```

### 9.3 Files SEO

```txt
/app/sitemap.ts        → generate sitemap động từ Sanity slugs
/app/robots.ts         → robots.txt
metadata trong layout  → default SEO
metadata trong page    → page-specific SEO
```

### 9.4 Structured Data optional

Có thể thêm JSON-LD:

```txt
Person
WebSite
BlogPosting
CreativeWork / SoftwareSourceCode cho project
```

---

## 10. Revalidation / Caching

### 10.1 Mục tiêu

- Trang tải nhanh như static site.
- Khi cập nhật CMS, website có thể cập nhật mà không cần deploy lại.
- Không fetch dữ liệu quá nhiều ở client.

### 10.2 Cách làm

```txt
Next.js fetch Sanity data ở server
Dùng cache tag theo loại content:
  - profile
  - projects
  - project:[slug]
  - blog
  - blog:[slug]
  - skills
  - certificates

Sanity webhook gọi /api/revalidate
Route handler kiểm tra secret
Gọi revalidateTag hoặc revalidatePath
```

### 10.3 API route revalidate

```txt
/api/revalidate?secret=SANITY_REVALIDATE_SECRET
```

Không public secret. Lưu secret trong Vercel Environment Variables.

---

## 11. Contact Form

### Option A — MVP đơn giản

```txt
mailto:your-email@example.com
```

Ưu điểm:

```txt
Không cần backend
Không cần database
Không cần API key
Không phát sinh phí
```

### Option B — Form chuyên nghiệp hơn

```txt
Contact Form
  ↓
Next.js Route Handler /api/contact
  ↓
Resend API
  ↓
Gửi email về inbox cá nhân
```

Cần validate input:

```txt
name: required
email: required, valid email
message: required, min length
honeypot: chống spam đơn giản
rate limit: optional
```

---

## 12. Resume / CV

Không nên embed Google Drive nếu muốn chuyên nghiệp.

Khuyến nghị:

```txt
Upload CV PDF vào Sanity asset hoặc public folder
Resume page hiển thị nội dung CV dạng HTML
Nút Download CV trỏ tới file PDF
```

Quy trình cập nhật CV:

```txt
/admin → profile → resumeFile → upload file PDF mới → publish
```

---

## 13. Domain & DNS: Squarespace → Vercel

### Nguyên tắc

Không hard-code DNS record trong tài liệu triển khai. Khi deploy thật, lấy records trực tiếp từ Vercel Project Settings → Domains.

### Flow

```txt
1. Deploy project lên Vercel bằng GitHub
2. Vào Vercel Project → Settings → Domains
3. Add domain: yourname.com
4. Add domain: www.yourname.com
5. Vercel hiển thị DNS records cần cấu hình
6. Vào Squarespace → Domain → DNS Settings → Custom Records
7. Thêm đúng records Vercel yêu cầu
8. Chờ DNS propagate
9. Kiểm tra HTTPS
```

Thông thường sẽ có dạng:

```txt
A record cho apex domain @
CNAME record cho www
```

Nhưng giá trị cụ thể phải lấy từ Vercel dashboard tại thời điểm cấu hình.

---

## 14. Environment Variables

### Local `.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-24

SANITY_REVALIDATE_SECRET=
SANITY_READ_TOKEN=

RESEND_API_KEY=
CONTACT_RECEIVER_EMAIL=
NEXT_PUBLIC_SITE_URL=https://yourname.com
```

### Vercel Environment Variables

Cần cấu hình trên Vercel:

```txt
Production
Preview
Development
```

Biến có prefix `NEXT_PUBLIC_` sẽ expose ra client. Secret như `SANITY_READ_TOKEN`, `RESEND_API_KEY`, `SANITY_REVALIDATE_SECRET` không được có prefix `NEXT_PUBLIC_`.

---

## 15. Repository Structure

```txt
Sura/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── skills/page.tsx
│   ├── resume/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── admin/[[...index]]/page.tsx
│   ├── api/
│   │   ├── contact/route.ts
│   │   └── revalidate/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   ├── sections/
│   ├── project/
│   ├── blog/
│   ├── resume/
│   └── ui/
│
├── lib/
│   ├── sanity.client.ts
│   ├── sanity.queries.ts
│   ├── sanity.image.ts
│   ├── seo.ts
│   ├── validators.ts
│   └── utils.ts
│
├── sanity/
│   ├── schemas/
│   │   ├── profile.ts
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   ├── certificate.ts
│   │   ├── experience.ts
│   │   ├── blogPost.ts
│   │   ├── siteSettings.ts
│   │   └── index.ts
│   └── structure.ts
│
├── types/
│   ├── profile.ts
│   ├── project.ts
│   ├── skill.ts
│   ├── blog.ts
│   └── sanity.ts
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── docs/
│   ├── DESIGN.md
│   ├── portfolio-nextjs-sanity-vercel-plan.md
│   └── phases/
│       ├── phase-01-setup-nen-tang.md
│       ├── phase-02-cms-schema-du-lieu-mau.md
│       ├── phase-03-frontend-pages.md
│       ├── phase-04-seo-revalidation-contact.md
│       ├── phase-05-domain-go-live.md
│       └── phase-06-van-hanh-lau-dai.md
│
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

---

## 16. Git Branch & Deploy Workflow

```txt
main       → production deployment
preview    → preview deployment optional
feature/*  → feature branches
```

Flow:

```txt
Code locally
  ↓
Push GitHub
  ↓
Vercel tạo Preview Deployment
  ↓
Test UI + CMS + responsive
  ↓
Merge vào main
  ↓
Vercel Production Deployment
```

---

## 17. Lộ Trình Triển Khai

Tài liệu chi tiết theo từng phase:

| Phase | Tài liệu |
|---|---|
| Giai đoạn 1 — Setup nền tảng | [docs/phases/phase-01-setup-nen-tang.md](./phases/phase-01-setup-nen-tang.md) |
| Giai đoạn 2 — CMS schema + dữ liệu mẫu | [docs/phases/phase-02-cms-schema-du-lieu-mau.md](./phases/phase-02-cms-schema-du-lieu-mau.md) |
| Giai đoạn 3 — Frontend pages | [docs/phases/phase-03-frontend-pages.md](./phases/phase-03-frontend-pages.md) |
| Giai đoạn 4 — SEO + revalidation + contact | [docs/phases/phase-04-seo-revalidation-contact.md](./phases/phase-04-seo-revalidation-contact.md) |
| Giai đoạn 5 — Domain + Go Live | [docs/phases/phase-05-domain-go-live.md](./phases/phase-05-domain-go-live.md) |
| Giai đoạn 6 — Vận hành lâu dài | [docs/phases/phase-06-van-hanh-lau-dai.md](./phases/phase-06-van-hanh-lau-dai.md) |

### Giai đoạn 1 — Setup nền tảng

```txt
□ Tạo Next.js project với TypeScript
□ Cài Tailwind CSS
□ Setup shadcn/ui nếu dùng
□ Tạo GitHub repository
□ Kết nối Vercel với GitHub
□ Deploy bản skeleton lên Vercel
□ Tạo Sanity project
□ Embed Sanity Studio vào /admin
□ Cấu hình environment variables
```

Deliverable:

```txt
Portfolio skeleton live trên *.vercel.app
/admin truy cập được Sanity Studio
```

### Giai đoạn 2 — CMS schema + dữ liệu mẫu

```txt
□ Tạo schema profile
□ Tạo schema project
□ Tạo schema skill
□ Tạo schema certificate
□ Tạo schema experience
□ Tạo schema blogPost
□ Tạo schema siteSettings
□ Thêm dữ liệu mẫu:
   □ 1 profile
   □ 3 projects
   □ 10 skills
   □ 2 certificates nếu có
   □ 1 blog post
```

Deliverable:

```txt
Sanity CMS có dữ liệu thật/mẫu để frontend fetch
```

### Giai đoạn 3 — Frontend pages

```txt
□ Home page
□ About page
□ Projects list
□ Project detail page
□ Skills page
□ Resume page
□ Blog list
□ Blog detail page
□ Contact page
□ 404 page
```

Deliverable:

```txt
Portfolio đầy đủ route chính, lấy dữ liệu từ Sanity
```

### Giai đoạn 4 — SEO + revalidation + contact

```txt
□ Dynamic metadata cho từng page
□ Open Graph image fallback
□ sitemap.ts từ Sanity slugs
□ robots.ts
□ /api/revalidate
□ Sanity webhook
□ Contact mailto hoặc Resend form
□ Validate form input nếu có form
```

Deliverable:

```txt
Website SEO tốt, cập nhật CMS không cần deploy lại
```

### Giai đoạn 5 — Domain + Go Live

```txt
□ Add custom domain trong Vercel
□ Copy DNS records từ Vercel
□ Thêm records vào Squarespace DNS
□ Kiểm tra HTTPS
□ Kiểm tra www redirect
□ Test PageSpeed Insights
□ Test Open Graph preview
□ Submit sitemap lên Google Search Console
```

Deliverable:

```txt
Portfolio live trên domain riêng
```

### Giai đoạn 6 — Vận hành lâu dài

```txt
□ Thêm project thật thường xuyên
□ Cập nhật CV khi có thay đổi
□ Viết blog/notes nếu có thời gian
□ Kiểm tra broken links mỗi tháng
□ Theo dõi Google Search Console
□ Backup/export Sanity content định kỳ nếu cần
```

---

## 18. 3D / Animation Strategy

Không cần tự tạo model 3D ở MVP.

Khuyến nghị:

```txt
MVP: Không dùng 3D model phức tạp
Dùng animation nhẹ bằng Framer Motion hoặc CSS transitions
Hero section tập trung vào headline, project preview, CTA
```

Nếu muốn thử hiệu ứng 3D:

```txt
Dùng Spline scene nhẹ hoặc asset có sẵn
Embed có điều kiện, tránh làm chậm mobile
Không dùng robot/laptop 3D generic quá nặng
```

Ưu tiên:

```txt
Content > SEO > Performance > Design polish > 3D effects
```

---

## 19. Performance Requirements

```txt
□ Ảnh dùng next/image
□ Ảnh từ Sanity dùng image URL builder, resize đúng kích thước
□ Dùng WebP/AVIF nếu có thể
□ Không load animation nặng ở mobile
□ Không fetch toàn bộ blog/project ở client nếu không cần
□ Dùng server components cho trang content chính
□ Lighthouse Performance mục tiêu: > 85
□ Load time trên 4G: < 3s nếu có thể
```

---

## 20. Security Requirements

```txt
□ Không expose Sanity write token ở client
□ Không expose Resend API key ở client
□ /api/revalidate phải kiểm tra secret
□ Contact form phải validate input
□ Không lưu thông tin nhạy cảm trong repository
□ .env.local không commit
□ Có .env.example để document biến môi trường
□ Sanity quyền chỉnh sửa chỉ cấp cho tài khoản cá nhân
```

---

## 21. Checklist Trước Khi Go-Live

### Nội dung

```txt
□ Profile đầy đủ
□ Avatar/ảnh đại diện tốt
□ Ít nhất 3 project có mô tả rõ
□ Mỗi project có GitHub link nếu public được
□ Skills chia nhóm rõ ràng
□ CV PDF mới nhất
□ Contact email đúng
□ Social links hoạt động
```

### SEO

```txt
□ Mọi trang có title
□ Mọi trang có description
□ Project/blog detail có metadata riêng
□ OG image hoạt động
□ sitemap.xml truy cập được
□ robots.txt không block Googlebot
□ Submit Google Search Console
```

### UX

```txt
□ Responsive mobile
□ Responsive tablet
□ Responsive desktop
□ Navigation hoạt động
□ 404 page có link quay về Home
□ Button tải CV hoạt động
□ Contact form/mailto hoạt động
```

### Performance

```txt
□ Ảnh đã tối ưu
□ Không có asset quá nặng
□ Không có broken links
□ Không lỗi console nghiêm trọng
□ PageSpeed Insights đạt mức chấp nhận được
```

### Domain

```txt
□ Domain trỏ đúng về Vercel
□ www redirect đúng
□ HTTPS hoạt động
□ Không hard-code DNS record trong tài liệu
```

---

## 22. Những Điểm Đã Sửa So Với Plan Framer Cũ

```txt
□ Đổi Framer sang Next.js + Sanity + Vercel để phù hợp mục tiêu chỉ trả phí domain
□ Bỏ giả định Framer Free hỗ trợ custom domain miễn phí
□ Bỏ hard-code DNS records của Framer
□ Thêm /admin bằng embedded Sanity Studio
□ Thêm chiến lược revalidation bằng Sanity webhook + Next.js cache tags
□ Chỉnh schema skills, không dùng proficiency bar kiểu 1–5 cứng
□ Chỉnh tech_stack/tags thành array để dễ filter
□ Chuyển CV từ Google Drive embed sang Sanity asset/public file
□ Thêm environment variables
□ Thêm repository structure chuẩn
□ Thêm security checklist
□ Thêm performance checklist
□ Thêm contact form strategy
□ Thêm go-live checklist chi tiết
□ Chỉnh UI plan để tham chiếu `docs/DESIGN.md` và setup phong cách theo air.inc
□ Đưa 3D xuống mức optional, không thuộc MVP
```

---

*Cập nhật lần cuối: 2026-05-24.*
