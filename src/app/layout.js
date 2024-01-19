import { Inter, Noto_Sans_KR, Poppins } from 'next/font/google'
import '@/app/ui/globals.css'

//기본 폰트 : Noto_Sans_KR
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
});

// 옵션 : Inter, Poppins
const inter = Inter({
  subsets: ['latin'],
  variable : '--inter' 
});

const poppins = Poppins({
  subsets: ['latin'],
  weight : ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable : '--poppins' 
});

export const metadata = {
  title: 'VDB',
  description: 'VDB Demo Application',
};

export const cls = (...classnames) => {
  return classnames.join(" ");
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={cls(notoSansKr.className, inter.variable, poppins.variable)}>
        {children}
      </body>
    </html>
  )
}
