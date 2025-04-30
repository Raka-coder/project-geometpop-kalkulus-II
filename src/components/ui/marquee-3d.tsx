"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const ThreeDMarquee = ({
  images,
  className,
  columns = 4,
  height = "600px",
  imageAspectRatio = "970/700",
}: {
  images: string[]
  className?: string
  columns?: number
  height?: string
  imageAspectRatio?: string
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Split the images array into equal parts based on the number of columns
  const chunkSize = Math.max(1, Math.ceil(images.length / columns))
  const chunks = Array.from({ length: columns }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, Math.min(start + chunkSize, images.length))
  })

  if (!isClient) {
    return <div className={cn(`mx-auto block h-[${height}] overflow-hidden rounded-2xl`, className)} />
  }

  return (
    <div className={cn(`mx-auto block h-[${height}] overflow-hidden rounded-2xl max-sm:h-[300px]`, className)}>
      <div className="flex size-full items-center justify-center">
        <div className="size-full shrink-0">
          <div
            style={{
              transform: "rotateX(35deg) rotateY(0deg) rotateZ(-25deg)",
            }}
            className={`relative grid size-full origin-center grid-cols-${columns} gap-4 transform-3d`}
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 50 : -50 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-4"
              >
                <GridLineVertical className="-left-4" offset="40px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{
                        y: -5,
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className={`aspect-[${imageAspectRatio}] w-full rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl`}
                      width={400}
                      height={225}
                      onError={(e) => {
                        console.error("Image failed to load:", image)
                        e.currentTarget.src = "/placeholder.svg?height=225&width=400"
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}
