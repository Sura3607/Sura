<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Implementation Notes Rule

Khi người dùng yêu cầu triển khai một spec, luôn áp dụng rule sau:

> Triển khai `<SPEC>` và trong lúc làm, hãy duy trì một file `implementation-notes.html` với những quyết định bạn phải đưa ra mà không có trong spec, những thứ bạn phải thay đổi, các đánh đổi bạn phải thực hiện hoặc bất kỳ điều gì khác mà người dùng nên biết.

Diễn giải thực tế:

- Cập nhật `implementation-notes.html` trong quá trình làm, không chỉ ghi lại ở cuối.
- Nội dung note phải được trình bày bằng tiếng Việt.
- Ghi lại các giả định, quyết định, đánh đổi, điểm lệch khỏi spec, blocker, kết quả kiểm tra/xác minh và mọi điều người dùng nên biết về sau.
- Nếu `<SPEC>` bị thiếu hoặc mơ hồ, không âm thầm tự bịa yêu cầu. Ghi rõ điểm mơ hồ trong `implementation-notes.html` và chỉ tiếp tục với phần việc an toàn, có phạm vi rõ ràng.
- Giữ lại các note hiện có, trừ khi chúng đã lỗi thời và việc thay đổi/xóa bỏ được ghi chú rõ ràng.
