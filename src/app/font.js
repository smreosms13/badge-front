import { Inter, Noto_Sans_KR, Poppins } from 'next/font/google'

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


export {notoSansKr, inter, poppins}