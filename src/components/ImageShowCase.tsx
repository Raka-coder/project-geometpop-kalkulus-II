import { AutoRotatingCarousel } from '@/components/ui/image-carousel'
import CardImage1 from '@/assets/carousel_1.png'
import CardImage2 from '@/assets/carousel_2.png'
import CardImage3 from '@/assets/carousel_3.png'

export function WebsiteShowcase() {
  const websitePreviews = [
    {
      src: CardImage1,
      alt: 'E-commerce Website',
      title: 'Pelajari Geometri untuk Kalkulus',
      description: 'Belajar Geometri dan Kalkulus dengan mudah dan menyenangkan',
    },
    {
      src: CardImage2,
      alt: 'Portfolio Website',
      title: 'Hitung Pertumbuhan Populasi',
      description: 'Visualisasi pertumbuhan populasi dengan deret geometri',
    },
    {
      src: CardImage3,
      alt: 'Corporate Website',
      title: 'Pelajari Materi Deret Geometri',
      description: 'Materi Deret Geometri untuk Kalkulus',
    },
  ]

  return (
    <div className="mx-auto max-w-3xl">
      <AutoRotatingCarousel 
        images={websitePreviews}
        interval={2000} // 2 second delay
        className="border"
      />
    </div>
  )
}
