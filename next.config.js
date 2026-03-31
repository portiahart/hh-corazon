/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dqfrqjsbfmwtclkclmvc.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
```

---

**`.gitignore`**
```
.next/
node_modules/
.env.local
.env