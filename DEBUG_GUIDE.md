# 🔧 Debug Guide - Assessment Loading Issue

## Vấn đề hiện tại
Bạn đang gặp lỗi "Unable to Load Assessment" khi truy cập trang Assessment.

## Các bước debug

### 1. Kiểm tra Authentication
- Mở trang Assessment
- Click nút "Show Debug" (góc trên bên phải)
- Trong phần "Authentication Test":
  - Kiểm tra status có hiển thị "✅ Authenticated" không
  - Nếu chưa authenticated, click "Test Login" hoặc login qua trang Login

### 2. Kiểm tra API Connection
- Trong debug section, click "Test API Connection"
- Kiểm tra các test results:
  - **Health Check**: API có reachable không
  - **Authentication**: User có được authenticate không
  - **Survey Status**: Endpoint survey status có hoạt động không
  - **Get Suitable Survey**: Có lấy được survey không

### 3. Kiểm tra Console Logs
- Mở Developer Tools (F12)
- Vào tab Console
- Tìm các log messages:
  - `🔍 AssessmentPage mounted`
  - `🔐 Checking authentication...`
  - `👤 Current user:`
  - `🔑 Has token:`
  - `📡 Calling getSuitableSurvey()...`

### 4. Các lỗi thường gặp

#### Lỗi 401 Unauthorized
- **Nguyên nhân**: User chưa login hoặc token expired
- **Giải pháp**: Login lại hoặc refresh page

#### Lỗi DateOfBirth required
- **Nguyên nhân**: User chưa cập nhật ngày sinh trong profile
- **Giải pháp**: Vào Profile page và cập nhật DateOfBirth

#### Lỗi Network error
- **Nguyên nhân**: Backend không chạy hoặc không reachable
- **Giải pháp**: Đảm bảo backend đang chạy trên port 5150

#### Lỗi Invalid survey response
- **Nguyên nhân**: Backend trả về data format không đúng
- **Giải pháp**: Kiểm tra backend logs

### 5. Kiểm tra Backend
- Đảm bảo backend đang chạy: `http://localhost:5150`
- Kiểm tra backend logs có lỗi gì không
- Test API endpoint: `GET /api/surveys/get-suitable`

### 6. Environment Variables
- Kiểm tra file `.env` có chứa:
  ```
  REACT_APP_API_BASE_URL=http://localhost:5150/api
  ```

## Báo cáo lỗi
Khi báo cáo lỗi, hãy cung cấp:
1. Screenshot của debug section
2. Console logs
3. Network tab trong Developer Tools
4. Backend logs (nếu có)

## Test Credentials
- Email: `test@example.com`
- Password: `password123` 