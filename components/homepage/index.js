import Image from "next/image"
import Link from "next/link"
import Category from "../elements/category"
import SectionLayout from "../layout/SectionLayout"
import CategorySlider from "./common/CategorySlider"
import Hero from "./common/Hero"

export default function HomePage({ categories, products, sliders }) {
  // console.log(sliders)
  return (
    <>
      <div className="pb-4 px-4">
        <div className="bg-white shadow-md">
          <Hero sliders={sliders} />
        </div>
      </div>

      <SectionLayout title="Shop By Category" url="/categories">
        <Category categories={categories} className="mt-5" />
      </SectionLayout>

      <SectionLayout title="Kirana Pasal" url="/categories/kirana-pasal">
        <CategorySlider categories={categories} categoryId="1" />
      </SectionLayout>

      <SectionLayout title="Office Items" url="/categories/office-item">
        <CategorySlider categories={categories} categoryId="3" />
      </SectionLayout>

      <SectionLayout title="Our Recommendation">
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div className="col-span-1" key={product.id}>
              <div className="flex items-center bg-main-white rounded-md shadow-lg">
                {/* <img
                  loading="lazy"
                  className="w-32 h-32 md:w-48 md:h-auto"
                  src={product.thumbnail ? product.thumbnail : "/images/products/earph.jpg"}
                  alt={product.name}
                  width="120"
                  height="120"
                /> */}
                <Image
                  loading="lazy"
                  src={product.thumbnail ? product.thumbnail : "/images/products/earph.jpg"}
                  alt={product.name}
                  width={120}
                  height={120}
                  objectFit="contain"
                />
                <div className="flex flex-col px-5 font-medium">
                  <Link href={`/product-details/[slug]`} as={`/product-details/${product.slug}`}>
                    <a className="text-sm sm:text-base text-main-blue hover:text-main-red">
                      {product.name}
                    </a>
                  </Link>
                  <p className="text-sm">Rs. {product.salePrice}</p>

                  <Link href={`/product-details/[slug]`} as={`/product-details/${product.slug}`}>
                    <a className="text-main-red hover:text-main-blue cursor-pointer text-sm capitalize underline">
                      Buy Now
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionLayout>
    </>
  )
}