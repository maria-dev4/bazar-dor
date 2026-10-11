# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে দেখার একটি ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম এবং আগের দিনের তুলনায় দামের পরিবর্তন (▲/▼) এখানে দেখা যায়।

🔗 **Live Site:** https://your-app.vercel.app
📦 **GitHub Repo:** https://github.com/your-username/bazar-dor

## 🛠️ Technologies Used

- **Next.js** (App Router): UI ও পেজ নেভিগেশন
- **TypeScript**
- **Tailwind CSS + DaisyUI**: স্টাইলিং ও রেসপনসিভ ডিজাইন
- **BetterAuth**: Email/Password, Google ও GitHub লগইন
- **react-hot-toast**: টোস্ট নোটিফিকেশন
- **Lucide React**: আইকন
- **Vercel**: ডিপ্লয়মেন্ট

## ✨ Key Features

1. **ক্যাটাগরিভিত্তিক পণ্য তালিকা:** প্রতিটি ক্যাটাগরির পণ্যের আজকের দাম ও পরিবর্তন (▲ বেড়েছে, ▼ কমেছে, — অপরিবর্তিত) দেখা যায়।
2. **দাম অনুযায়ী সাজানো:** "সাজান" ড্রপডাউন দিয়ে ডিফল্ট, কম থেকে বেশি এবং বেশি থেকে কম ক্রমে সাজানো যায়।
3. **Price ticker:** নেভবারের নিচে অসীম স্ক্রলিং marquee-তে পণ্যের নাম, দাম ও পরিবর্তন দেখায়।
4. **Authentication:** BetterAuth দিয়ে ইমেইল/পাসওয়ার্ড, Google ও GitHub দিয়ে সাইন ইন ও সাইন আপ।
5. **Protected product details:** লগইন করা ব্যবহারকারী পণ্যের সর্বনিম্ন, সর্বোচ্চ, গড় ও বাজারভিত্তিক দাম দেখতে পারেন।
6. **Profile ও নাম আপডেট:** My Profile পেজ থেকে ব্যবহারকারী নিজের নাম পরিবর্তন করতে পারেন।
7. **Fully responsive:** মোবাইল, ট্যাবলেট ও ডেস্কটপে সঠিকভাবে কাজ করে।
8. **Loading skeleton, 404 পেজ ও toast:** ডাটা লোড হওয়ার সময় skeleton, ভুল রুটে 404 পেজ এবং লগইন/সাইন আপ/লগআউট/validation-এ toast দেখায়।

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
npm install
npm run dev
```

প্রজেক্টের রুটে `.env` ফাইল বানিয়ে নিচের ভ্যারিয়েবলগুলো দিন:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

তারপর http://localhost:3000 খুলুন।

## 📡 Data Source

https://openapi.programming-hero.com/api/bazardor

## 📁 Project Structure

```
src/
├── app/          # পেজ ও রুট (category, product, profile, signin, signup, api/auth)
├── components/   # Navbar, Marquee, ProductCard, Footer ইত্যাদি
├── lib/          # API, auth ও ফরম্যাট হেল্পার
└── types/        # TypeScript টাইপ
```

## 📄 Note

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।