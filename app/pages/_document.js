
import { Html, Head, Main,NextScript } from 'next/document';
import { FB_PIXEL_ID } from '../[locale]/lib/fpixel';
import Image from 'next/image';

export default function Document() {
    return(
        <Html>
            <Head>
                <noscript>
                    <Image alt="Facebook Pixel"
                    height={1}
                    width={1}
                    style={{display:'none'}}
                    src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                    />
                </noscript>
            </Head>
        
        <body>
            <Main />
            <NextScript />
        </body>
        
        </Html>
    )
}