import Image from "next/image"
import Link from "next/link"

export default function Logo({ className, image, width, height, alt }) {
    return (
        <Link href="/">
            <a className={`w-full ${className}`}>
                <Image
                    loading="lazy"
                    src={image}
                    width={width}
                    height={height}
                    alt={alt}
                    quality={100}
                    objectFit="cover"
                />
            </a>
        </Link>
    )
}

Logo.defaultProps = {
    image: "/images/logo/Bhotahiti.png",
    width: "201",
    height: "48",
    alt: "Bhotahiti Logo",
}
