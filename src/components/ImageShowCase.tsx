import { AutoRotatingCarousel } from '@/components/ui/image-carousel'
import CardImage1 from '@/assets/images/carousel_1.png'
import CardImage2 from '@/assets/images/carousel_2.png'
import CardImage3 from '@/assets/images/carousel_3.png'

function WebsiteShowcase() {
  const websitePreviews = [
    {
      src: CardImage1,
      alt: 'Geometpop',
      title: 'Pelajari Geometri untuk Kalkulus',
      description: 'Belajar Geometri dan Kalkulus dengan mudah dan menyenangkan',
    },
    {
      src: CardImage2,
      alt: 'Pemodelan Pertumbuhan Populasi',
      title: 'Hitung Pertumbuhan Populasi',
      description: 'Visualisasi pertumbuhan populasi dengan deret geometri',
    },
    {
      src: CardImage3,
      alt: 'Materi Deret Geometri',
      title: 'Pelajari Materi Deret Geometri',
      description: 'Materi Deret Geometri untuk Kalkulus',
    },
  ]

  return (
    <div className="mx-auto max-w-2xl">
      <AutoRotatingCarousel 
        images={websitePreviews}
        interval={2000} // 2 second delay
        className="border"
      />
    </div>
  )
}

export default WebsiteShowcase